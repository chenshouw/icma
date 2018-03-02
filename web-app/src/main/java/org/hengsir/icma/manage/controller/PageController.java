package org.hengsir.icma.manage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 页面跳转。
 *
 * @author huangzebin
 */
@Controller
@RequestMapping("/index")
public class PageController extends BaseController {

    @RequestMapping(value = "/{page}", method = {RequestMethod.GET})
    public String page(@PathVariable String page) {
        return page;
    }


}
