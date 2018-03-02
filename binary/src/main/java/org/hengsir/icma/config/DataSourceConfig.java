package org.hengsir.icma.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;

/**
 * @author hengsir
 * @date 2018/1/29 上午11:33
 */
@Configuration
@PropertySource(value = {"classpath:jdbc.properties"})
public class DataSourceConfig {

    @Value("${jdbc.username}")
    private String jdbcUserName;

    @Value("${jdbc.password}")
    private String jdbcPassWord;

    @Value("${jdbc.url}")
    private String jdbcUrl;

    @Value("${jdbc.driver}")
    private String jdbcDriver;

    @Bean
    public DataSource dataSource(){
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setDriverClassName(jdbcDriver);
        druidDataSource.setUsername(jdbcUserName);
        druidDataSource.setPassword(jdbcPassWord);
        druidDataSource.setUrl(jdbcUrl);
        druidDataSource.setMaxActive(10);
        druidDataSource.setMinIdle(5);
        return druidDataSource;
    }

}
