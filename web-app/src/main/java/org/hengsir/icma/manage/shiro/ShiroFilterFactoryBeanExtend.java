package org.hengsir.icma.manage.shiro;

import org.apache.shiro.mgt.DefaultSecurityManager;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.net.URL;
import java.util.*;


/**
 * 新增登录过滤配置。
 * @author lidan
 */
public class ShiroFilterFactoryBeanExtend extends ShiroFilterFactoryBean
        implements InitializingBean, ApplicationContextAware {

    /**
     * 过滤配置文件。
     */
    private static final  String FILTER_FILE = "shiro-filter.properties";
    /**
     * 日志处理。
     */
    private static final Logger logger      = LoggerFactory.getLogger(
            ShiroFilterFactoryBeanExtend.class);
    /**
     * 上下文。
     */
    private ApplicationContext applicationContext;

    public ShiroFilterFactoryBeanExtend() {
    }

    /**
     * bean初始化完成后执行。
     *
     * @throws Exception 异常
     */
    public void afterPropertiesSet() throws Exception {
        DefaultSecurityManager securityManager = (DefaultSecurityManager) this.getSecurityManager();
        if (securityManager != null) {
            Map<String, String> filterChainDefinitionMap = this.getFilterChainDefinitionMap();
            if (filterChainDefinitionMap != null && !filterChainDefinitionMap.isEmpty()) {
                this.setFilterChainDefinitionMap(filterChainDefinitionMap);
            }
        }

    }

    /**
     * properties信息转换为map。
     *
     * @return 配置信息
     */
    public Map<String, String> getFilterChainDefinitionMap() {
        LinkedHashMap<String, String> result = new LinkedHashMap<>();
        try {
            ClassPathResource resource = new ClassPathResource(FILTER_FILE);
            URL url = resource.getURL();

            Properties props = new OrderedProperties();
            props.load(url.openStream());


            Enumeration<Object> keys = props.keys();
            while (keys.hasMoreElements()) {
                String key = (String) keys.nextElement();
                result.put(key,props.getProperty(key));
            }
        } catch (IOException exception) {
            if (logger.isWarnEnabled()) {
                logger.warn(exception.getMessage(), exception);
            }
        }

        return result;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public class OrderedProperties extends Properties {
        private static final long  serialVersionUID = 1L;
        private final  LinkedHashSet<Object> keys   = new LinkedHashSet<>();

        public Enumeration<Object> keys() {
            return Collections.<Object>enumeration(keys);
        }

        public Object put(Object key, Object value) {
            keys.add(key);
            return super.put(key, value);
        }

        public Set<Object> keySet() {
            return keys;
        }

        /**
         * 转换为String。
         * @return Set
         */
        public Set<String> stringPropertyNames() {
            Set<String> set = new LinkedHashSet<>();

            for (Object key : this.keys) {
                set.add((String) key);
            }

            return set;
        }
    }

}
