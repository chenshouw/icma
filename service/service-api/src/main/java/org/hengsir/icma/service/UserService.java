package org.hengsir.icma.service;



import org.hengsir.icma.entity.Right;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.entity.User;

import java.util.List;

public interface UserService {

    /**
     * 根据帐号查询用户。
     * @param userAccount 用户账户
     */
    public User findUserByAccount(String userAccount);

    /**
     * 根据id查询用户。
     * @param userId 用户id
     */
    public User findUserById(int userId);

    /**
     * 根据帐号得出用户角色。
     * @param userAccount 用户账户
     */
    public List<Role> getRolesByAccount(String userAccount);


    /**
     * 根据帐号得出用户所有的权限。
     * @param userAccount 用户账户
     */
    public List<Right> getPermissionsByAccount(String userAccount);

    /**
     *  修改密码
     */
    boolean updatePass(User user);
}
