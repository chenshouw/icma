package org.hengsir.icma.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.UserRelRole;

import java.util.List;

/**
 * 用户角色关联mapper。
 */
@Mapper
public interface UserRelRoleMapper {
    /**
     * 新增。
     * @param userRelRole 新增对象
     */
    public void create(UserRelRole userRelRole);

    /**
     * 修改。
     * @param userRelRole 需修改的对象
     */
    public void update(UserRelRole userRelRole);

    /**
     * 删除。
     * @param id 被删除对象ID
     */
    public void delete(@Param("id") int id);

    /**
     * 根据角色ID查询关联信息。
     * @param roleId 角色ID
     * @return 查询的关联关系
     */
    public List<UserRelRole> queryByRoleId(@Param("roleId") int roleId);

    /**
     * 根据用户ID查询关联信息。
     * @param userId 用户ID
     * @return 查询的关联关系
     */
    public List<UserRelRole> queryByUserId(@Param("userId") int userId);

    /**
     * 删除。
     * @param userId 用户主键
     * @return 删除结果
     */
    void deleteByUserId(@Param("userId") int userId);
}
