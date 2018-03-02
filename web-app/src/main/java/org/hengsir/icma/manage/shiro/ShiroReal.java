package org.hengsir.icma.manage.shiro;

import com.alibaba.fastjson.JSONObject;
import jodd.util.StringUtil;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.hengsir.icma.dao.RoleDao;
import org.hengsir.icma.entity.LeftMenu;
import org.hengsir.icma.entity.User;
import org.hengsir.icma.manage.scan.ShiroRealService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * shiro 认证。
 *
 * @author huangzebin
 */
@Service
public class ShiroReal extends AuthorizingRealm {

    private static final Logger LOGGER = LoggerFactory.getLogger(ShiroReal.class);

    @Autowired
    private ShiroRealService shiroRealService;

    /*@Autowired
    private SysAppDao sysAppDao;*/

    @Autowired
    private RoleDao roleDao;

    public ShiroRealService getShiroRealService() {
        return shiroRealService;
    }

    public void setShiroRealService(ShiroRealService shiroRealService) {
        this.shiroRealService = shiroRealService;
    }

    public ShiroReal(CacheManager cacheManager, CredentialsMatcher matcher) {
        super(cacheManager, matcher);
    }

    /**
     * Shiro登录认证。
     * (原理：用户提交 用户名和密码，shiro 封装令牌，realm 通过用户名将密码查询返回
     * shiro 自动去比较查询出密码和用户输入密码是否一致
     * 进行登陆控制）
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken authcToken) throws AuthenticationException {
        LOGGER.info("Shiro开始登录认证");
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String userAccount = token.getUsername();
        //登陆失败
        if (StringUtil.isBlank(userAccount)) {
            return null;
        }
        ShiroUser shiroUser = new ShiroUser();
        User user = shiroRealService.findByUserAccountOrMobile(userAccount);
        if (null != user) {
            shiroUser.setUserId(user.getUserId());
            shiroUser.setUserName(user.getUserName());
            shiroUser.setUserPassword(user.getUserPassword());
            shiroUser.setUserAccount(userAccount);

        } else {
            throw new UnknownAccountException("账号不存在");
        }
        Set<String> roles = shiroRealService.findRoleByUserId(user.getUserId());
        if (roles == null) {
            throw new AuthenticationException("该用户未分配角色或者角色已失效，请先分配角色");
        }
        shiroUser.setRoles(roles);

        Set<List<LeftMenu>> leftMenus = shiroRealService.findLeftMenusByUserId(
                user.getUserId());
        if (leftMenus == null) {
            throw new AuthenticationException("该用户未分配角色权限，请先分配角色权限");
        }
        Set<String> rights = shiroRealService.findRightsByUserId(user.getUserId());
        shiroUser.setRights(rights);
        shiroUser.setLeftMenus(leftMenus);

        LOGGER.info("shiroUser=" + JSONObject.toJSONString(shiroUser));
        // 认证缓存信息,默认md5加盐处理为123456
        return new SimpleAuthenticationInfo(shiroUser,
                user.getUserPassword().toCharArray(),
                ShiroByteSource.of("12345"), getName());
    }

    /**
     * Shiro权限认证。
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(
            PrincipalCollection principals) {
        ShiroUser shiroUser = (ShiroUser) principals.getPrimaryPrincipal();
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.setRoles(shiroUser.getRoles());
        info.addStringPermissions(shiroUser.getRights());
        return info;
    }

    @Override
    public void onLogout(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
        ShiroUser shiroUser = (ShiroUser) principals.getPrimaryPrincipal();
        removeUserCache(shiroUser);
    }

    /**
     * 清除用户缓存。
     *
     * @param shiroUser 自定义用户信息类，用来保存更多的登陆信息
     */
    private void removeUserCache(ShiroUser shiroUser) {
        removeUserCache(shiroUser.getUserAccount());
    }

    /**
     * 清除用户缓存。
     *
     * @param loginName 登陆用户名
     */
    private void removeUserCache(String loginName) {
        SimplePrincipalCollection principals = new SimplePrincipalCollection();
        principals.add(loginName, super.getName());
        super.clearCachedAuthenticationInfo(principals);
    }


}
