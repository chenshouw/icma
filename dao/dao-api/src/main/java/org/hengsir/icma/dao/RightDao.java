package org.hengsir.icma.dao;

import org.hengsir.icma.entity.Right;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.utils.Page;

import java.util.List;

/**
 * 权限只读接口。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
public interface RightDao {

    /**
     * 查询所有的权限。
     * @return 权限集合
     */
    public List<Right> findAllRight();


    /**
     * 分页查询所有的权限。
     * @param right 权限信息
     * @param page 分页
     * @return 权限信息列表
     */

    public Page<Right> findByRight(Right right, Page<Right> page);

    /**
     * 根据角色查询已经拥有的权限信息。
     * @param roleId 角色主键
     * @return 拥有的权限
     */
    public List<Right> findRightByRoleId(int roleId);

    /**
     * 根据角色查询已经拥有的权限信息。
     * @param roleList 角色集合
     * @return 拥有的权限
     */
    public List<Right> findRightByRoleList(List<Role> roleList);

    /**
     * 根据权限信息获取列表。
     * @param right 权限信息过滤条件
     * @return 权限信息列表
     */
    public List<Right> findByRight(Right right);


    /**
     * @param rightId 权限主键。
     * @return 权限信息列表
     */
    public Right findById(int rightId);

    /**
     * @param menuId 菜单主键。
     * @return 权限信息列表
     */
    public Right findRightByMenuId(int menuId);

    /**
     * 根据权限Id查询对应的子权限。
     * @param rightId
     * @return
     */
    List<Right> findByParentRightId(int rightId);

    /**
     * 根据权限编码查询权限。
     * @param rightCode 权限编码
     * @return 权限信息
     */
    Right findByCode(String rightCode);
}
