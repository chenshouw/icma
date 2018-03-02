package org.hengsir.icma.service;

import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.RightRoleRelation;

/**
 * * 角色对应权限写操作的业务处理类。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
public interface RightRoleRelationService {
    /**
     * 增加角色权限。
     * @param rightRoleRelation 角色权限
     */
    public Boolean create(RightRoleRelation rightRoleRelation);

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
    Boolean deleteByRightId(@Param("rightId") int rightId);
}
