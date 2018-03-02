package org.hengsir.icma.impl;

import org.hengsir.icma.dao.UserRelRoleWriteDao;
import org.hengsir.icma.entity.UserRelRole;
import org.hengsir.icma.mapper.UserRelRoleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 用户角色关联dao实现。
 * Created by lidan on 2017/6/14.
 */
@Service
public class UserRelRoleDaoImpl implements UserRelRoleWriteDao {
    @Autowired
    private UserRelRoleMapper userRelRoleMapper;
    /**
     * 日志输出。
     */
    private final Logger logger = LoggerFactory.getLogger(UserRelRoleDaoImpl.class);

    @Override
    public Boolean create(UserRelRole userRelRole) {
        try {
            userRelRoleMapper.create(userRelRole);
            return true;
        } catch (Exception ex) {
            logger.error("create userRelRole find error!",ex);
            return false;
        }
    }

    @Override
    public Boolean update(UserRelRole userRelRole) {
        try {
            userRelRoleMapper.update(userRelRole);
            return true;
        } catch (Exception ex) {
            logger.error("update userRelRole find error!",ex);
            return false;
        }
    }

    @Override
    public Boolean delete(int id) {
        try {
            userRelRoleMapper.delete(id);
            return true;
        } catch (Exception ex) {
            logger.error("delete userRelRole find error!",ex);
            return false;
        }
    }

    @Override
    public void deleteByUserId(int userId) {
        userRelRoleMapper.deleteByUserId(userId);
    }

    @Override
    public List<UserRelRole> queryByRoleId(int roleId) {
        return userRelRoleMapper.queryByRoleId(roleId);
    }

    @Override
    public List<UserRelRole> queryByUserId(int userId) {
        return userRelRoleMapper.queryByUserId(userId);
    }
}
