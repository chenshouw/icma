package org.hengsir.icma.dao;


import org.hengsir.icma.entity.UserRelRole;

/**
 * 用户角色关联表写操作。
 * Created by lidan on 2017/6/14.
 */
public interface UserRelRoleWriteDao extends UserRelRoleDao{

    /**
     * 新增。
     * @param userRelRole 新增对象
     * @return 是否新增成功
     */
    public Boolean create(UserRelRole userRelRole);

    /**
     * 修改。
     * @param userRelRole 需修改的对象
     * @return 是否修改成功
     */
    public Boolean update(UserRelRole userRelRole);

    /**
     * 删除。
     * @param id 被删除对象ID
     * @return 删除结果
     */
    public Boolean delete(int id);

    /**
     * 删除。
     * @param userId 用户主键
     * @return 删除结果
     */
    void deleteByUserId(int userId);
}
