package org.hengsir.icma.manage.controller;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * 首页处理。
 *
 * @author lijiguang
 * @version 1.0.0
 * @createTime 2017年5月8日下午3:05:23
 */
@Controller
public class HomeController extends BaseController {

    /**
     * 跳转到首页。
     *
     * @param request request
     * @return String 返回首页
     */
    @RequestMapping(value = "/home", method = {RequestMethod.GET})
    public ModelAndView page(HttpServletRequest request) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/home");
        return modelAndView;
    }

    @RequestMapping(value = "/{page}")
    public String page(@PathVariable String page) {
        return page;
    }

    /**
     * 登录界面跳转。
     *
     * @return 跳转路径
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        if (SecurityUtils.getSubject().isAuthenticated()) {
            return "/home";
        }
        return "/login";
    }

    /**
     * 未授权。
     */
    @RequestMapping("/unauth")
    public String unauth() {
        if (!SecurityUtils.getSubject().isAuthenticated()) {
            return "redirect:/login";
        }
        return "/unauth";
    }

    @RequestMapping("/")
    public String index() {
        return "/home";
    }
}
