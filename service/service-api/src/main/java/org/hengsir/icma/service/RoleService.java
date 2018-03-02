package org.hengsir.icma.service;


import org.hengsir.icma.entity.Role;

import java.util.Set;

/**
 * 角色管理写操作的业务处理类。
 * @author yuanyaping
 * @createTime 2017年11月24日
 * @version 1.0.0
 */
public interface RoleService {
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

    /**
     * 根据用户id查找角色
     * @param userId 用户id
     */
    public Set<String> findRoleByUserId(int userId);

    public Boolean judgeRoleisAdministrator(int userId);

}
