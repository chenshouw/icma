package org.hengsir.icma.entity;


import org.hengsir.icma.model.Model;

/**
 * 角色对应权限实体类。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
public class RightRoleRelation implements Model<Integer> {

    private static final long serialVersionUID = 1L;
    /**
     *主键
     */
    private  Integer id;

    /**
     *权限主键
     */
    private  Integer rightId;

    /**
     *角色主键
     */
    private  Integer roleId;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRightId() {
        return rightId;
    }

    public void setRightId(int rightId) {
        this.rightId = rightId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    @Override
    public Integer getKey() {
        return null;
    }
}