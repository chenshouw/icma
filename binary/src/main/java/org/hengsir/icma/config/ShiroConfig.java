package org.hengsir.icma.config;

import org.apache.shiro.codec.Base64;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.web.mgt.CookieRememberMeManager;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.hengsir.icma.manage.scan.ShiroRealService;
import org.hengsir.icma.manage.shiro.*;
import org.hengsir.icma.manage.shiro.cache.ShiroSpringCacheManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.MethodInvokingFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.cache.RedisCacheManager;

import javax.servlet.Filter;
import java.util.HashMap;
import java.util.Map;

/**
 * @author hengsir
 * @date 2018/2/27 上午10:09
 * 集成shiro配置
 */
@Configuration
@PropertySource(value = {"classpath:redis.properties"})
public class ShiroConfig {

    @Autowired
    private RedisCacheManager cacheManager;

    @Autowired
    private ShiroRealService shiroRealService;

    /**
     * rememberMe管理器,cipherKey生成见{@code Base64Test.java}
     * @return
     */
    @Bean
    public SimpleCookie rememberMeCookie(){
        SimpleCookie simpleCookie = new SimpleCookie("rememberMe");
        simpleCookie.setHttpOnly(true);
        simpleCookie.setMaxAge(7*24*60*60);
        return simpleCookie;
    }

    /**
     * rememberMe管理器
     * @return
     */
    @Bean
    public CookieRememberMeManager cookieRememberMeManager(SimpleCookie rememberMeCookie){
        CookieRememberMeManager cookieRememberMeManager = new CookieRememberMeManager();
        cookieRememberMeManager.setCipherKey(Base64.decode("empodDEyMwAAAAAAAAAAAA=="));
        cookieRememberMeManager.setCookie(rememberMeCookie);
        return cookieRememberMeManager;
    }

    /**
     * 开启shiro aop注解支持. 使用代理方式;所以需要开启代码支持; Controller才能使用@RequiresPermissions
     *
     * @param securityManager
     * @return
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(
            @Qualifier("securityManager") SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }

    /**
     * 会话管理器
     * @return
     */
    @Bean
    public DefaultWebSessionManager sessionManager(EnterpriseCacheSessionDAO sessionDAO){
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        //设置全局会话超时时间 半小时 session共享将取决与sessionDao中cacheManager缓存存储时长
        sessionManager.setGlobalSessionTimeout(3*1000*60);
        sessionManager.setSessionDAO(sessionDAO);
        sessionManager.setSessionIdCookie(new SimpleCookie("icma_SHIRO_SESSIONID"));
        return sessionManager;
    }

    /**
     * 会话DAO 用于会话的CRUD
     * @return
     */
    @Bean
    public EnterpriseCacheSessionDAO sessionDAO(){
        EnterpriseCacheSessionDAO sessionDAO = new EnterpriseCacheSessionDAO();
        sessionDAO.setActiveSessionsCacheName("manager-activeSessionCache");
        sessionDAO.setCacheManager(shiroSpringCacheManager());
        return sessionDAO;
    }

    /**
     * 用户授权信息Cache, 采用spring-cache, 具体请查看spring-ehcache.xml、spring-redis.xml
     * @return
     */
    @Bean
    public ShiroSpringCacheManager shiroSpringCacheManager(){
        ShiroSpringCacheManager shiroSpringCacheManager = new ShiroSpringCacheManager();
        shiroSpringCacheManager.setCacheManager(cacheManager);
        return shiroSpringCacheManager;
    }

    /**
     * 在方法中 注入  securityManager ，进行代理控制
     * @return
     */
    @Bean
    public MethodInvokingFactoryBean methodInvokingFactoryBean(SecurityManager securityManager){
        MethodInvokingFactoryBean methodInvokingFactoryBean = new MethodInvokingFactoryBean();
        methodInvokingFactoryBean.setStaticMethod("org.apache.shiro.SecurityUtils.setSecurityManager");
        methodInvokingFactoryBean.setArguments(new Object[]{securityManager});
        return methodInvokingFactoryBean;
    }

    /**
     * shiro密码加密配置
     * @return
     */
    @Bean
    public PasswordHash passwordHash(){
        PasswordHash passwordHash = new PasswordHash();
        passwordHash.setAlgorithmName("md5");
        passwordHash.setHashIterations(1);
        return passwordHash;
    }

    /**
     * 密码错误5次锁定半小时
     * @return
     */
    @Bean("credentialsMatcher")
    public RetryLimitCredentialsMatcher credentialsMatcher(PasswordHash passwordHash){
        RetryLimitCredentialsMatcher credentialsMatcher = new RetryLimitCredentialsMatcher(shiroSpringCacheManager());
        credentialsMatcher.setRetryLimitCacheName("halfHour");
        credentialsMatcher.setPasswordHash(passwordHash);
        credentialsMatcher.setPasswordFailNumber(5);
        return credentialsMatcher;
    }

    /**
     * 項目自定义的Realm
     * @return
     */
    @Bean("shiroReal")
    public ShiroReal shiroReal(ShiroSpringCacheManager shiroSpringCacheManager,@Qualifier("credentialsMatcher") RetryLimitCredentialsMatcher credentialsMatcher){
        ShiroReal shiroReal = new ShiroReal(shiroSpringCacheManager,credentialsMatcher);
        shiroReal.setAuthenticationCachingEnabled(false);
        shiroReal.setAuthorizationCachingEnabled(false);
        shiroReal.setAuthenticationCacheName("authenticationCache");
        shiroReal.setAuthorizationCacheName("authorizationCache");
        shiroReal.setShiroRealService(shiroRealService);
        return shiroReal;
    }


    /**
     * 保证实现了Shiro内部lifecycle函数的bean执行
     * @return
     */
    @Bean(value = "lifecycleBeanPostProcessor")
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor(){
        LifecycleBeanPostProcessor lifecycleBeanPostProcessor = new LifecycleBeanPostProcessor();
        return lifecycleBeanPostProcessor;
    }

    /**
     * AOP式方法级权限检查
     * @return
     */
    @Bean
    @DependsOn(value = "lifecycleBeanPostProcessor")
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator(){
        DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        defaultAdvisorAutoProxyCreator.setProxyTargetClass(true);
        return defaultAdvisorAutoProxyCreator;
    }

    /**
     * 启用shrio 控制器授权注解拦截方式
     * @return
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor advisor(SecurityManager securityManager){
        AuthorizationAttributeSourceAdvisor advisor = new AuthorizationAttributeSourceAdvisor();
        advisor.setSecurityManager(securityManager);
        return advisor;
    }


    @Bean
    public ShiroFilterFactoryBeanExtend shiroFilterFactoryBeanExtend(SecurityManager securityManager,ShiroAjaxSessionFilter ajaxSessionFilter){
        ShiroFilterFactoryBeanExtend shiroFilterFactoryBeanExtend = new ShiroFilterFactoryBeanExtend();
        shiroFilterFactoryBeanExtend.setSecurityManager(securityManager);
        shiroFilterFactoryBeanExtend.setLoginUrl("/login/");
        shiroFilterFactoryBeanExtend.setSuccessUrl("/home/");
        shiroFilterFactoryBeanExtend.setUnauthorizedUrl("/unauth/");
        Map<String,Filter> map = new HashMap<>();
        map.put("user",ajaxSessionFilter);
        shiroFilterFactoryBeanExtend.setFilters(map);
        return shiroFilterFactoryBeanExtend;
    }

    /**
     * ajax session超时时处理
     * @return
     */
    @Bean
    public ShiroAjaxSessionFilter ajaxSessionFilter(){
        ShiroAjaxSessionFilter ajaxSessionFilter = new ShiroAjaxSessionFilter();
        return ajaxSessionFilter;
    }

    /**
     * 安全管理器
     * @return
     */
    @Bean("securityManager")
    public SecurityManager securityManager(@Qualifier("shiroReal") ShiroReal shiroReal, ShiroSpringCacheManager shiroSpringCacheManager, CookieRememberMeManager cookieRememberMeManager){
        DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();
        defaultWebSecurityManager.setRealm(shiroReal);
        defaultWebSecurityManager.setCacheManager(shiroSpringCacheManager);
        defaultWebSecurityManager.setRememberMeManager(cookieRememberMeManager);
        return defaultWebSecurityManager;
    }

}
