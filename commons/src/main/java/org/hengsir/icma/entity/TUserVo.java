package org.hengsir.icma.entity;


/**
 * 用户对象
 * Created by lidan on 2017/6/14.
 */
public class TUserVo extends User {
    /**
     * 创建开始时间。
     */
    private String createTimeBegin;
    /**
     * 创建结束时间。
     */
    private String createTimeEnd;

    private String oldmobile;

    private String oldUserAccount;

    public String getCreateTimeBegin() {
        return createTimeBegin;
    }

    public void setCreateTimeBegin(String createTimeBegin) {
        this.createTimeBegin = createTimeBegin;
    }

    public String getCreateTimeEnd() {
        return createTimeEnd;
    }

    public void setCreateTimeEnd(String createTimeEnd) {
        this.createTimeEnd = createTimeEnd;
    }

    public String getOldmobile() {
        return oldmobile;
    }

    public void setOldmobile(String oldmobile) {
        this.oldmobile = oldmobile;
    }

    public String getOldUserAccount() {
        return oldUserAccount;
    }

    public void setOldUserAccount(String oldUserAccount) {
        this.oldUserAccount = oldUserAccount;
    }
}
