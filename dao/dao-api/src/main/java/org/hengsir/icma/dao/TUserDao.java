package org.hengsir.icma.dao;


import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.User;
import org.hengsir.icma.entity.UserOrg;
import org.hengsir.icma.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * 用户管理只读接口，针对查询操作管理 。
 * Created by lidan on 2017/6/13.
 */
public interface TUserDao {

    /**
     * 查询所有的用户。
     * @return 权限集合
     */
    public List<User> findAllUser();


    /**
     * 分页查询所有的用户。
     * @param user 用户信息
     * @param page 分页
     * @return 用户信息列表
     */
    public Page<UserOrg> findByUser(User user, Page<User> page);

    /**
     * 根据用户信息获取列表。
     * @param tUser 用户信息过滤条件
     * @return 用户信息列表
     */
    public List<UserOrg> findByUser(User tUser);


    /**
     * @param userId 用户主键。
     * @return 用户信息列表
     */
    public User findById(int userId);

    /**
     * 根据账户查询用户信息。
     * @param userAccount 账号名
     * @return 用户
     */
    User findByUserAccount(String userAccount);

    /**
     * 通过手机号查询用户。
     * @param mobile 手机号
     * @return 用户对象
     */
    User findByMobile(@Param("mobile") String mobile);

    /**
     * 分页查询所有的用户。
     * @param map 用户信息
     * @param page 分页
     * @return 用户信息列表
     */
    Page<UserOrg> findByUserMap(Map<String, Object> map, Page<User> page);
}
