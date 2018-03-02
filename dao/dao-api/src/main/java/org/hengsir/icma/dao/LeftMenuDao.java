package org.hengsir.icma.dao;


import org.hengsir.icma.entity.LeftMenu;
import org.hengsir.icma.utils.Page;

import java.util.List;

/**
 * 菜单只读接口。
 * @author yuanyaping
 * @createTime 2017年12月1日
 * @version 1.0.0
 */
public interface LeftMenuDao {

    /**
     * 获取所有菜单。
     * @return 菜单集合
    */
    public List<LeftMenu> findAll();

    /**
     * 分页查询所有的菜单。
     * @param page 分页需要的当前页数和每页显示的数据量的条件
     * @return 分页后的菜单数据
     */
    public Page<LeftMenu> findLeftMenus(LeftMenu leftMenu, Page<LeftMenu> page);

    /**
     * 根据角色查询权限路径。
     * @param roleIds 角色ID
     * @return 权限路径
     */
    public List<LeftMenu> findLeftMenus(int[] roleIds);

    /**
     * 通过Id查找菜单是否存在。
     * @param id 菜单id
     * @return 菜单对象
     */
    public LeftMenu findLeftMenuById(int id);


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
     * 根据父菜单名称查找其对应的所有子菜单。
     * @param superCode 当前菜单的父级菜单编码
     * @return 当前菜单所有的子菜单集合
     */
    public List<LeftMenu> findSonMenus(String superCode);
    
    
    /**
     * 通过编码找到菜单对象。
     * @param code 菜单编码
     * @return 菜单对象
     */
    public LeftMenu findLeftMenuBySuperCode(String code);

    /**
     * 查询所有的子菜单。
     * @return 子菜单集合
     */
    public List<LeftMenu> findAllSonMenus();

    /**
     * 查询是否有重复的Code值的菜单。
     * @param code 编码
     * @return 菜单集合
     */
    public List<LeftMenu> findMenuByCodeExit(String code);

    /**
     * 通过菜单对象查找菜单集合。
     * @param leftMenu 菜单对象
     * @return 菜单集合
     */
    public Page<LeftMenu> findLeftMenusBy(LeftMenu leftMenu, Page<LeftMenu> page);

    /**
     * 查询所有的子菜单,出去主页菜单。
     * @return 子菜单集合
     */
    List<LeftMenu> findAllLoseHome();
}
