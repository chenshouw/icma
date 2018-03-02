package org.hengsir.icma.manage.shiro;

import org.apache.shiro.web.filter.authc.UserFilter;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * ajax shiro session超时统一处理。
 * 参考：http://looooj.github.io/blog/2014/06/17/shiro-user-filter.html
 * Created by huangzebin on 2017/5/4.
 */
public class ShiroAjaxSessionFilter extends UserFilter {

    public static boolean isBlank(CharSequence cs) {
        int strLen;
        if (cs != null && (strLen = cs.length()) != 0) {
            for(int i = 0; i < strLen; ++i) {
                if (!Character.isWhitespace(cs.charAt(i))) {
                    return false;
                }
            }

            return true;
        } else {
            return true;
        }
    }

    public static boolean isNotBlank(CharSequence cs) {
        return !isBlank(cs);
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response)
            throws Exception {
        HttpServletRequest req = WebUtils.toHttp(request);
        String xmlHttpRequest = req.getHeader("X-Requested-With");
        if (isNotBlank(xmlHttpRequest)) {
            if (xmlHttpRequest.equalsIgnoreCase("XMLHttpRequest")) {
                HttpServletResponse res = WebUtils.toHttp(response);
                // 采用res.sendError(401);在一些jquery框架中会处理掉error，$.ajaxSetup中监听不到
                res.setHeader("oauthstatus", "401");
                return false;
            }
        }
        return super.onAccessDenied(request, response);
    }
}
