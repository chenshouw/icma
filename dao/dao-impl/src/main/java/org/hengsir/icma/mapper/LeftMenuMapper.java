package org.hengsir.icma.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.LeftMenu;

import java.util.List;


/**
 * 菜单Mapper。
 * @author yuanyaping
 * @createTime 2017年12月1日
 * @version 1.0.0
 */
@Mapper
public interface LeftMenuMapper {
    /**
     * 获取所有菜单。
     * @return 数据集合
     */
    public List<LeftMenu> findAll();

    /**
     * 通过菜单对象查找菜单集合。
     * @param leftMenu 菜单对象
     * @return 菜单集合
     */
    public List<LeftMenu> findLeftMenusBy(LeftMenu leftMenu);
    
    /**
     * 查询所有的父级菜单。
     * @return 父级菜单集合
     */
    public List<LeftMenu> findFatherMenu();
    
    /**
     * 通过Id查找菜单是否存在。
     * @param id 菜单id
     * @return 菜单对象
     */
    public LeftMenu findLeftMenuById(@Param("id") int id);

    /**
     * 根据父菜单名称查找其对应的所有子菜单。
     * @param superCode 菜单的父级编码
     * @return 此菜单的所有子菜单
     */
    public List<LeftMenu> findSonMenus(@Param("superCode") String superCode);

    /**
     * 通过编码找到菜单对象。
     * @param code 菜单编码
     * @return 菜单对象
     */
    public LeftMenu findLeftMenuBySuperCode(@Param("code") String code);

    /**
     * 查询所有的子菜单。
     * @return 子菜单集合
     */
    public List<LeftMenu> findAllSonMenus();

    /**
     * 查询所有的子菜单,出去主页菜单。
     * @return 子菜单集合
     */
    List<LeftMenu> findAllLoseHome();

    /**
     * 新增菜单。
     * @param leftMenu 菜单
     */
    public void create(LeftMenu leftMenu);

    /**
     * 修改菜单。
     * @param leftMenu 菜单
     */
    public void update(LeftMenu leftMenu);

    /**
     * 通过id删除菜单。
     * @param id 菜单id
     */
    public void delete(@Param("id") Long id);

    /**
     * 修改菜单的权限。
     * @param leftMenu 菜单对象
     */
    public void updateSysIdById(LeftMenu leftMenu);

    /**
     * 查询是否有重复的Code值的菜单。
     * @param code 编码
     * @return 菜单集合
     */
    public List<LeftMenu> findMenuByCodeExit(@Param("code") String code);

    /**
     * 获取有权限的菜单。
     * @param roleIds 角色
     * @return 权限集合
     */
    List<LeftMenu> findLeftMenus(int[] roleIds);
}
