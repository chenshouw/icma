package org.hengsir.icma.service;


import org.hengsir.icma.entity.User;

/**
 * 用户管理service层。
 * Created by lidan on 2017/6/14.
 */
public interface TUserService {
    /**
     * 用户信息。
     * @param tUser 用户信息
     */
    public Boolean create(User tUser);

    /**
     * 删除用户。
     * @param userId 用户主键
     * @return 删除结果
     */
    public Boolean delete(int userId);

    /**
     * 修改用户。
     * @param tUser 用户信息
     */
    public Boolean update(User tUser);
}
