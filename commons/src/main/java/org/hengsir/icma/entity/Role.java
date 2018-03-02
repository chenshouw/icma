package org.hengsir.icma.entity;



import org.hengsir.icma.model.Model;

import java.util.Date;

/**
 * 角色管理实体类。
 *
 */
public class Role implements Model<Integer> {

    private static final long serialVersionUID = 1L;
    /**
     * 主键。
     */

    private Integer roleId;

    /**
     * 角色名称。
     */
    private String roleName;

    /**
     * 角色描述。
     */
    private  String roleDesc;

    /**
     * 角色状态。
     */
    private int roleStatus;

    /**
     * 创建人员。
     */
    private  String roleOperator;

    /**
     * 创建时间。
     */
    private Date createTime;

    /**
     * 修改时间。
     */
    private  Date updateTime;

    /**
     * 角色编码。
     */
    private String roleCode;

    /**
     * 是否超级管理员
     */
    private int isAdmin;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public int getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(int isAdmin) {
        this.isAdmin = isAdmin;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDesc() {
        return roleDesc;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    public int getRoleStatus() {
        return roleStatus;
    }

    public void setRoleStatus(int roleStatus) {
        this.roleStatus = roleStatus;
    }

    public String getRoleOperator() {
        return roleOperator;
    }

    public void setRoleOperator(String roleOperator) {
        this.roleOperator = roleOperator;
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

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    @Override
    public Integer getKey() {
        return this.roleId;
    }

}
