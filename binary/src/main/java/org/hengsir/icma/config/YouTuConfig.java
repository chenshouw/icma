package org.hengsir.icma.config;

import org.hengsir.icma.utils.InitBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * @author hengsir
 * @date 2018/1/29 下午3:44
 */
@Configuration
@PropertySource(value = {"classpath:youtu.properties"})
public class YouTuConfig {

    @Value("${appId}")
    private String appId;

    @Value("${secretId}")
    private String secretId;

    @Value("${secretKey}")
    private String secretKey;

    @Value("${userId}")
    private String userId;

    @Bean(initMethod = "init")
    public InitBean initBean(){
        InitBean initBean = new InitBean();
        initBean.setAPP_ID(appId);
        initBean.setSECRET_ID(secretId);
        initBean.setSECRET_KEY(secretKey);
        initBean.setUSER_ID(userId);
        return initBean;
    }
}
