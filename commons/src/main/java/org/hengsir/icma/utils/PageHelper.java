package org.hengsir.icma.utils;


import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;

import java.sql.*;
import java.util.List;
import java.util.Properties;

/**
 * MyBatis分页拦截器。
 *
 * @author lijiguang on 2017-5-24
 * @version 1.0.0
 */
@Intercepts({@Signature(type = StatementHandler.class, method = "prepare",
    args = {Connection.class}),
    @Signature(type = ResultSetHandler.class, method = "handleResultSets",
        args = {Statement.class})})
public class PageHelper implements Interceptor {

    public static final ThreadLocal<Page> LOCAL_PAGE = new ThreadLocal<Page>();

    private static final String BOUND_SQL = "delegate.boundSql.sql";
    //数据库方言
    private static       String dialect   = "";

    /**
     * 开始分页。
     *
     * @param pageNum  当前页
     * @param pageSize 分页大小
     */
    public static void startPage(int pageNum, int pageSize) {
        LOCAL_PAGE.set(new Page(pageNum, pageSize));
    }

    /**
     * 结束分页并返回结果，该方法必须被调用，否则LOCAL_PAGE会一直保存下去，直到下一次startPage。
     *
     * @return 数据集合
     */
    public static Page endPage() {
        Page page = LOCAL_PAGE.get();
        LOCAL_PAGE.remove();
        return page;
    }

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        if (LOCAL_PAGE.get() == null) {
            return invocation.proceed();
        }
        if (invocation.getTarget() instanceof StatementHandler) {
            StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
            MetaObject metaStatementHandler = SystemMetaObject.forObject(statementHandler);
            // 分离代理对象链(由于目标类可能被多个拦截器拦截，从而形成多次代理，通过下面的两次循环  
            // 可以分离出最原始的的目标类)  
            while (metaStatementHandler.hasGetter("h")) {
                Object object = metaStatementHandler.getValue("h");
                metaStatementHandler = SystemMetaObject.forObject(object);
            }
            // 分离最后一个代理对象的目标类  
            while (metaStatementHandler.hasGetter("target")) {
                Object object = metaStatementHandler.getValue("target");
                metaStatementHandler = SystemMetaObject.forObject(object);
            }
            MappedStatement mappedStatement = (MappedStatement) metaStatementHandler.getValue(
                "delegate.mappedStatement");
            //分页信息if (localPage.get() != null) {  
            Page page = LOCAL_PAGE.get();
            BoundSql boundSql = (BoundSql) metaStatementHandler.getValue("delegate.boundSql");
            // 分页参数作为参数对象parameterObject的一个属性  
            String sql = boundSql.getSql();
            // 重写sql  
            String pageSql = buildPageSql(sql, page);
            //重写分页sql  
            metaStatementHandler.setValue(BOUND_SQL, pageSql);
            Connection connection = (Connection) invocation.getArgs()[0];
            // 重设分页参数里的总页数等  
            setPageParameter(sql, connection, mappedStatement, boundSql, page);
            // 将执行权交给下一个拦截器  
            return invocation.proceed();
        } else if (invocation.getTarget() instanceof ResultSetHandler) {
            Object result = invocation.proceed();
            Page page = LOCAL_PAGE.get();
            page.setResult((List) result);
            return result;
        }
        return null;
    }

    /**
     * 只拦截这两种类型的。
     * <br>StatementHandler
     * <br>ResultSetHandler
     *
     * @param target 对象
     * @return 对象
     */
    @Override
    public Object plugin(Object target) {
        if (target instanceof StatementHandler || target instanceof ResultSetHandler) {
            return Plugin.wrap(target, this);
        } else {
            return target;
        }
    }

    @Override
    public void setProperties(Properties properties) {
        dialect = properties.getProperty("dialect");
        if (dialect == null || "".equals(dialect)) {
            throw new RuntimeException("Mybatis分页插件PageHelper无法获取dialect参数!");
        }
    }

    /**
     * 修改原SQL为分页SQL。
     *
     * @param sql  sql语句
     * @param page 分页
     * @return 字符串
     */
    private String buildPageSql(String sql, Page page) {
        StringBuilder pageSql = new StringBuilder(200);
        if ("mysql".equals(dialect)) {
            pageSql.append(sql);
            pageSql.append(" limit " + page.getStartRow() + "," + page.getPageSize());
        } else if ("hsqldb".equals(dialect)) {
            pageSql.append(sql);
            pageSql.append(" LIMIT " + page.getPageSize() + " OFFSET " + page.getStartRow());
        } else if ("oracle".equals(dialect)) {
            pageSql.append(
                "select * from ( select page_rownum_temp_table.*, rownum row_id from ( ");
            pageSql.append(sql);
            pageSql.append(" ) page_rownum_temp_table where rownum <= ").append(page.getEndRow());
            pageSql.append(") where row_id > ").append(page.getStartRow());
        }
        return pageSql.toString();
    }

    /**
     * 获取总记录数。
     *
     * @param sql             sql语句
     * @param connection      连接
     * @param mappedStatement 连接
     * @param boundSql        sql语句
     * @param page            分页
     */
    private void setPageParameter(
        String sql, Connection connection, MappedStatement mappedStatement, BoundSql boundSql,
        Page page) {
        // 记录总记录数  
        String countSql = "select count(0) from (" + sql + ") page_rownum_temp_table";
        PreparedStatement countStmt = null;
        ResultSet rs = null;
        try {
            countStmt = connection.prepareStatement(countSql);
            BoundSql countBs = new BoundSql(mappedStatement.getConfiguration(), countSql,
                                            boundSql.getParameterMappings(),
                                            boundSql.getParameterObject());
            setParameters(countStmt, mappedStatement, countBs, boundSql.getParameterObject());
            rs = countStmt.executeQuery();
            int totalCount = 0;
            if (rs.next()) {
                totalCount = rs.getInt(1);
            }
            page.setTotal(totalCount);
            int totalPage =
                totalCount / page.getPageSize() + ((totalCount % page.getPageSize() == 0) ? 0 : 1);
            page.setPages(totalPage);
        } catch (SQLException exception) {
            exception.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException exception) {
                exception.printStackTrace();
            }
            try {
                if (countStmt != null) {
                    countStmt.close();
                }
            } catch (SQLException exception) {
                exception.printStackTrace();
            }
        }
    }

    /**
     * 代入参数值。
     *
     * @param ps              连接
     * @param mappedStatement 连接
     * @param boundSql        sql语句
     * @param parameterObject 参数对象
     * @throws SQLException 异常
     */
    private void setParameters(
        PreparedStatement ps, MappedStatement mappedStatement, BoundSql boundSql,
        Object parameterObject) throws SQLException {
        ParameterHandler parameterHandler = new DefaultParameterHandler(
            mappedStatement, parameterObject, boundSql);
        parameterHandler.setParameters(ps);
    }
}