package org.hengsir.icma.dao;



import org.hengsir.icma.entity.UserRelRole;

import java.util.List;

/**
 * 用户角色关联dao接口，只读
 * Created by lidan on 2017/6/14.
 */
public interface UserRelRoleDao {

    /**
     * 根据角色ID查询关联信息。
     * @param roleId 角色ID
     * @return 查询的关联关系
     */
    public List<UserRelRole> queryByRoleId(int roleId);

    /**
     * 根据用户ID查询关联信息。
     * @param userId 用户ID
     * @return 查询的关联关系
     */
    public List<UserRelRole> queryByUserId(int userId);
}
