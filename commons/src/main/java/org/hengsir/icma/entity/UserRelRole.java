package org.hengsir.icma.entity;


import org.hengsir.icma.model.Model;

/**
 * 用户角色关联实体类。
 * Created by lidan on 2017/6/14.
 */
public class UserRelRole implements Model<String> {
    /**
     * 主键
     */
    private Integer id;

    /**
     * 用户主键
     */
    private Integer userId;

    /**
     * 角色主键
     */
    private Integer roleId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    @Override
    public String getKey() {
        return null;
    }
}
