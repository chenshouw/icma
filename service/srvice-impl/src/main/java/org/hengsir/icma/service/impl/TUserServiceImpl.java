package org.hengsir.icma.service.impl;

import org.hengsir.icma.dao.TUserWriteDao;
import org.hengsir.icma.entity.User;
import org.hengsir.icma.service.TUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 用户管理service实现层。
 * Created by lidan on 2017/6/14.
 */
@Service
public class TUserServiceImpl implements TUserService {
    @Autowired
    private TUserWriteDao userWriteDao;

    @Override
    public Boolean create(User user) {
        return userWriteDao.create(user);
    }

    @Override
    public Boolean delete(int userId) {
        return userWriteDao.delete(userId);
    }

    @Override
    public Boolean update(User user) {
        return userWriteDao.update(user);
    }
}
