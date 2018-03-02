package org.hengsir.icma.impl;

import org.hengsir.icma.dao.RoleWriteDao;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.mapper.RoleMapper;
import org.hengsir.icma.utils.Page;
import org.hengsir.icma.utils.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 角色管理接口实现类。
 * @createTime 2017年11月23日
 */
@Service
public class RoleDaoImpl implements RoleWriteDao {

    @Autowired
    private RoleMapper roleMapper;

    /**
     * 日志输出。
     */
    private final Logger logger = LoggerFactory.getLogger(RightDaoImpl.class);

    @Override
    public List<Role> findAll() {
        return roleMapper.findAll();
    }

    @Override
    public List<Role> findByUserId(int userId) {
        return roleMapper.findByUserId(userId);
    }

    @Override
    public Page<Role> findByRole(
            Role role, Page<Role> page) {
        PageHelper.startPage(page.getPageNum(), page.getPageSize());
        roleMapper.findByRole(role);
        return PageHelper.endPage();
    }

    @Override
    public List<Role> findByRole(Role role) {
        return roleMapper.findByRole(role);
    }

    @Override
    public Role findById(int roleId) {
        return roleMapper.findById(roleId);
    }

    @Override
    public int findRoleCount(Role role) {
        return roleMapper.findRoleCount(role);
    }

    @Override
    public Role findByCode(String roleCode) {
        return roleMapper.findByCode(roleCode);
    }

    @Override
    public Role create(Role role) {
        Role ro = null;
        try {
            roleMapper.create(role);
            ro  = roleMapper.findById(role.getRoleId());
        } catch (Exception exception) {
            logger.error("create right find error!",exception);
        }
        return ro;
    }

    @Override
    public Boolean remove(int roleId) {
        try {
            roleMapper.remove(roleId);
            return  true;
        } catch (Exception ex) {
            logger.error("delete right find error!",ex);
            return  false;
        }

    }

    @Override
    public Boolean update(Role role) {
        try {
            roleMapper.update(role);
            return  true;
        } catch (Exception ex) {
            logger.error("delete right find error!",ex);
            return  false;
        }
    }

}
