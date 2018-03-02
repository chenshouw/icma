package org.hengsir.icma.entity;

/**
 * 菜单管理扩展类。
 * @author yuanyaping
 * @createTime 2017年12月1日
 * @version 1.0.0
 */
public class LeftMenuVo extends LeftMenu {
    private static final long serialVersionUID = 1L;
    //父类名称
    private String superName;

    public String getSuperName() {
        return superName;
    }

    public void setSuperName(String superName) {
        this.superName = superName;
    }
}
