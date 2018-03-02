package org.hengsir.icma.utils;

import java.io.Serializable;

/**
 * 组合分页参数。
 * Created by lijiguang on 2017/6/23.
 */
public class GroupPag implements Serializable {
    /**
     * 开始页。
     */
    private int pageNum;
    /**
     * 分页大小。
     */
    private int pageSize;
    /**
     * 移除数量。
     */
    private int removeNum;

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getRemoveNum() {
        return removeNum;
    }

    public void setRemoveNum(int removeNum) {
        this.removeNum = removeNum;
    }

    @Override
    public String toString() {
        return "GroupPag{" + "pageNum=" + pageNum + ", pageSize=" + pageSize + ", removeNum=" +
               removeNum + '}';
    }
}
