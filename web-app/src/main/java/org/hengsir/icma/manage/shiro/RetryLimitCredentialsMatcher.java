package org.hengsir.icma.manage.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * shiro密码输错重试次数处理。
 *
 * @author huangzebin
 */
public class RetryLimitCredentialsMatcher extends HashedCredentialsMatcher
    implements InitializingBean {
    private static final Logger logger              = LoggerFactory.getLogger(
        RetryLimitCredentialsMatcher.class);
    private static final String DEFAULT_CHACHE_NAME = "retryLimitCache";

    private final CacheManager cacheManager;
    private       String       retryLimitCacheName;

    public Cache<String, AtomicInteger> getPasswordRetryCache() {
        return passwordRetryCache;
    }

    public void setPasswordRetryCache(
        Cache<String, AtomicInteger> passwordRetryCache) {
        this.passwordRetryCache = passwordRetryCache;
    }

    private Cache<String, AtomicInteger> passwordRetryCache;
    private PasswordHash                 passwordHash;

    private int passwordFailNumber = 5;

    public int getPasswordFailNumber() {
        return passwordFailNumber;
    }

    public void setPasswordFailNumber(int passwordFailNumber) {
        this.passwordFailNumber = passwordFailNumber;
    }

    public RetryLimitCredentialsMatcher(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
        this.retryLimitCacheName = DEFAULT_CHACHE_NAME;
    }

    public String getRetryLimitCacheName() {
        return retryLimitCacheName;
    }

    public void setRetryLimitCacheName(String retryLimitCacheName) {
        this.retryLimitCacheName = retryLimitCacheName;
    }

    public void setPasswordHash(PasswordHash passwordHash) {
        this.passwordHash = passwordHash;
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) {
        String username = (String) authcToken.getPrincipal();
        AtomicInteger retryCount = passwordRetryCache.get(username);
        if (retryCount == null) {
            retryCount = new AtomicInteger(0);
            passwordRetryCache.put(username, retryCount);
        }
        if (retryCount.incrementAndGet() > passwordFailNumber) {
            logger.warn("username: " + username + " 已经尝试超过" + passwordFailNumber + "次");
            throw new ExcessiveAttemptsException(
                "用户名: " + username + " 密码连续输入错误超过" + passwordFailNumber + "次，锁定半小时！");
        }

        boolean matches = super.doCredentialsMatch(authcToken, info);
        if (matches) {
            //清除重试次数数据。
            passwordRetryCache.remove(username);
        } else {
            passwordRetryCache.put(username, retryCount);
        }
        return matches;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Assert.notNull(passwordHash, "必须设置 passwordHash!");
        super.setHashAlgorithmName(passwordHash.getAlgorithmName());
        super.setHashIterations(passwordHash.getHashIterations());
        this.passwordRetryCache = cacheManager.getCache(retryLimitCacheName);
    }
}
