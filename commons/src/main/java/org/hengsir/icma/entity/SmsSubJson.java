package org.hengsir.icma.entity;


import java.io.Serializable;

/**
 * 短信实体。
 * create by lijiguang on 2017-7-12
 */
public class SmsSubJson implements Serializable {
    private static final long serialVersionUID = 1;

    /**
     * 主键。
     */
    private Long   id;
    /**
     * 手机号。
     */
    private String mobile;
    /**
     * 通道。
     */
    private String channel;
    /**
     * 短信内容。
     */
    private String content;
    /**
     * 返回码。
     */
    private String respCode;
    /**
     * 返回信息。
     */
    private String respMsg;

    public Long getKey() {
        return this.id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRespCode() {
        return respCode;
    }

    public void setRespCode(String respCode) {
        this.respCode = respCode;
    }

    public String getRespMsg() {
        return respMsg;
    }

    public void setRespMsg(String respMsg) {
        this.respMsg = respMsg;
    }
}
