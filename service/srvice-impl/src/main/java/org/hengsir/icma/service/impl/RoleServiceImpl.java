package org.hengsir.icma.service.impl;

import org.hengsir.icma.dao.RoleDao;
import org.hengsir.icma.dao.RoleWriteDao;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * 角色管理写操作实现类。
 * @author yuanyaping
 * @createTime 2017年11月24日
 * @version 1.0.0
 */
@Service
public class RoleServiceImpl implements RoleService {

    public static Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);//日志

    @Autowired
    private RoleWriteDao roleWriteDao;

    @Autowired
    private RoleDao roleDao;

    @Override
    public Role create(Role role) {
        return roleWriteDao.create(role);
    }

    @Override
    public Boolean remove(int roleId) {
        return roleWriteDao.remove(roleId);
    }

    @Override
    public Boolean update(Role role) {
        return roleWriteDao.update(role);
    }

    /**
     * 根据用户查询角色。
     *
     * @param userId 用户ID
     * @return 角色信息
     */
    public Set<String> findRoleByUserId(int userId) {
        Set<String> roles = new HashSet<String>();
        List<Role> roleList = roleDao.findByUserId(userId);
        if (roleList == null || roleList.size() < 1) {
            return null;
        }
        for (Role role : roleList) {
            roles.add(role.getRoleCode());
        }
        return roles;
    }

    @Override
    public Boolean judgeRoleisAdministrator(int userId) {
        Set<String> roles = this.findRoleByUserId(userId);
        Iterator<String> it = roles.iterator();
        while (it.hasNext()) {
            String roleCode = it.next();
            if ("Administrator".equals(roleCode)) {
                return true;
            }
        }
        return false;
    }
}
