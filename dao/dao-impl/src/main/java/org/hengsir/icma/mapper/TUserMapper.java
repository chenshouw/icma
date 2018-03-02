package org.hengsir.icma.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.User;
import org.hengsir.icma.entity.UserOrg;

import java.util.List;
import java.util.Map;

/**
 * 用户管理Mapper。
 * @author lidan
 * @createTime 2017年6月13日上午19:44:23
 * @version 1.0.0
 */
@Mapper
public interface TUserMapper {

    /**
     * 查询所有的用户。
     * @return 用户集合
     */
    public List<User> findAllUser();

    /**
     * 根据用户信息用户列表。
     * @param user 用户信息过滤条件
     * @return 用户信息列表
     */
    public List<UserOrg> findByUser(User user);


    /**
     * @param userId 用户主键。
     * @return 用户信息列表
     */
    public User findById(@Param("userId") int userId);

    /**
     * 通过手机号查询用户。
     * @param mobile 手机号
     * @return 用户对象
     */
    User findByMobile(@Param("mobile") String mobile);

    /**
     * 增加用户。
     * @param user 用户信息
     */
    public void create(User user);

    /**
     * 删除用户。
     * @param userId 用户主键
     */
    public void delete(@Param("userId") int userId);

    /**
     * 修改用户。
     * @param user 用户信息
     */
    public void update(User user);

    /**
     * 根据账户查询用户信息。
     * @param userAccount 账号名
     * @return 用户
     */
    User findByUserAccount(@Param("userAccount") String userAccount);

    /**
     * 通过查询用户。
     * @param map 参数对象
     * @return 用户对象
     */
    List<UserOrg> findByUserMap(Map<String, Object> map);
}
