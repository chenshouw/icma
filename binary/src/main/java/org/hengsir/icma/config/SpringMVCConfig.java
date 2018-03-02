package org.hengsir.icma.config;

import org.hengsir.icma.manage.interceptor.LoginInterceptor;
import org.hengsir.icma.manage.menu.MenuHandlerInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author hengsir
 * @date 2018/2/28 上午10:10
 */
@Configuration
public class SpringMVCConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private MenuHandlerInterceptor menuHandlerInterceptor;

    @Autowired
    private LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor).addPathPatterns("/**")
                .excludePathPatterns("/**/*.json", "/**/fonts/*", "/**/*.css", "/**/*.js", "/**/*.png", "/**/*.gif", "/**/*.jpg", "/**/*.jpeg");
        registry.addInterceptor(menuHandlerInterceptor).addPathPatterns("/**")
                .excludePathPatterns("/favicon.ico", "/css/**", "/js/**", "/images/**", "/select/**", "/metronic/**");
    }
}
