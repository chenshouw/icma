package org.hengsir.icma.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.Right;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.utils.Page;

import java.util.List;

/**
 * 权限管理Mapper。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
@Mapper
public interface RightMapper {

    /**
     * 查询所有的权限。
     * @return 权限集合
     */
    List<Right> findAllRight();


    /**
     * 分页查询所有的权限。
     * @param right 权限信息
     * @param page 分页
     * @return 权限信息列表
     */
    Page<Right> findByRight(Right right, Page<Right> page);

    /**
     * 根据角色查询已经拥有的权限信息。
     * @param roleId 角色主键
     * @return 拥有的权限
     */
    List<Right> findRightByRoleId(@Param("roleId") int roleId);

    /**
     * 根据角色查询已经拥有的权限信息。
     * @param roleList 角色集合
     * @return 拥有的权限
     */
     List<Right> findRightByRoleList(List<Role> roleList);

    /**
     * 根据权限信息获取列表。
     * @param right 权限信息过滤条件
     * @return 权限信息列表
     */
    List<Right> findByRight(Right right);


    /**
     * @param rightId 权限主键。
     * @return 权限信息列表
     */
   Right findById(@Param("rightId") int rightId);


    /**
     * @param menuId 菜单主键。
     * @return 权限信息列表
     */
    Right findRightByMenuId(@Param("menuId") int menuId);

    /**
     * 根据权限Id查询对应的子权限。
     * @param rightId
     * @return
     */
    List<Right> findByParentRightId(@Param("rightId") int rightId);

    /**
     * 根据权限编码查询权限。
     * @param rightCode 权限编码
     * @return 权限信息
     */
    Right findByCode(@Param("rightCode") String rightCode);

    /**
     * 增加权限。
     * @param right 权限信息
     */
     void create(Right right);

    /**
     * 删除权限。
     * @param rightId 权限主键
     * @return 删除结果
     */
    void delete(@Param("rightId") int rightId);

    /**
     * 修改权限。
     * @param right 权限信息
     */
     void update(Right right);

    /**
     * 修改菜單权限。
     * @param right 权限信息
     */
    void updateRightByMenuId(Right right);

    /**
     * 删除菜單权限。
     * @param menuId 菜單id
     */
    void deleteRightByMenuId(@Param("menuId") int menuId);

    /**
     * 根据菜单id修改菜单权限。
     * @param right 权限对象
     */
   Boolean updateSysIdByMenuId(Right right);


    /**
     * 删除菜单。
     * @param rightId
     * @return
     */
    void deleteRight(@Param("rightId") int rightId);

}
