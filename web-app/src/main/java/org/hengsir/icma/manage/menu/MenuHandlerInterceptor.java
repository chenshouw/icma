package org.hengsir.icma.manage.menu;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.hengsir.icma.entity.LeftMenu;
import org.hengsir.icma.manage.scan.ShiroRealService;
import org.hengsir.icma.manage.shiro.ShiroFilterFactoryBeanExtend;
import org.hengsir.icma.manage.shiro.ShiroUser;
import org.hengsir.icma.service.LeftMenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 请求拦截--获取菜单。
 * 2017年5月4日下午5:20:58
 *
 * @author lijiguang
 * @version 1.0.0
 */
@Service
public class MenuHandlerInterceptor implements HandlerInterceptor {

    private Logger logger = LoggerFactory.getLogger(MenuHandlerInterceptor.class);

    @Autowired
    private LeftMenuService leftMenuService;//菜单管理

    @Autowired
    private ShiroFilterFactoryBeanExtend shiroFilterFactoryBeanExtend;

    @Autowired
    private ShiroRealService shiroRealService;

    /**
     * 请求开始时执行。
     */
    @Override
    public boolean preHandle(
            HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.debug("生成菜单拦截器请求开始");
        String url = request.getRequestURI().replace(request.getContextPath(), "");
        //左侧菜单
        try {
            request.setAttribute("pageTitle", "智能课堂点名录入系统");
            Map<String, String> map = shiroFilterFactoryBeanExtend.getFilterChainDefinitionMap();
            Subject subject = SecurityUtils.getSubject();
            ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
            if (shiroUser != null) {
                Set<List<LeftMenu>> menus = shiroUser.getLeftMenus();
                String[] menuHtmlArr = leftMenuService.createMenuHtml(
                    url, shiroUser.getUserAccount(), menus.iterator().next());

                if (menuHtmlArr != null && menuHtmlArr.length == 2) {
                    //左侧菜单
                    request.setAttribute("pageSidebarMenu", menuHtmlArr[0]);
                    //菜单导航
                    request.setAttribute("locationMenu", menuHtmlArr[1]);
                }

            }
        } catch (Exception exception) {
            logger.error("", exception);
            request.setAttribute("pageSidebarMenu", "");
            request.setAttribute("locationMenu", "");
        }
        return true;
    }

    /**
     * 执行成功，渲染页面之前。
     *
     * @param request      请求
     * @param response     响应
     * @param handler      处理
     * @param modelAndView 视图
     * @throws Exception 异常
     */
    public void postHandle(
            HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        logger.debug("生成菜单拦截器请求地址：" + request.getRequestURI());
        String url = request.getRequestURI().replace(request.getContextPath(), "");
        //是否登陆验证
        try {
            if (modelAndView != null) {
                Map<String, String> map = shiroFilterFactoryBeanExtend.getFilterChainDefinitionMap();
                Subject subject = SecurityUtils.getSubject();
                ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
                if (shiroUser == null) {
                    if (!map.containsKey(url)) {
                        modelAndView.setViewName("/login");
                    }
                }
            }
        } catch (Exception exception) {
            logger.error("", exception);
            request.setAttribute("pageSidebarMenu", "");
            request.setAttribute("locationMenu", "");
        }

    }

    /**
     * 请求完成后执行。
     */
    @Override
    public void afterCompletion(
            HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
        throws Exception {
        logger.debug("生成菜单拦截器请求结束");
    }
}
