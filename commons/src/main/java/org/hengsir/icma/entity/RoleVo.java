package org.hengsir.icma.entity;


/**
 * 角色管理扩展类。
 * @author yuanyaping
 * @createTime 2017年15月5日
 * @version 1.0.0
 */
public class RoleVo extends Role {
    /**
     * 创建开始时间。
     */
    private String createTimeBegin;
    /**
     * 创建结束时间。
     */
    private String createTimeEnd;

    public String getCreateTimeBegin() {
        return createTimeBegin;
    }

    public void setCreateTimeBegin(String createTimeBegin) {
        this.createTimeBegin = createTimeBegin;
    }

    public String getCreateTimeEnd() {
        return createTimeEnd;
    }

    public void setCreateTimeEnd(String createTimeEnd) {
        this.createTimeEnd = createTimeEnd;
    }
}
