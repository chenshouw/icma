package org.hengsir.icma.entity;


/**
 * 用户实体类。
 * Created by lidan on 2017/6/13.
 */
public class UserOrg extends User {
    private static final long serialVersionUID = 1L;
    /**
     * 所属组织机构名称。
     */
    private String userOrgName;

    public String getUserOrgName() {
        return userOrgName;
    }

    public void setUserOrgName(String userOrgName) {
        this.userOrgName = userOrgName;
    }
}
