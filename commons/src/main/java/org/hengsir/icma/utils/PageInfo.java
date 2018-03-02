package org.hengsir.icma.utils;

import java.io.Serializable;
import java.util.List;

/**
 * Description: 对Page[E]结果进行包装 。
 * Author: liuzh
 *
 * @version 3.2.2
 * @since 3.2.2
 */
public class PageInfo<T> implements Serializable {
    private static final long serialVersionUID = 1L;
    private int     pageNum;
    private int     pageSize;
    private int     startRow;
    private int     endRow;
    private long    total;
    private int     pages;
    private List<T> list;

    public PageInfo(List<T> list) {
        setList(list);
    }

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

    public int getStartRow() {
        return startRow;
    }

    public void setStartRow(int startRow) {
        this.startRow = startRow;
    }

    public int getEndRow() {
        return endRow;
    }

    public void setEndRow(int endRow) {
        this.endRow = endRow;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public List<T> getList() {
        return list;
    }

    /**
     * 设置列表 。
     *
     * @param list list列表
     */
    public void setList(List<T> list) {
        this.list = list;
    }
}
