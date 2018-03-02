package org.hengsir.icma.manage.interceptor;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ThreadContext;
import org.hengsir.icma.manage.shiro.ShiroUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 登录后缓存用户信息。
 */
@Service
public class LoginInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);

    @Override
    public boolean preHandle(
            HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o)
        throws Exception {
        ThreadContext.bind(SecurityUtils.getSubject());
        Subject subject = ThreadContext.getSubject();
        Subject user = SecurityUtils.getSubject();
        Object object = user.getPrincipal();
        if (null != object) {
            ShiroUser shiroUser = (ShiroUser) object;
            httpServletRequest.setAttribute("shiroUser", shiroUser.getUserName());

        } else {
            httpServletRequest.setAttribute("shiroUser", "");
        }
        return true;
    }

    @Override
    public void postHandle(
            HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o,
            ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(
            HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o,
            Exception e) throws Exception {

    }

    public final static String getIpAddress(HttpServletRequest request) {

        try {
            /****获取请求主机IP地址,如果通过代理进来，则透过防火墙获取真实IP地址***/
            String ip = request.getHeader("X-Forwarded-For");
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
                if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
                    ip = request.getHeader("X-Real-IP");
                }
                if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
                    ip = request.getHeader("Proxy-Client-IP");
                }
                if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
                    ip = request.getHeader("WL-Proxy-Client-IP");
                }
                if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
                    ip = request.getHeader("HTTP_CLIENT_IP");
                }
                if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
                    ip = request.getHeader("HTTP_X_FORWARDED_FOR");
                }
                if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
                    ip = request.getRemoteAddr();
                }
            } else if (ip.length() > 15) {
                String[] ips = ip.split(",");
                for (int index = 0; index < ips.length; index++) {
                    String strIp = (String) ips[index];
                    if (!("unknown".equalsIgnoreCase(strIp))) {
                        ip = strIp;
                        break;
                    }
                }
            }
            return ip;
        } catch (Exception e) {
            logger.error("获取请求IP异常", e);
            return null;
        }
    }
}
