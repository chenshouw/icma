package org.hengsir.icma.manage.scan;


import org.hengsir.icma.dao.LeftMenuDao;
import org.hengsir.icma.dao.RightDao;
import org.hengsir.icma.dao.RoleDao;
import org.hengsir.icma.dao.UserDao;
import org.hengsir.icma.entity.LeftMenu;
import org.hengsir.icma.entity.Right;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 *
 */
@Component
public class ShiroRealService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private LeftMenuDao leftMenuDao;

    @Autowired
    private RightDao rightDao;

    /**
     * 通过用户账户查询用户信息。
     *
     * @param userAccount 用户账号
     * @return 用户信息
     */
    public User findByUserAccount(String userAccount) {
        return userDao.selectUserByAccount(userAccount);
    }

    /**
     * 根据用户查询角色。
     *
     * @param userId 用户ID
     * @return 角色信息
     */
    public Set<String> findRoleByUserId(int userId) {
        Set<String> roles = new HashSet<>();
        List<Role> roleList = roleDao.findByUserId(userId);
        if (roleList == null || roleList.size() < 1) {
            return null;
        }
        for (Role role : roleList) {
            roles.add(role.getRoleCode());
        }
        return roles;
    }

    /**
     * 查询菜单权限信息。
     *
     * @param userId 用户主键
     * @return 权限信息
     */
    public Set<List<LeftMenu>> findLeftMenusByUserId(int userId) {
        Set<List<LeftMenu>> rights = new HashSet<List<LeftMenu>>();
        //根据用户查询到角色
        List<Role> roleList = roleDao.findByUserId(userId);
        if (roleList == null || roleList.size() == 0) {
            return null;
        }
        int[] roleIds = new int[roleList.size()];
        for (int count = 0; count < roleList.size(); count++) {
            roleIds[count] = roleList.get(count).getRoleId();
        }
        List<LeftMenu> rightList = leftMenuDao.findLeftMenus(roleIds);
        List<LeftMenu> leftMenus = new ArrayList<>();
        for (LeftMenu leftMenu : rightList) {
            leftMenus.add(leftMenu);
        }
        rights.add(leftMenus);
        return rights;
    }

    /**
     * 查询菜单权限信息(admin)。
     *
     * @param
     * @return 权限信息
     */
    public Set<List<LeftMenu>> findLeftMenusByAdmin() {
        Set<List<LeftMenu>> rights = new HashSet<List<LeftMenu>>();

        List<LeftMenu> rightList = leftMenuDao.findAll();
        List<LeftMenu> leftMenus = new ArrayList<>();
        for (LeftMenu leftMenu : rightList) {
            leftMenus.add(leftMenu);
        }
        rights.add(leftMenus);
        return rights;
    }

    /**
     * 查询菜单链接地址。
     *
     * @param userId 用户主键
     * @return 权限信息
     */
    public Set<String> findRightsByUserId(int userId) {
        Set<String> rights = new HashSet<String>();
        rights.add("admin/apiMapping/list");
        //根据用户查询到角色
        List<Role> roleList = roleDao.findByUserId(userId);
        List<Right> rightList = rightDao.findRightByRoleList(roleList);

        for (Right right : rightList) {
            rights.add(right.getRightCode());
        }

        return rights;
    }

    /**
     * 查询菜单链接地址。
     *
     * @return 权限信息
     */
    public Set<String> findRightsByAdmin() {
        Set<String> rights = new HashSet<String>();
        rights.add("admin/apiMapping/list");
        //根据用户查询到角色
        List<Right> rightList = rightDao.findAllRight();

        for (Right right : rightList) {
            rights.add(right.getRightCode());
        }

        return rights;
    }

    /**
     * 通过用户账户或者手机号查询用户信息。
     *
     * @param userAccount 用户账号/手机号
     * @return 用户信息
     */
    public User findByUserAccountOrMobile(String userAccount) {
        return userDao.selectUserByAccount(userAccount);
    }
}
