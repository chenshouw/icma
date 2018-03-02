package org.hengsir.icma.service.impl;

import org.hengsir.icma.dao.UserDao;
import org.hengsir.icma.entity.Right;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.entity.User;
import org.hengsir.icma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User findUserByAccount(String userAccount) {
        return userDao.selectUserByAccount(userAccount);
    }

    @Override
    public User findUserById(int userId) {
        return userDao.selectUserById(userId);
    }

    @Override
    public List<Role> getRolesByAccount(String userAccount) {
        return userDao.selectRolesByAccount(userAccount);
    }

    @Override
    public List<Right> getPermissionsByAccount(String userAccount) {
        return userDao.selectPermissionsByAccount(userAccount);
    }

    @Override
    public boolean updatePass(User user) {
        return false;
    }


}
