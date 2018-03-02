package org.hengsir.icma.manage.controller;

/**
 * ajax返回结果。
 * @author huangzebin
 */
public class JsonResult {
    public static final String SUCCESS = "00";

    public static final String FAIL = "01";

    /**
     * 会话sessionId
     */
    private  String sessionId;

    private String code;

    private String msg;

    private Object data;

    public JsonResult() {

    }

    /**
     * 构造函数。
     * @param code code
     * @param message 提示语
     */
    public JsonResult(String code, String message) {
        this(code, message, null);
    }

    /**
     * 构造函数。
     * @param code code
     * @param msg 提示语
     * @param data 返回到前端的数据
     */
    public JsonResult(String code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    /**
     * 构造函数。
     * @param code code
     * @param msg 提示语
     * @param data 返回到前端的数据
     * @param sessionId 会话id
     */
    public JsonResult(String code, String msg, Object data,String sessionId) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.sessionId = sessionId;
    }

    public static JsonResult success(String msg,Object data) {

        return new JsonResult(SUCCESS, msg, data);
    }
    public static JsonResult success(String msg,Object data,String sessionId) {
        return new JsonResult(SUCCESS, msg, data,sessionId);
    }

    public static JsonResult success(String msg) {
        return new JsonResult(SUCCESS, msg, null);
    }

    public static JsonResult error(String msg) {
        return new JsonResult(FAIL, msg);
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
