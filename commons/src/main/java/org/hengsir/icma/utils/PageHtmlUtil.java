package org.hengsir.icma.utils;


/**
 * 分页html生成工具类。
 * Created by lijiguang on 2017/5/20.
 */
public class PageHtmlUtil {
    private static final int[] pageSizesArr = new int[] {10, 20, 50, 100, 200};
    private static final int   startLength  = 5;

    /**
     * 生成分页html。
     *
     * @param page 分页集合
     * @return 分页html
     */
    public static String initHtml(Page<?> page) {
        return initHtml(pageSizesArr, page);
    }

    /**
     * 生成分页html。
     *
     * @param sizes 分页大小集合
     * @param page  分页数据集合
     * @return 分页html
     */
    public static String initHtml(int[] sizes, Page<?> page) {
        //当前页码
        int pageNum = page.getPageNum();
        //标签开始页面
        int startPageNum = page.getPageNum();
        //总页数
        int pageCount = page.getPages();
        //分页大小
        int pageSize = page.getPageSize();

        StringBuffer pageHtml = new StringBuffer();
        //分页请求参数
        pageHtml.append("<input type='hidden' name='pageNum' class='page_num' value='1'/>");
        pageHtml.append("<input type='hidden' class='page_now' value='").append(pageNum).append(
            "'/>");
        pageHtml.append("<input type='hidden' class='page_count' value='" + pageCount + "'/>");

        //分页下拉框
        StringBuffer pageSizeSelect = new StringBuffer();

        pageSizeSelect.append(
            "<select class='input-xs' style='border:1px solid #e5e5e5' name='pageSize'>");

        for (int size : sizes) {
            //选中当前分页大小
            if (size == pageSize) {
                pageSizeSelect.append("<option selected='selected' value='");
                pageSizeSelect.append(size);
                pageSizeSelect.append("'>");
                pageSizeSelect.append(size);
                pageSizeSelect.append("</option>");
            } else {
                pageSizeSelect.append("<option value='");
                pageSizeSelect.append(size);
                pageSizeSelect.append("'>");
                pageSizeSelect.append(size);
                pageSizeSelect.append("</option>");
            }
        }
        pageSizeSelect.append("</select>");

        StringBuffer dataTablesInfos = new StringBuffer();
        dataTablesInfos.append("<h5>");
        dataTablesInfos.append("<label>");
        dataTablesInfos.append("每页").append(pageSizeSelect).append(" 条&nbsp;");
        dataTablesInfos.append("</label>");
        dataTablesInfos.append("<span id='pageInfo'>第 ");
        dataTablesInfos.append(pageCount == 0 ? 0 : pageNum);
        dataTablesInfos.append(" 页/共 ");
        dataTablesInfos.append(page.getPages());
        dataTablesInfos.append(" 页,当前 ");
        dataTablesInfos.append(pageCount == 0 ? 0 : page.getStartRow() + 1);
        dataTablesInfos.append(" 到 ");
        dataTablesInfos.append(
            page.getEndRow() < page.getTotal() ? page.getEndRow() : page.getTotal());
        dataTablesInfos.append(" 共 ");
        dataTablesInfos.append(page.getTotal());
        dataTablesInfos.append(" 条记录");
        dataTablesInfos.append("</span> 跳到");
        dataTablesInfos.append("<input type='text' class='goPageVal input-xs'");
        dataTablesInfos.append(" style='border:1px solid #e5e5e5;width: 30px'/>页 ");
        dataTablesInfos.append("<div class='btn-group btn-group-xs btn-group-solid'>");
        dataTablesInfos.append("<input type='button' value='GO' class='goPage btn blue'>");
        dataTablesInfos.append("</div>");
        dataTablesInfos.append("</h5>");
        if (pageNum != 0) {
            if (pageNum % startLength == 0) {
                startPageNum = ((pageNum / startLength - 1) * startLength + 1);
            } else {
                startPageNum = (pageNum / startLength * startLength + 1);
            }
        }

        String beginDisabled = "";
        String endDisabled = "";
        if (pageNum == 1 || pageCount == 0) {
            beginDisabled = "disabled";
        }
        if (pageNum == pageCount || pageCount == 0) {
            endDisabled = "disabled";
        }
        StringBuffer dataTablesPaginate = new StringBuffer();
        dataTablesPaginate.append("<ul class='pagination pagination-sm' style='display:inline'>");
        dataTablesPaginate.append("<li class='first ").append(beginDisabled).append("'>");
        dataTablesPaginate.append("<a href='javascript:void(0);' title='首页'>首页</a>");
        dataTablesPaginate.append("</li>");
        dataTablesPaginate.append("<li class='prev ").append(beginDisabled).append("'>");
        dataTablesPaginate.append("<a href='javascript:void(0);' title='上一页'>");
        dataTablesPaginate.append("<i class='icon-angle-left'></i>");
        dataTablesPaginate.append("</a>");
        dataTablesPaginate.append("</li>");
        // 判断count是否为0，如果为0，则删除1,2,3,4,5,分页样式
        if (pageCount > 0) {
            for (int i = 1; i <= startLength; i++) {
                if ((startPageNum + i - 1) == pageNum) {
                    dataTablesPaginate.append("<li class='active'>");
                    dataTablesPaginate.append("<a href='javascript:void(0);'>");
                    dataTablesPaginate.append((startPageNum + i - 1));
                    dataTablesPaginate.append("</a>");
                    dataTablesPaginate.append("</li>");
                } else {
                    dataTablesPaginate.append("<li class='index_num'>");
                    dataTablesPaginate.append("<a href='javascript:void(0);'>");
                    dataTablesPaginate.append((startPageNum + i - 1));
                    dataTablesPaginate.append("</a>");
                    dataTablesPaginate.append("</li>");
                }
                if (startPageNum + i - 1 == pageCount) {
                    break;
                }
            }
        }
        //默认显示 "首页"、"上一页"、"下一页"、"尾页"。
        dataTablesPaginate.append("<li class='next ").append(endDisabled).append("'>");
        dataTablesPaginate.append("<a href='javascript:void(0);' title='下一页'>");
        dataTablesPaginate.append("<i class='icon-angle-right'></i>");
        dataTablesPaginate.append("</a>");
        dataTablesPaginate.append("</li>");
        dataTablesPaginate.append("<li class='last ").append(endDisabled).append("'>");
        dataTablesPaginate.append("<a href='javascript:void(0);' title='尾页'>尾页</a>");
        dataTablesPaginate.append("</li>");
        dataTablesPaginate.append("</ul>");

        pageHtml.append("<div class='col-md-6 col-sm-12'>");
        pageHtml.append("<div class='dataTables_infos'>");
        pageHtml.append(dataTablesInfos.toString());
        pageHtml.append("</div>");
        pageHtml.append("</div>");
        pageHtml.append("<div class='col-md-6 col-sm-12'>");
        pageHtml.append("<div class='dataTables_paginate paging_bootstrap'>");
        pageHtml.append(dataTablesPaginate.toString());
        pageHtml.append("</div>");
        pageHtml.append("</div>");
        return pageHtml.toString();
    }

}
