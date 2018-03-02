package org.hengsir.icma.impl;

import org.hengsir.icma.dao.TUserWriteDao;
import org.hengsir.icma.entity.User;
import org.hengsir.icma.entity.UserOrg;
import org.hengsir.icma.mapper.TUserMapper;
import org.hengsir.icma.utils.Page;
import org.hengsir.icma.utils.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 用户dao实现类。
 * Created by lidan on 2017/6/13.
 */
@Service
public class TUserDaoImpl implements TUserWriteDao {
    @Autowired
    private TUserMapper tuserMapper;
    /**
     * 日志输出。
     */
    private final Logger logger = LoggerFactory.getLogger(TUserDaoImpl.class);


    @Override
    public Boolean create(User user) {
        try {
            tuserMapper.create(user);
            return true;
        } catch (Exception ex) {
            logger.error("create User find error!", ex);
            return false;
        }
    }

    @Override

    public Boolean delete(int userId) {
        try {
            tuserMapper.delete(userId);
            return true;
        } catch (Exception ex) {
            logger.error("delete user find error!", ex);
            return false;
        }
    }

    @Override
    public Boolean update(User user) {
        try {
            tuserMapper.update(user);
            return true;
        } catch (Exception ex) {
            logger.error("update User find error!", ex);
            return false;
        }
    }

    @Override
    public List<User> findAllUser() {
        return tuserMapper.findAllUser();
    }

    @Override
    public Page<UserOrg> findByUser(
            User user, Page<User> page) {
        PageHelper.startPage(page.getPageNum(), page.getPageSize());
        tuserMapper.findByUser(user);
        return PageHelper.endPage();
    }

    @Override
    public List<UserOrg> findByUser(User user) {
        return tuserMapper.findByUser(user);
    }

    @Override
    public User findById(int userId) {
        return tuserMapper.findById(userId);
    }

    @Override
    public User findByUserAccount(String userAccount) {
        return tuserMapper.findByUserAccount(userAccount);
    }

    @Override
    public User findByMobile(String mobile) {
        return tuserMapper.findByMobile(mobile);
    }

    @Override
    public Page<UserOrg> findByUserMap(Map<String, Object> map, Page<User> page) {
        PageHelper.startPage(page.getPageNum(), page.getPageSize());
        tuserMapper.findByUserMap(map);
        return PageHelper.endPage();
    }
}
