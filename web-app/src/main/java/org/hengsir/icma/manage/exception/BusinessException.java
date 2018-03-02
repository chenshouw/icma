package org.hengsir.icma.manage.exception;

/**
 * 业务处理异常。
 *
 * @author lijiguang
 */
public class BusinessException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    /**
     * 错误代码。
     * 默认值：500
     */
    private              int  status           = 500;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }


    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(int status, String message) {
        super(message);
        this.status = status;
    }

    public BusinessException(Throwable cause) {
        super(cause);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }

    public String getMsg() {
        return this.getMessage();
    }
}
