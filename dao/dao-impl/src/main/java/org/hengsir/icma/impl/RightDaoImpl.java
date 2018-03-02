package org.hengsir.icma.impl;

import org.hengsir.icma.dao.RightWriteDao;
import org.hengsir.icma.entity.Right;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.mapper.RightMapper;
import org.hengsir.icma.utils.Page;
import org.hengsir.icma.utils.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * 权限管理实现类。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
@Service
public class RightDaoImpl implements RightWriteDao {

    @Autowired
    private RightMapper rightMapper;

    /**
     * 日志输出。
     */
    private final Logger logger = LoggerFactory.getLogger(RightDaoImpl.class);


    @Override
    public Boolean create(Right right) {
        try {
            rightMapper.create(right);
            return true;
        } catch (Exception ex) {
            logger.error("create right find error!",ex);
            return false;
        }
    }

    @Override
    public Boolean delete(int rightId) {
        try {
            rightMapper.delete(rightId);
            return true;
        } catch (Exception ex) {
            logger.error("delete right find error!",ex);
            return  false;
        }
    }

    @Override
    public Boolean update(Right right) {
        try {
            rightMapper.update(right);
            return true;
        } catch (Exception ex) {
            logger.error("update right find error!",ex);
            return  false;
        }
    }

    @Override
    public Boolean updateRightByMenuId(Right right) {
        try {
            rightMapper.updateRightByMenuId(right);
            return true;
        } catch (Exception ex) {
            logger.error("update right find error!",ex);
            return  false;
        }
    }

    @Override
    public Boolean deleteRightByMenuId(int menuId) {
        try {
            rightMapper.deleteRightByMenuId(menuId);
            return true;
        } catch (Exception ex) {
            logger.error("delete right find error!",ex);
            return  false;
        }
    }


    @Override
    public Boolean deleteRight(int rightId) {
        try {
            rightMapper.deleteRight(rightId);
            return true;
        } catch (Exception ex) {
            logger.error("delete right find error!",ex);
            return  false;
        }
    }

    @Override
    public Boolean updateSysIdByMenuId(Right right) {
        try {
            rightMapper.updateSysIdByMenuId(right);
            return true;
        } catch (Exception ex) {
            logger.error("update SysId find error!",ex);
            return  false;
        }
    }


    @Override
    public List<Right> findRightByRoleList(List<Role> roleList) {
        return rightMapper.findRightByRoleList(roleList);
    }

    @Override
    public List<Right> findAllRight() {
        return rightMapper.findAllRight();
    }

    @Override
    public Page<Right> findByRight(Right right, Page<Right> page) {
        PageHelper.startPage(page.getPageNum(), page.getPageSize());
        rightMapper.findByRight(right);
        return PageHelper.endPage();
    }


    @Override
    public Right findRightByMenuId(int menuId) {
        return rightMapper.findRightByMenuId(menuId);
    }

    @Override
    public List<Right> findByParentRightId(int rightId) {
        return rightMapper.findByParentRightId(rightId);
    }

    @Override
    public Right findByCode(String rightCode) {
        return rightMapper.findByCode(rightCode);
    }

    @Override
    public List<Right> findByRight(Right right) {
        return rightMapper.findByRight(right);
    }

    @Override
    public List<Right> findRightByRoleId(int roleId) {
        return rightMapper.findRightByRoleId(roleId);
    }

    @Override
    public Right findById(int rightId) {
        return rightMapper.findById(rightId);
    }


}
