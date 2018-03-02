package org.hengsir.icma.config;

import org.hengsir.icma.utils.PageHelper;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

/**
 * @author hengsir
 * @date 2018/1/29 下午2:24
 */
@Configuration
public class MybatisConfig {

    @Qualifier("dataSource")
    @Autowired
    private DataSource dataSource;

    @Bean
    @ConditionalOnMissingBean
    public SqlSessionFactoryBean sqlSessionFactoryBean() throws IOException {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        return sqlSessionFactoryBean;
    }

    @Bean
    public PageHelper pageHelper(){
        PageHelper pageHelper = new PageHelper();
        Properties properties = new Properties();
        properties.setProperty("dialect","mysql");
        properties.setProperty("offsetAsPageNum","true");
        properties.setProperty("rowBoundsWithCount","true");
        pageHelper.setProperties(properties);
        return pageHelper;
    }
}
