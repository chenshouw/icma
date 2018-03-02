package org.hengsir.icma.manage.shiro;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;

/**
 * shiro框架密码校验，采用md5加盐加密方式。
 * @author huangzebin
 */
public class PasswordHash implements InitializingBean {

    private String algorithmName;
    private int    hashIterations;

    public String getAlgorithmName() {
        return algorithmName;
    }

    public void setAlgorithmName(String algorithmName) {
        this.algorithmName = algorithmName;
    }

    public int getHashIterations() {
        return hashIterations;
    }

    public void setHashIterations(int hashIterations) {
        this.hashIterations = hashIterations;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Assert.hasLength(algorithmName, "algorithmName mast be MD5、SHA-1、SHA-256、SHA-384、SHA-512");
    }

    /**
     * 把源密码转为hash码。
     * @param source 密码
     * @param salt 盐
     * @return hash码
     */
    public String toHex(Object source, Object salt) {
        return new SimpleHash(algorithmName, source, salt, hashIterations).toHex();
    }
}
