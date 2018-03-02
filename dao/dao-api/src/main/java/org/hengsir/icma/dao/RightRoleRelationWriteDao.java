package org.hengsir.icma.dao;


import org.hengsir.icma.entity.RightRoleRelation;

/**
 *角色对应权限读写接口。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
public interface RightRoleRelationWriteDao extends RightRoleRelationDao {

    /**
     * 增加角色权限。
     * @param rightRoleRelation 角色权限
     */
    Boolean create(RightRoleRelation rightRoleRelation);

    /**
     * 删除角色权限。
     * @param roleId 角色Id
     */
    Boolean remove(int roleId);

    /**
     * 删除权限。
     *
     * @param rightId 权限id
     */
    Boolean deleteByRightId(int rightId);

}
