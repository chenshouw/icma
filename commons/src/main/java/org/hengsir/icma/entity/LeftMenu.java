package org.hengsir.icma.entity;

import org.hengsir.icma.model.Model;

import java.io.Serializable;
import java.util.Date;

public class LeftMenu implements Model {
    @Override
    public Serializable getKey() {
        return null;
    }

    /**
     * 主键。
     */
    private Integer menuId;

    /**
     * 图标。
     */
    private String menuIcon;

    /**
     * 编码。
     */
    private String menuCode;

    /**
     * 名称。
     */
    private String menuName;

    /**
     * 跳转路径。
     */
    private String menuHref;

    /**
     * 上级编码。
     */
    private String menuSuperCode;

    /**
     * 创建日期。
     */
    private Date createTime;

    /**
     * 修改人。
     */
    private String updateBy;

    /**
     * 修改日期。
     */
    private Date updateTime;



    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    public String getMenuIcon() {
        return menuIcon;
    }

    public void setMenuIcon(String menuIcon) {
        this.menuIcon = menuIcon;
    }

    public String getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(String menuCode) {
        this.menuCode = menuCode;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuHref() {
        return menuHref;
    }

    public void setMenuHref(String menuHref) {
        this.menuHref = menuHref;
    }

    public String getMenuSuperCode() {
        return menuSuperCode;
    }

    public void setMenuSuperCode(String menuSuperCode) {
        this.menuSuperCode = menuSuperCode;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
