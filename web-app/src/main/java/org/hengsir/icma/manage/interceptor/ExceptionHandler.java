package org.hengsir.icma.manage.interceptor;

import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;
import org.apache.shiro.authz.AuthorizationException;
import org.hengsir.icma.manage.exception.BusinessException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * 公用异常处理 Spring MVC。
 *
 * @author lijiguang
 */
public class ExceptionHandler extends SimpleMappingExceptionResolver {
    /**
     * 默认异常提示信息。
     */
    private static final String DEFAULT_MESSAGE = "哎呀！出错啦。";

    /**
     * 默认的业务错误编码。
     */
    private static final int DEFAULT_BUSINESS_CODE = 500;

    /**
     * 日志。
     */
    private Logger log = Logger.getLogger(ExceptionHandler.class);

    /**
     * 公用拦截异常处理方法。
     */
    @Override
    public ModelAndView resolveException(
            HttpServletRequest request, HttpServletResponse response, Object handler,
            Exception exception) {
        //获取该异常设置的跳转页面(dispatcher-servlet.xml配置文件)
        String viewName = determineViewName(exception, request);
        log.error("异常拦截统一处理：{}", exception);
        BusinessException businessException = changeException(exception);
        //判断是否异步请求--否：跳转到系统异常界面，是：获取提示信息返回前端
        if (!(request.getHeader("accept").indexOf("application/json") > -1 ||
              (request.getHeader("X-Requested-With") != null &&
               request.getHeader("X-Requested-With").indexOf("XMLHttpRequest") > -1))) {
            //如果不是异步请求
            if (viewName == null || "".equals(viewName)) {
                viewName = "error/inner-error.html";
            }
            Integer statusCode = determineStatusCode(request, viewName);
            if (statusCode != null) {
                applyStatusCodeIfPossible(request, response, statusCode);
            }
            response.setStatus(businessException.getStatus());
            request.setAttribute("error", businessException);
            return getModelAndView(viewName, exception, request);
        } else {
            try {
                //异常请求时,获取错误提示信息
                JSONObject json = new JSONObject();
                json.put("msg", businessException.getMessage());
                json.put("code", businessException.getStatus());
                //获取输出流将错误提示返回至前端
                response.setStatus(500);
                response.setContentType("text/json;charset=UTF-8");
                PrintWriter writer = response.getWriter();
                writer.write(json.toString());
                writer.flush();
            } catch (Exception ex) {
                log.error("异步请求异常处理：{}", ex);
            }
            return null;
        }
    }

    /**
     * 获取提示信息。
     *
     * @param exception 异常
     * @return 错误提示信息
     */
    private BusinessException changeException(Exception exception) {
        //获取根异常
        Throwable ex = parseException(exception);
        BusinessException businessException = new BusinessException(DEFAULT_BUSINESS_CODE,
                                                                    DEFAULT_MESSAGE);
        if (ex instanceof BusinessException) {
            businessException = (BusinessException) ex;//业务处理异常--自定义异常提示
        } else if (ex instanceof AuthorizationException) {
            businessException = new BusinessException(405, "权限不足，访问被拒绝。");
        }
        return businessException;
    }

    /**
     * 获取异常的根异常。
     *
     * @param e 异常
     * @return 根异常
     */
    private static Throwable parseException(Throwable e) {
        Throwable tmp = e;
        int breakPoint = 0;
        while (tmp.getCause() != null) {
            if (tmp.equals(tmp.getCause())) {
                break;
            }
            tmp = tmp.getCause();
            breakPoint++;
            if (breakPoint > 1000) {
                break;
            }
        }
        return tmp;
    }
}