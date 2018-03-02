package org.hengsir.icma.service;

import org.hengsir.icma.entity.LeftMenu;

import java.util.List;

public interface LeftMenuService {
    /**
     * 查询所有菜单。
     * @return 菜单集合
     */
    public List<LeftMenu> findAll();

    /**
     * 生成模块左侧菜单和菜单导航Html。
     * @param url 当前请求地址
     * @param menus
     * @return html字符串
     */
    public String[] createMenuHtml(String url, String userAccount, List<LeftMenu> menus);

    /**
     * 新增菜单。
     * @param leftMenu 菜单
     * @return 新增的对象
     */
    public LeftMenu create(LeftMenu leftMenu);

    /**
     * 修改菜单。
     * @param leftMenu 菜单
     * @return true： 修改成功,false： 修改失败
     */
    public boolean update(LeftMenu leftMenu);

    /**
     * 通过id删除菜单。
     * @param id 菜单的id
     * @return true： 修改成功,false： 修改失败
     */
    public boolean delete(Long id);

    /**
     * 修改菜单的权限。
     * @param leftMenu 菜单对象
     */
    public boolean updateSysIdById(LeftMenu leftMenu);


}
