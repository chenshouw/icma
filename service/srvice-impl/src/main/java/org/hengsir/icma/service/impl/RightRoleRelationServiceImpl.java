package org.hengsir.icma.service.impl;

import org.hengsir.icma.dao.RightRoleRelationWriteDao;
import org.hengsir.icma.entity.RightRoleRelation;
import org.hengsir.icma.service.RightRoleRelationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 用户对应角色实现类。
 * @author yuanyaping
 * @createTime 2017年11月24日
 * @version 1.0.0
 */
@Service
public class RightRoleRelationServiceImpl implements RightRoleRelationService {

    public static Logger logger = LoggerFactory.getLogger(RightRoleRelationServiceImpl.class);//日志

    @Autowired
    private RightRoleRelationWriteDao rightRoleRelationWriteDao;

    @Override
    public Boolean create(RightRoleRelation rightRoleRelation) {
        return rightRoleRelationWriteDao.create(rightRoleRelation);
    }

    @Override
    public Boolean remove(int roleId) {
        return rightRoleRelationWriteDao.remove(roleId);
    }

    @Override
    public Boolean deleteByRightId(int rightId) {
        return rightRoleRelationWriteDao.deleteByRightId(rightId);
    }
}
