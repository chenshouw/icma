package org.hengsir.icma.impl;

import org.hengsir.icma.dao.LeftMenuWriteDao;
import org.hengsir.icma.entity.LeftMenu;
import org.hengsir.icma.mapper.LeftMenuMapper;
import org.hengsir.icma.utils.Page;
import org.hengsir.icma.utils.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 菜单数据接口实现类。
 * @author yuanyaping
 * @createTime 2017年12月1日
 * @version 1.0.0
 */
@Service
public class LeftMenuDaoImpl implements LeftMenuWriteDao {

    @Autowired
    private LeftMenuMapper leftMenuMapper;

    private final Logger logger = LoggerFactory.getLogger(LeftMenuDaoImpl.class);//日志

    //存放子菜单的集合
    static List<LeftMenu> childs = new ArrayList<>();

    @Override
    public List<LeftMenu> findAll() {
        return leftMenuMapper.findAll();
    }

    @Override
    public Page<LeftMenu> findLeftMenus(LeftMenu leftMenu, Page<LeftMenu> page) {
        PageHelper.startPage(page.getPageNum(), page.getPageSize());
        leftMenuMapper.findLeftMenusBy(leftMenu);
        return PageHelper.endPage();
    }

    @Override
    public Page<LeftMenu> findLeftMenusBy(LeftMenu leftMenu, Page<LeftMenu> page) {
        PageHelper.startPage(page.getPageNum(), page.getPageSize());
        leftMenuMapper.findLeftMenusBy(leftMenu);
        return PageHelper.endPage();
    }

    @Override
    public List<LeftMenu> findAllLoseHome() {
        return leftMenuMapper.findAllLoseHome();
    }

    @Override
    public List<LeftMenu> findFatherMenu() {
        return leftMenuMapper.findFatherMenu();
    }

    @Override
    public List<LeftMenu> findSonMenus(String superCode) {
        return leftMenuMapper.findSonMenus(superCode);
    }
    
    @Override
    public LeftMenu findLeftMenuById(int id) {
        return leftMenuMapper.findLeftMenuById(id);
    }

    @Override
    public List<LeftMenu> findLeftMenusBy(LeftMenu leftMenu) {
        return leftMenuMapper.findLeftMenusBy(leftMenu);
    }

    @Override
    public List<LeftMenu> findLeftMenus(int[] roleIds) {
        return leftMenuMapper.findLeftMenus(roleIds);
    }

    @Override
    public LeftMenu findLeftMenuBySuperCode(String code) {
        return leftMenuMapper.findLeftMenuBySuperCode(code);
    }

    @Override
    public List<LeftMenu> findAllSonMenus() {
        return leftMenuMapper.findAllSonMenus();
    }

    @Override
    public List<LeftMenu> findMenuByCodeExit(String code) {
        return leftMenuMapper.findMenuByCodeExit(code);
    }

    @Override
    public LeftMenu create(LeftMenu leftMenu) {
        leftMenuMapper.create(leftMenu);
        return leftMenuMapper.findLeftMenuById(leftMenu.getMenuId());
    }

    @Override
    public boolean update(LeftMenu leftMenu) {
        try {
            leftMenuMapper.update(leftMenu);
            return true;
        } catch (Exception exception) {
            logger.error("update LeftMenu find error",exception);
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
        try {
            leftMenuMapper.delete(id);
            return true;
        } catch (Exception exception) {
            logger.error("delete LeftMenu find error",exception);
            return false;
        }
    }

    @Override
    public boolean updateSysIdById(LeftMenu leftMenu) {
        try {
            leftMenuMapper.updateSysIdById(leftMenu);
            return true;
        } catch (Exception exception) {
            logger.error("updateSysIdById  find error ",exception);
            return false;
        }
    }
}
