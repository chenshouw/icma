package org.hengsir.icma.dao;


import org.hengsir.icma.entity.Role;

/**
 *角色读写接口。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
public interface RoleWriteDao extends RoleDao {
    /**
     * 增加角色。
     * @param role 角色管理
     */
    public Role create(Role role);

    /**
     * 删除角色。
     * @param roleId 角色主键
     * @return 删除结果
     */
    public Boolean remove(int roleId);

    /**
     * 修改角色。
     * @param role 角色管理
     */
    public Boolean update(Role role);
}
