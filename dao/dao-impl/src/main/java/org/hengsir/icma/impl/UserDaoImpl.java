package org.hengsir.icma.impl;

import org.hengsir.icma.dao.UserWriteDao;
import org.hengsir.icma.entity.Right;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.entity.User;
import org.hengsir.icma.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDaoImpl implements UserWriteDao {

    @Autowired
    private UserMapper userMapper;


    @Override
    public User selectUserByAccount(String userAccount) {
        User user = userMapper.findUserByAccount(userAccount);
        if (user != null && 1 == (user.getUserStatus())) {
            return user;
        }
        return null;
    }

    @Override
    public User selectUserById(int userId) {
        User user = userMapper.findUserById(userId);
        if (user != null && 1 == (user.getUserStatus())) {
            return user;
        }
        return null;
    }

    @Override
    public List<Role> selectRolesByAccount(String userAccount) {
        return userMapper.getRolesByAccount(userAccount);
    }

    @Override
    public List<Right> selectPermissionsByAccount(String userAccount) {
        return userMapper.getPermissionsByAccount(userAccount);
    }


}
