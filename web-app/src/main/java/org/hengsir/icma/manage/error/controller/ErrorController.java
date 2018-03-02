package org.hengsir.icma.manage.error.controller;

import org.hengsir.icma.manage.exception.BusinessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * 异常处理
 * Created by jiantao on 2017/8/14.
 */
@Controller
@RequestMapping("/error")
public class ErrorController {

    /**
     * 跳转到404页面
     */
    @RequestMapping(value = "/notfound", method = {RequestMethod.GET})
    public ModelAndView notFound(HttpServletRequest request) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/error/inner-error");
        modelAndView.addObject("error", new BusinessException(404, "我们找不到你访问的网页。"));
        return modelAndView;
    }

    /**
     * 跳转到500页面
     */
    @RequestMapping(value = "innererror", method = {RequestMethod.GET})
    public ModelAndView innerError(HttpServletRequest request) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/error/inner-error");
        modelAndView.addObject("error", new BusinessException(500, "哎呀！访问出错啦。"));
        return modelAndView;
    }

}
