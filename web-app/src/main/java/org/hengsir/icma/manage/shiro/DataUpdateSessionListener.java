package org.hengsir.icma.manage.shiro;


import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DataUpdateSessionListener implements SessionListener {

    private static Logger logger = LoggerFactory.getLogger(DataUpdateSessionListener.class);



    @Override
    public void onStart(Session session) {
        logger.debug("--开始一个用户Session sessionId={}", session.getId());
    }

    @Override
    public void onStop(Session session) {
        logger.debug("------ 用户 退出，更新用户登录状态信息,设置用户不在线及登出时间----");
        updateUserLogoutStatus(session);

    }

    @Override
    public void onExpiration(Session session) {
        logger.debug("------用户Session过期，更新用户登录状态信息,设置用户 不在线 及 登出时间 ----");
        updateUserLogoutStatus(session);
    }

    private void updateUserLogoutStatus(Session session) {
        Object  temp = session.getAttribute("_shiro_principal");
        String loginName = temp!=null? temp.toString(): "";
        logger.debug("-------当前Session 用户名={}", loginName);

    }

}
