package org.hengsir.icma.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import redis.clients.jedis.JedisPoolConfig;

import java.util.HashMap;
import java.util.Map;

/**
 * @author hengsir
 * @date 2018/2/27 上午10:28
 */
@Configuration
@PropertySource(value = {"classpath:redis.properties"})
@AutoConfigureBefore(ShiroConfig.class)
public class RedisConfig {

    @Value("${redis.host}")
    private String host;

    @Value("${redis.port}")
    private int port;

    @Value("${redis.pass}")
    private String pass;

    @Value("${redis.maxIdle}")
    private int maxIdle;

    @Value("${redis.maxActive}")
    private int maxActive;

    @Value("${redis.maxWait}")
    private long maxWait;

    @Value("${redis.testOnBorrow}")
    private boolean testOnBorrow;

    @Value("${redis.testOnReturn}")
    private boolean testOnReturn;

    @Value("${redis.numTestsPerEvictionRun}")
    private int numTestsPerEvictionRun;

    @Value("${redis.timeBetweenEvictionRunsMillis}")
    private long timeBetweenEvictionRunsMillis;

    @Value("${redis.minEvictableIdleTimeMillis}")
    private long minEvictableIdleTimeMillis;

    @Value("${redis.softMinEvictableIdleTimeMillis}")
    private long softMinEvictableIdleTimeMillis;

    @Value("${redis.testWhileIdle}")
    private boolean testWhileIdle;

    @Autowired
    private JdkSerializationRedisSerializer jdkSerializationRedisSerializer;

    @Bean
    public JedisPoolConfig jedisPoolConfig(){
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(maxActive);
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setNumTestsPerEvictionRun(numTestsPerEvictionRun);
        jedisPoolConfig.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
        jedisPoolConfig.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
        jedisPoolConfig.setSoftMinEvictableIdleTimeMillis(softMinEvictableIdleTimeMillis);
        jedisPoolConfig.setMaxWaitMillis(maxWait);
        jedisPoolConfig.setTestOnBorrow(testOnBorrow);
        jedisPoolConfig.setTestOnReturn(testOnReturn);
        jedisPoolConfig.setTestWhileIdle(testWhileIdle);
        return jedisPoolConfig;
    }

    @Bean
    public JedisConnectionFactory jedisConnectionFactory(JedisPoolConfig jedisPoolConfig){
        JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory();
        jedisConnectionFactory.setHostName(host);
        jedisConnectionFactory.setPort(port);
        jedisConnectionFactory.setPassword(pass);
        jedisConnectionFactory.setPoolConfig(jedisPoolConfig);
        return jedisConnectionFactory;
    }

    @Bean
    public RedisTemplate redisTemplate(JedisConnectionFactory jedisConnectionFactory){
        RedisTemplate redisTemplate = new RedisTemplate();
        redisTemplate.setConnectionFactory(jedisConnectionFactory);
        redisTemplate.setKeySerializer(jdkSerializationRedisSerializer);
        redisTemplate.setValueSerializer(jdkSerializationRedisSerializer);
        redisTemplate.setHashKeySerializer(jdkSerializationRedisSerializer);
        redisTemplate.setHashValueSerializer(jdkSerializationRedisSerializer);
        return redisTemplate;
    }

    @Bean
    public RedisCacheManager redisCacheManager(RedisTemplate redisTemplate){
        RedisCacheManager redisCacheManager = new RedisCacheManager(redisTemplate);
        //默认缓存10分钟
        redisCacheManager.setDefaultExpiration(600);
        redisCacheManager.setUsePrefix(true);
        //cacheName 缓存超时配置 半小时 一小时 一天
        Map<String,Long> map = new HashMap<String, Long>();
        map.put("halfHour",new Long(1800));
        map.put("hour",new Long(3600));
        map.put("oneDay",new Long(86400));
        map.put("authorizationCache",new Long(1800));
        map.put("authenticationCache",new Long(1800));
        map.put("activeSessionCache",new Long(1800));
        redisCacheManager.setExpires(map);
        return redisCacheManager;
    }
}
