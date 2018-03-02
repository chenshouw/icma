package org.hengsir.icma.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.RightRoleRelation;

import java.util.List;

/**
 * 角色对应权限Mapper。
 * @author yuanyaping
 * @createTime 2017年11月23日
 * @version 1.0.0
 */
@Mapper
public interface RightRoleRelationMapper {

    /**
     * 查询所有对应角色对应的权限。
     *
     * @return 权限集合
     */
    public List<RightRoleRelation> findByRightRoleRelation(@Param("roleId") int roleId);

    /**
     * 增加角色权限。
     *
     * @param rightRoleRelation 角色权限
     */
    public void create(RightRoleRelation rightRoleRelation);

    /**
     * 删除角色权限。
     *
     * @param roleId 角色Id
     */
    void remove(@Param("roleId") int roleId);

    /**
     * 删除权限。
     *
     * @param rightId 权限id
     */
    void deleteByRightId(@Param("rightId") int rightId);
}
