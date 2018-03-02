package org.hengsir.icma.service.impl;

import org.hengsir.icma.dao.UserRelRoleWriteDao;
import org.hengsir.icma.entity.UserRelRole;
import org.hengsir.icma.service.UserRelRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 用户角色关联表service实现类。
 * Created by lidan on 2017/6/14.
 */
@Service
public class UserRelRoleServiceImpl implements UserRelRoleService {
    @Autowired
    private UserRelRoleWriteDao userRelRoleWriteDao;

    @Override
    public Boolean create(UserRelRole userRelRole) {
        return userRelRoleWriteDao.create(userRelRole);
    }

    @Override
    public Boolean update(UserRelRole userRelRole) {
        return userRelRoleWriteDao.update(userRelRole);
    }

    @Override
    public Boolean delete(int id) {
        return userRelRoleWriteDao.delete(id);
    }

    @Override
    public void deleteByUserId(int userId) {
        userRelRoleWriteDao.deleteByUserId(userId);
    }
}
