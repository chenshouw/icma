package org.hengsir.icma.entity;


import org.hengsir.icma.model.Model;

import java.util.Date;

public class User implements Model<String> {
    /**
     * 主键。
     */
    private Integer userId;
    /**
     * 用户名。
     */
    private String userName;
    /**
     * 用户账号。
     */
    private String userAccount;
    /**
     * 用户名密码。
     */
    private String userPassword;
    /**
     * personId。
     */
    private String personId;
    /**
     * 机构id。
     */
    private int groupId;
    /**
     * 创建时间。
     */
    private Date createTime;
    /**
     * 修改时间。
     */
    private Date updateTime;
    /**
     * 用户状态。
     */
    private int userStatus;
    /**
     * 性别。
     */
    private int userSex;
    /**
     * 身份证号。
     */
    private String userIdCard;

    /**
     * 手机号
     */
    private String mobile;



    public String getUserIdCard() {
        return userIdCard;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public void setUserIdCard(String userIdCard) {
        this.userIdCard = userIdCard;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public int getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(int userStatus) {
        this.userStatus = userStatus;
    }

    public int getUserSex() {
        return userSex;
    }

    public void setUserSex(int userSex) {
        this.userSex = userSex;
    }

    public String getIdCard() {
        return userIdCard;
    }

    public void setIdCard(String idCard) {
        this.userIdCard = idCard;
    }

    @Override
    public String getKey() {
        return userId+"";
    }
}
