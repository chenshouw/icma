package org.hengsir.icma.manage.controller;

public enum ResultCode {

    SUCCESS("00","登录成功"),
    FAILURE("01","登录失败"),
    LOGOUT("00","登出成功"),
    LOGOUTERROR("01","登出失败"),
    FAIL_MERCHANTNO("02","商户号错误"),
    FAIL_OPHONE("03","手机号错误"),
    FAIL_OPASSW("04","密码错误"),
    EXCEPTION("9998","服务器繁忙，请稍后再试"),
    PARAM_INVALIDE("9001","数据没有通过验证"),
    CAPTCHA_ERROR("9002","验证码错误");


    private String code;
    private String msg;




    ResultCode(){}
    ResultCode(String code,String msg){

        this.code=code;
        this.msg=msg;
    }


    public static String getMsg(String code) {
        for (ResultCode rc : ResultCode.values()) {
            if (rc.getCode().equals(code)) {
                return rc.msg;
            }
        }
        return null;
    }

    public static String getCode(String msg) {
        for (ResultCode rc : ResultCode.values()) {
            if (rc.getCode().equals(msg)) {
                return rc.code;
            }
        }
        return null;
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

}
