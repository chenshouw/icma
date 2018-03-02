package org.hengsir.icma.impl;

import org.hengsir.icma.dao.RightRoleRelationWriteDao;
import org.hengsir.icma.entity.RightRoleRelation;
import org.hengsir.icma.mapper.RightRoleRelationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *  角色对应权限实现类。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
@Service
public class RightRoleRelationDaoImpl implements RightRoleRelationWriteDao {
    @Autowired
    private RightRoleRelationMapper rightRoleRelationMapper;
    /**
     * 日志输出。
     */
    private final Logger logger = LoggerFactory.getLogger(RightRoleRelationDaoImpl.class);

    @Override
    public List<RightRoleRelation> findByRightRoleRelation(
            int roleId) {
        return rightRoleRelationMapper.findByRightRoleRelation(roleId);
    }

    @Override
    public Boolean create(RightRoleRelation rightRoleRelation) {
        try {
            rightRoleRelationMapper.create(rightRoleRelation);
            return true;
        } catch (Exception exception) {
            logger.error("",exception);
            return false;
        }
    }

    @Override
    public Boolean remove(int roleId) {
        try {
            rightRoleRelationMapper.remove(roleId);
            return true;
        } catch (Exception exception) {
            logger.error("",exception);
            return false;
        }
    }

    @Override
    public Boolean deleteByRightId(int rightId) {
        try {
            rightRoleRelationMapper.deleteByRightId(rightId);
            return true;
        } catch (Exception exception) {
            logger.error("通过权限id删除权限关联表数据失败",exception);
            return false;
        }
    }
}
