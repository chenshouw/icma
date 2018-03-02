package org.hengsir.icma.manage.controller;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.io.Serializable;

public class ServiceResult<T> implements Serializable {
    private static final long serialVersionUID = -9018966931533419788L;
    private String code = "00";
    private String message = "操作成功";
    private Boolean success = true;
    private T value;
    private String sessionId;
    private String oPhone;

    public static <T> ServiceResult<T> success(T t) {
        return (new ServiceResult(t));
    }

    public static<T>ServiceResult<T>error(T t){
        return (new ServiceResult<>(t).failure());
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getoPhone() { return oPhone; }

    public void setoPhone(String oPhone) {
        this.oPhone = oPhone;
    }










    public ServiceResult(T value,String sessionId,String oPhone) {
        this.value = value;
        this.sessionId=sessionId;
        this.oPhone=oPhone;
    }

    public ServiceResult(String code,String message,T value,String sessionId,String oPhone) {
        this.code=code;
        this.message=message;
        this.value = value;
        this.sessionId=sessionId;
        this.oPhone=oPhone;
    }



    public static ServiceResult<?> empty() {
        return new ServiceResult();
    }

    public ServiceResult() {
    }

    public ServiceResult(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ServiceResult(String code, String message, boolean success) {
        this.code = code;
        this.message = message;
        this.success = success;
    }


    public ServiceResult(String code, String message,String se) {
        this.code = code;
        this.message = message;
    }


    public ServiceResult(boolean success) {
        this.success = success;
    }

    public ServiceResult(T value) {
        this.value = value;
        this.success = true;
    }

    public ServiceResult(T value,String sessionId) {
        this.value = value;
       this.sessionId=sessionId;
    }

    public static <T> ServiceResult<T> success(T t, String sessionId,String oPhone) {
        return (new ServiceResult(t,sessionId,oPhone)).success();
    }

    public String getCode() {
        return this.code;
    }


    public ServiceResult(String code,String message,T value,String sessionId) {
        this.code=code;
        this.message=message;
        this.value = value;
        this.sessionId=sessionId;
    }


    public ServiceResult<T> failure() {
        this.success = false;
        return this;
    }

    public ServiceResult<T> success() {
        this.success = true;
        return this;
    }


    public ServiceResult<T> setMessage(String message) {
        this.message = message;
        return this;
    }

    public Boolean getSuccess() {
        return this.success;
    }

    public ServiceResult<T> setSuccess(Boolean success) {
        this.success = success;
        return this;
    }

    public T getValue() {
        return this.value;
    }

    public ServiceResult<T> setValue(T value) {
        this.value = value;
        return this;
    }

    public ServiceResult<T> setCode(String code) {
        this.code = code;
        return this;
    }



    public static <T> ServiceResult<T> error(String message) {
        ServiceResult<T> response = new ServiceResult();
        response.setMessage(message);
        return response.failure();
    }

    public static <T> ServiceResult<T> error(String code, String message) {
        return (new ServiceResult(code, message)).failure();
    }

    public static <T> ServiceResult<T> error(String code, String message, T t, String sessionId) {
        return (new ServiceResult(code,message, t,sessionId)).failure();
    }

    public String getMessage() {
        return this.message;
    }



    public static <T> ServiceResult<T> success(String code, String message) {
        return (new ServiceResult(code,message)).failure();
    }



    public static <T> ServiceResult<T> getInstance() {
        ServiceResult<T> response = new ServiceResult();
        return response;
    }

    public static <T> ServiceResult<T> getInstance(T t) {
        ServiceResult<T> response = new ServiceResult();
        response.setValue(t);
        return response;
    }





    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }




    public void rollback() {
        TransactionStatus transactionStatus = TransactionAspectSupport.currentTransactionStatus();
        if (transactionStatus != null) {
            transactionStatus.setRollbackOnly();
        }

    }
}
