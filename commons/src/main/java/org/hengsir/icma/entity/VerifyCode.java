package org.hengsir.icma.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * 验证码对象。
 * Created by lijiguang on 2017/7/13.
 */
public class VerifyCode implements Serializable {

    private static final long serialVersionUID = 1L;
    /**
     * 验证码。
     */
    private String code;
    /**
     * 生成时间戳。
     */
    private Long   createTime;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "VerifyCode{" + "code='" + code + '\'' + ", createTime=" + createTime + '}';
    }
}
