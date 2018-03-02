package org.hengsir.icma.manage.controller;


/**
 * 基础controller，提供一些基本的返回调用。
 *
 * @author huangzebin
 */
public class BaseController {



    /**
     * ajax失败。
     *
     * @param msg 失败的消息提示语
     * @return Object
     */
    public Object renderError(String msg) {
        JsonResult result = new JsonResult();
        result.setCode(JsonResult.FAIL);
        result.setMsg(msg);
        return result;
    }

    /**
     * ajax失败。
     *
     * @param code 错误码
     * @param msg  错误提示信息
     * @return JsonResult
     */
    public Object renderError(String code, String msg) {
        JsonResult result = new JsonResult();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }

    /**
     * 错误响应
     * @param msg
     * @param object
     * @return
     */
    public Object renderError(String msg,Object object) {
        JsonResult result = new JsonResult();
        result.setCode(JsonResult.FAIL);
        result.setMsg(msg);
        result.setData(object);
        return result;
    }

    /**
     * ajax成功。
     *
     * @return object
     */
    public Object renderSuccess() {
        JsonResult result = new JsonResult();
        result.setCode(JsonResult.SUCCESS);
        return result;
    }

    /**
     * ajax成功。
     *
     * @param msg 成功的消息提示语
     * @return Object
     */
    public Object renderSuccess(String msg) {
        JsonResult result = new JsonResult();
        result.setCode(JsonResult.SUCCESS);
        result.setMsg(msg);
        return result;
    }

    /**
     * ajax成功。
     *
     * @param obj 成功对象
     * @return Object
     */
      public Object renderSuccess(String msg,Object obj) {
        JsonResult result = new JsonResult();
        result.setCode(JsonResult.SUCCESS);
        result.setMsg(msg);
        result.setData(obj);
        return result;
    }

    /**
     * ajax成功。
     *
     * @param obj 成功对象
     * @param sessionId 会话id
     * @return
     */
    public Object renderSuccess(String msg,Object obj,String sessionId) {
        JsonResult result = new JsonResult();
        result.setCode(JsonResult.SUCCESS);
        result.setMsg(msg);
        result.setData(obj);
        result.setSessionId(sessionId);
        return result;
    }

    /**
     * redirect跳转。
     *
     * @param url 目标url
     * @return spring mvc重定向格式
     */
    protected String redirect(String url) {
        return "redirect:" + url;
    }

    /**
     * <pre>
     * 返回成功对象
     * </pre>
     *
     * @return
     */
    public static final <T> ServiceResult<T> returnSuc(T t, String sessionId, String oPhone) {
        return ServiceResult.success(t,sessionId,oPhone);
    }

    public static final<T>ServiceResult<T> returnSuc(T t){
        return ServiceResult.success(t);
    }
    /**
     * <pre>
     * 返回失败对象
     * </pre>
     *
     * @return
     */

    public static final <T> ServiceResult<T> returnFail(String code, String message, T t, String sessionId) {
        return ServiceResult.error(code,message,t,sessionId);
    }

    /**
     * <pre>
     * 返回失败对象
     * </pre>
     *
     * @return
     */
    public static final <T> ServiceResult<T> returnFail(String code, String message) {
        return ServiceResult.error(code, message);//new ServiceResult<T>(code, message, t);
    }


    public static final<T>ServiceResult<T> returnFail(T t){
        return  ServiceResult.error(t);
    }

    /**
     * <pre>
     * 返回异常对象
     * </pre>
     *
     * @return
     */
    public static final <T> ServiceResult<T> returnException() {
        return returnFail(ResultCode.EXCEPTION.getCode(), ResultCode.EXCEPTION.getMsg());
    }

    /**
     * <pre>
     * 返回异常对象
     * </pre>
     *
     * @return
     */
    public static final <T> ServiceResult<T> returnException(Exception e) {

        return returnFail(ResultCode.EXCEPTION.getCode(),
                (e.getMessage() != null ? e.getMessage() : ResultCode.EXCEPTION.getMsg()));
    }

    /**
     * <pre>
     * 参数校验失败
     * </pre>
     *
     * @return
     */
    public static final <T> ServiceResult<T> returnFailForParamInvalid() {
        return ServiceResult.error(ResultCode.PARAM_INVALIDE.getCode(), ResultCode.PARAM_INVALIDE.getMsg());
    }

}
