package org.hengsir.icma.manage.shiro;


import org.hengsir.icma.entity.LeftMenu;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息。
 *
 * @author hengsir
 */
public class ShiroUser implements Serializable {

    private static final long serialVersionUID = 1L;

    private int                 id;
    private String              userName;
    private String              userPassword;
    private String              userAccount;
    private int                 userId;
    private int                 groupId;
    private Set<String>         roles;
    private Set<List<LeftMenu>> LeftMenus;
    private Set<String>         rights;
    private String              mobile;
    private boolean             isAdmin;//是否超级管理员

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Set<List<LeftMenu>> getLeftMenus() {
        return LeftMenus;
    }

    public void setLeftMenus(Set<List<LeftMenu>> leftMenus) {
        LeftMenus = leftMenus;
    }

    public Set<String> getRights() {
        return rights;
    }

    public void setRights(Set<String> rights) {
        this.rights = rights;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    @Override
    public String toString() {
        return userName;
    }
}

