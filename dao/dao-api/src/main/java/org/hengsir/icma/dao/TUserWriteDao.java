package org.hengsir.icma.dao;


import org.hengsir.icma.entity.User;

/**
 * 用户管理，针对写操作管理。
 * Created by lidan on 2017/6/13.
 */
public interface TUserWriteDao extends TUserDao {

    /**
     * 用户信息。
     * @param TUser 用户信息
     */
    public Boolean create(User TUser);

    /**
     * 删除用户。
     * @param userId 用户主键
     * @return 删除结果
     */
    public Boolean delete(int userId);

    /**
     * 修改用户。
     * @param TUser 用户信息
     */
    public Boolean update(User TUser);
}
