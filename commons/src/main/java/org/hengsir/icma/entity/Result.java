package org.hengsir.icma.entity;

import java.io.Serializable;

/**
 * 返回结果。
 * Created by lijiguang on 2017/7/13.
 */
public class Result implements Serializable {

    private static final long serialVersionUID = 1L;
    /**
     * 返回码。
     */
    private String respCode;
    /**
     * 返回信息。
     */
    private String respMsg;

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

    @Override
    public String toString() {
        return "Result{" + "respCode='" + respCode + '\'' + ", respMsg='" + respMsg + '\'' + '}';
    }
}
