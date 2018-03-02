package org.hengsir.icma.service;


import org.hengsir.icma.entity.Right;

/**
 * 权限管理写操作的业务处理类。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
*/
public interface RightService {

    /**
     * 增加权限。
     * @param right 权限信息
     */
    public Boolean create(Right right);

    /**
     * 删除权限。
     * @param rightId 权限主键
     * @return 删除结果
     */
    public Boolean delete(int rightId);

    /**
     * 修改权限。
     * @param right 权限信息
     */
    public Boolean update(Right right);

    /**
     * 修改菜單权限。
     * @param right 权限信息
     */
    public Boolean updateRightByMenuId(Right right);

    /**
     * 删除菜單权限。
     * @param menuId 菜單id
     */
    public Boolean deleteRightByMenuId(int menuId);

    /**
     * @param rightId 菜单主键。
     */
    public Boolean deleteRight(int rightId);



}
