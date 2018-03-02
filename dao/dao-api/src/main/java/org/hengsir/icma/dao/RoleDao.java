package org.hengsir.icma.dao;


import org.hengsir.icma.entity.Role;
import org.hengsir.icma.utils.Page;

import java.util.List;

/**
 * 角色只读接口。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
public interface RoleDao {
    /**
     * 查询所有的角色。
     * @return 角色管理集合
     */
    public List<Role> findAll();

    /**
     * 根据用户ID所有的角色。
     * @param userId 用户ID
     * @return 角色管理集合
     */
    public List<Role> findByUserId(int userId);

    /**
     * 分页查询所有的角色。
     * @param role 角色管理
     * @param page 分页
     * @return 角色管理列表
     */

    public Page<Role> findByRole(Role role, Page<Role> page);

    /**
     * 根据角色管理获取列表。
     * @param role 角色管理过滤条件
     * @return 角色管理列表
     */
    public List<Role> findByRole(Role role);


    /**
     * @param roleId 角色主键。
     * @return 角色管理列表
     */
    public Role findById(int roleId);

    /**
     * 查询角色信息数量。
     * @return 数量
     */
    int findRoleCount(Role role);

    /**
     * 根据角色编号查询。
     * @param roleCode 角色编号
     * @return 角色实体
     */
    Role findByCode(String roleCode);
}
