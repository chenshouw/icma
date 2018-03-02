package org.hengsir.icma.service.impl;


import org.hengsir.icma.dao.LeftMenuDao;
import org.hengsir.icma.dao.LeftMenuWriteDao;
import org.hengsir.icma.entity.LeftMenu;
import org.hengsir.icma.service.LeftMenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


/**
 * 菜单接口实现。
 *
 * @author lijiguang
 * @version 1.0.0
 *          2017年5月4日下午2:12:10
 */
@Service
public class LeftMenuServiceImpl implements LeftMenuService {
    /**
     * 菜单创建时间与系统时间差值判定是否新功能。
     */
    private static final int dayOfNew = 5;

    public static Logger logger = LoggerFactory.getLogger(LeftMenuServiceImpl.class);//日志

    @Autowired
    private LeftMenuDao leftMenuDao;

    @Autowired
    private LeftMenuWriteDao leftMenuWriteDao;

   @Autowired
    private RedisTemplate redisTemplate;

    //根模块和根菜单
    private List<LeftMenu> modelList = new ArrayList<>();
    //子模块和非根菜单集合
    private List<LeftMenu> menuList  = new ArrayList<LeftMenu>();

    @Override
    public List<LeftMenu> findAll() {
        return leftMenuDao.findAll();
    }

    @Override
    public String[] createMenuHtml(String uri, String userAccount, List<LeftMenu> menus) {
        String[] menuHtmlArr = new String[2];
        if(menus == null){
            menus = leftMenuDao.findAll();
        }
        redisTemplate.opsForValue().set(userAccount, menus);
        fillModelList(menus);//填充菜单列表
        splitModelMenu();//分割菜单和模块
        StringBuffer locationMenu = new StringBuffer();
        String menuTextHtml = toHtmlText(uri,locationMenu);
        menuHtmlArr[0] = menuTextHtml;
        menuHtmlArr[1] = locationMenu.toString();
        return menuHtmlArr;
    }


    /**
     * 左侧菜单。
     * @param menus 所有菜单
     */
    private void fillModelList(List<LeftMenu> menus) {
        modelList = new ArrayList<LeftMenu>();
        if (menus != null && menus.size() > 0) {
            for (int i = 0; i < menus.size(); i++) {
                LeftMenu menu = menus.get(i);
                modelList.add(menu);
            }
        }
    }

    /**
     * modelList：模块和没有模块的菜单。
     * menuList：有模块的菜单
     */
    private void splitModelMenu() {
        menuList = new ArrayList<LeftMenu>();
        for (int i = 0;i < modelList.size();i++) {
            LeftMenu menu = modelList.get(i);
            if (null == menu.getMenuHref() || "".equals(menu.getMenuHref())) {
                String code = menu.getMenuCode();
                for (int j = 0;j < modelList.size();j++) {
                    LeftMenu menuM = modelList.get(j);
                    String superCode = menuM.getMenuSuperCode();
                    if (code.equals(superCode)) {
                        menuList.add(menuM);
                    }
                }
            }
        }
        /**
         * 去掉有模块的菜单使其剩余模块和没有模块的菜单
         */
        for (int i = 0;i < menuList.size();i++) {
            LeftMenu menu = menuList.get(i);
            modelList.remove(menu);
        }
    }

    /**
     * 菜单list转成String的HTML。
     *
     * @param uri          当前请求地址
     * @param locationMenu 请求地址
     * @return html
     */
    private String toHtmlText(String uri, StringBuffer locationMenu) {
        StringBuffer buffer = new StringBuffer();
        this.doRender(buffer, locationMenu, uri);
        //添加收缩效果
        buffer.insert(0, "<li><div class='sidebar-toggler hidden-phone'></div></li>");
        return buffer.toString();
    }


    /**
     * 渲染单个菜单，HTML 递归方法。
     *
     * @param buffer       左侧菜单html
     * @param locationMenu 菜单导航html
     * @param menu         单个菜单
     */
    private boolean toHtml(StringBuffer buffer, StringBuffer locationMenu, String url,
                           LeftMenu menu) {
        StringBuffer menuBf = new StringBuffer();
        boolean isSelect = false;//子菜单是否为选中
        //如果是模块则先生成子菜单
        boolean isNowModel = false;//当前模块是否为请求地址模块
        if (null == menu.getMenuHref() || "".equals(menu.getMenuHref())) {
            //menuBf.append("<ul class='sub-menu' style='display:"+display+";'>");
            String code = menu.getMenuCode();
            for (LeftMenu simpleMenu : menuList) {
                String superCode = simpleMenu.getMenuSuperCode();
                if (code.equals(superCode)) {
                    //递归生成子菜单
                    if (null == simpleMenu.getMenuHref() || "".equals(simpleMenu.getMenuHref())) {
                        if (isSelect) { //如果模块为当前展开模块则不再需要继续判断是否需要展开
                            toHtml(menuBf, locationMenu, url, simpleMenu);
                        } else {
                            isSelect = toHtml(menuBf, locationMenu, url, simpleMenu);
                        }
                        continue;
                    }
                    String simUri = simpleMenu.getMenuHref();
                    //链接是否选中状态
                    if (url.startsWith(simUri.substring(0, simUri.lastIndexOf("/") + 1))) {
                        isNowModel = true;
                        locationMenu.append("<li>");
                        locationMenu.append("<i class='");
                        locationMenu.append(simpleMenu.getMenuIcon());
                        locationMenu.append("'></i>");
                        locationMenu.append("<a href='");
                        locationMenu.append(simpleMenu.getMenuHref());
                        locationMenu.append("'>");
                        locationMenu.append(simpleMenu.getMenuName());
                        locationMenu.append("</a>");
                        locationMenu.append("</li>");
                        menuBf.append("<li class='active'>");
                    } else {
                        menuBf.append("<li>");
                    }
                    if (simpleMenu.getMenuHref() != null) {
//                        menuBf.append("<shiro:hasPermission name=\"");
//                        menuBf.append(simpleMenu.getHref());
//                        menuBf.append("\">");
                        menuBf.append("<a href='");
                        menuBf.append(simpleMenu.getMenuHref()).append("'");
                        if (simpleMenu.getMenuId() != null) {
                            menuBf.append(" id='").append(simpleMenu.getMenuId()).append("'");
                        }
                        menuBf.append(">");
                        //是否新菜单标志
                        if (simpleMenu.getCreateTime() != null &&
                                System.currentTimeMillis() - simpleMenu.getCreateTime().getTime() <
                                        dayOfNew * 24 * 60 * 60 * 1000) {
                            menuBf.append("<span class='");
                            menuBf.append("title badge badge-roundless badge-success");
                            menuBf.append("'>");
                            menuBf.append("新");
                            menuBf.append("</span>");
                        }
                        //链接前图标
                        if (simpleMenu.getMenuIcon() != null) {
                            menuBf.append("<i class='").append(simpleMenu.getMenuIcon()).append("'>");
                            menuBf.append("</i>");
                        }
                        //链接名称
                        if (simpleMenu.getMenuName() != null) {
                            menuBf.append(simpleMenu.getMenuName());
                        }
//                        menuBf.append("</a></shiro:hasPermission>");
                        menuBf.append("</a>");
                    }
                    menuBf.append("</li>");
                }
            }
        }
        //是否激活
        if (url.equals(menu.getMenuHref()) || isNowModel || isSelect) {
            buffer.append("<li class='active open'>");
        } else {
            buffer.append("<li>");
        }
        //链接
        buffer.append("<a");
        //链接地址
        if (null != menu.getMenuHref() && !"".equals(menu.getMenuHref())) {
            buffer.append(" href='").append(menu.getMenuHref()).append("'");
        } else {
            buffer.append(" href='javascript:void(0);'");
        }
        if (menu.getMenuId() != null) {
            buffer.append(" id='").append(menu.getMenuId()).append("'");
        }
        buffer.append(">");

        //图标
        if (menu.getMenuIcon() != null) {
            buffer.append("<i class='").append(menu.getMenuIcon()).append("'>");
            buffer.append("</i>");
        }
        //显示标题
        if (menu.getMenuName() != null) {
            buffer.append("<span class='title'>").append(menu.getMenuName()).append("</span>");
        }
        //链接是否被选中(菜单右侧的大箭头)
        if ((menu.getMenuHref() != null && url.startsWith(menu.getMenuHref())) || isNowModel || isSelect) {
            buffer.append("<span class='selected'></span>");
            if (menu.getMenuHref() != null && url.startsWith(menu.getMenuHref())) {
                locationMenu.append("<li>");
                locationMenu.append("<i class='").append(menu.getMenuIcon()).append("'></i>");
                locationMenu.append("<a href='").append(menu.getMenuHref()).append("'>");
                locationMenu.append(menu.getMenuName());
                locationMenu.append("</a>");
                locationMenu.append("</li>");
            }
        }

        //当前模块是否展开(子模块默认样式均展开)
        if (null == menu.getMenuHref() || "".equals(menu.getMenuHref())) {
            if (isNowModel || isSelect) {
                locationMenu.insert(0, "<li><i class='" + menu.getMenuIcon() +
                        "'></i><a href='javascript:void(0);'>" + menu.getMenuName() +
                        "</a><i class='icon-angle-right'></i></li>");
                buffer.append("<span class='arrow open'></span>");
            } else {
                buffer.append("<span class='arrow'></span>");
            }
        }
        //是否新菜单标志
        if (menu.getCreateTime() != null &&
                System.currentTimeMillis() - menu.getCreateTime().getTime() <
                        dayOfNew * 24 * 60 * 60 * 1000) {
            buffer.append("<span class='title badge badge-roundless badge-success'>新</span>");
        }
        buffer.append("</a>");
        //}
        //判断是否是模块
        if (null == menu.getMenuHref() || "".equals(menu.getMenuHref())) {
            //判断当前模块是否展开
            if (isNowModel || isSelect) {
                buffer.append("<ul class='sub-menu'>");
            } else {
                buffer.append("<ul class='sub-menu' style='display:none;'>");
            }
            buffer.append(menuBf.toString());
            buffer.append("</ul>");
        }
        buffer.append("</li>");
        return isNowModel || isSelect;
    }

    private void doRender(StringBuffer buffer,StringBuffer locationMenu,String uri) {
        for (int i = 0;i < modelList.size();i++) {
            LeftMenu menu = modelList.get(i);
            //是链接 但其模块不存在的菜单不显示
            if ((menu.getMenuHref() == null || "".equals(menu.getMenuHref())) ||
                    (menu.getMenuSuperCode() == null || "".equals(menu.getMenuSuperCode()))) {
                toHtml(buffer,locationMenu,uri, menu);
            }
        }
    }

    @Override
    public LeftMenu create(LeftMenu leftMenu) {
        return leftMenuWriteDao.create(leftMenu);
    }

    @Override
    public boolean update(LeftMenu leftMenu) {
        try {
            leftMenuWriteDao.update(leftMenu);
            return true;
        } catch (Exception exception) {
            logger.error("update LeftMenu find error!",exception);
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
        try {
            leftMenuWriteDao.delete(id);
            return true;
        } catch (Exception exception) {
            logger.error("delete LeftMenu find error!",exception);
            return false;
        }
    }

    @Override
    public boolean updateSysIdById(LeftMenu leftMenu) {
        try {
            leftMenuWriteDao.updateSysIdById(leftMenu);
            return true;
        } catch (Exception exception) {
            logger.error("updateSysIdById  find error!",exception);
            return false;
        }
    }

}
