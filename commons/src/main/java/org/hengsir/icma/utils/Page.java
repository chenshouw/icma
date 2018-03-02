package org.hengsir.icma.utils;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 分页。
 *
 * @author lijiguang 2017-5-24
 * @version 1.0.0
 */
public class Page<E> implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 开始页码。
     */
    private int     pageNum;
    /**
     * 分页大小。
     */
    private int     pageSize;
    /**
     * 开始数据编号。
     */
    private int     startRow;
    /**
     * 结束数据编号。
     */
    private int     endRow;
    /**
     * 总条数。
     */
    private long    total;
    /**
     * 总页数。
     */
    private int     pages;
    /**
     * 数据集合。
     */
    private List<E> result;

    /**
     * 组合分页使用。
     * 保存组合分页记录
     */
    private Map<String, Integer> pageMap = new HashMap<>();

    /**
     * 构造函数。
     *
     * @param pageNum  开始页码
     * @param pageSize 分页大小
     */
    public Page(int pageNum, int pageSize) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.startRow = pageNum > 0 ? (pageNum - 1) * pageSize : 0;
        this.endRow = pageNum * pageSize;
    }

    public List<E> getResult() {
        return result;
    }

    public void setResult(List<E> result) {
        this.result = result;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getEndRow() {
        return endRow;
    }

    public void setEndRow(int endRow) {
        this.endRow = endRow;
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

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public Map<String, Integer> getPageMap() {
        return pageMap;
    }

    public void setPageMap(Map<String, Integer> pageMap) {
        this.pageMap = pageMap;
    }

    @Override
    public String toString() {
        return "Page{" + "pageNum=" + pageNum + ", pageSize=" + pageSize + ", startRow=" +
               startRow + ", endRow=" + endRow + ", total=" + total + ", pages=" + pages +
               ", result=" + result + ", pageMap=" + pageMap + '}';
    }
}