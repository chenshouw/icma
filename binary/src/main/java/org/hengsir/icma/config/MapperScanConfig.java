package org.hengsir.icma.config;

import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author hengsir
 * @date 2018/1/29 下午3:05
 * 扫描mapper接口
 */
@Configuration
@AutoConfigureAfter(MybatisConfig.class)
public class MapperScanConfig {

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setBasePackage("org.hengsir.icma.dao.mapper");
        return mapperScannerConfigurer;
    }
}
