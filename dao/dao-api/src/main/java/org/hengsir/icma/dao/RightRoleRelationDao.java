package org.hengsir.icma.dao;


import org.hengsir.icma.entity.RightRoleRelation;

import java.util.List;

/**
 * 角色对应权限只读接口。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
public interface RightRoleRelationDao {

    /**
     * 查询所有对应角色对应的权限。
     * @return 权限集合
     */
    public List<RightRoleRelation> findByRightRoleRelation(int roleId);

}
