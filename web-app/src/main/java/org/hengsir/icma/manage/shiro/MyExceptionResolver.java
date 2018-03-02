package org.hengsir.icma.manage.shiro;

import org.apache.shiro.authz.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 处理无权限异常。
 * Created by lidan on 2017/7/25.
 */
public class MyExceptionResolver implements HandlerExceptionResolver {

    /**
     * 打印日志。
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(MyExceptionResolver.class);

    /**
     * 处理无权限异常。
     * @param request 请求
     * @param response 响应
     * @param handler 处理器
     * @param ex 异常
     * @return 无权限跳转页面
     */
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {
        LOGGER.info("==============异常开始=============", ex);
        //如果是shiro无权操作，因为shiro 在操作auno等一部分不进行转发至无权限url
        if (ex instanceof UnauthorizedException) {
            ModelAndView mv = new ModelAndView("redirect:/unauth");
            return mv;
        }
        LOGGER.info("==============异常结束=============", ex);
        ModelAndView mv = new ModelAndView("redirect:/login");
        return mv;
    }
}
