package org.hengsir.icma.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.utils.Page;

import java.util.List;

/**
 * 角色管理Mapper。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
@Mapper
public interface RoleMapper {
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
    public List<Role> findByUserId(@Param("userId") int userId);

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
    public Role findById(@Param("roleId") int roleId);

    /**
     * 查询角色信息数量。
     * @return 数量
     */
    public int findRoleCount(Role role);

    /**
     * 根据角色编号查询。
     * @param roleCode 角色编号
     * @return 角色实体
     */
    Role findByCode(@Param("roleCode") String roleCode);

    /**
     * 增加角色。
     * @param role 角色管理
     */
     void create(Role role);

    /**
     * 删除角色。
     * @param roleId 角色主键
     * @return 删除结果
     */
    void remove(@Param("roleId") int roleId);

    /**
     * 修改角色。
     * @param role 角色管理
     */
    public void update(Role role);
}
