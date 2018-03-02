package org.hengsir.icma.service.impl;

import org.hengsir.icma.dao.RightWriteDao;
import org.hengsir.icma.entity.Right;
import org.hengsir.icma.service.RightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 权限管理写操作实现类。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
@Service
public class RightServiceImpl implements RightService {

    @Autowired
    private RightWriteDao rightWriteDao;

    @Override
    public Boolean create(Right right) {
        return rightWriteDao.create(right);
    }

    @Override
    public Boolean delete(int rightId) {
        return rightWriteDao.delete(rightId);
    }

    @Override
    public Boolean update(Right right) {
        return rightWriteDao.update(right);
    }

    @Override
    public Boolean updateRightByMenuId(Right right) {
        return rightWriteDao.updateRightByMenuId(right);
    }

    @Override
    public Boolean deleteRightByMenuId(int menuId) {
        return rightWriteDao.deleteRightByMenuId(menuId);
    }

    @Override
    public Boolean deleteRight(int rightId) {
        return rightWriteDao.deleteRight(rightId);
    }



}
