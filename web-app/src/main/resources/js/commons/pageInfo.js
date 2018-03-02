/**
 * @author lijiguang
 * @date 2017年5月20日
 *分页的公用方法
 *<div class="row page_info" data-search="formId"></div>
 *page_info----分页标志(如果需要分页则需要写标识)
 *data-search---分页执行的查询提交form表单Id
 */
jQuery(document).ready(function () {
    var pageInfoDivList = $(".page_info");
    if (pageInfoDivList && pageInfoDivList.length > 0) {
        for (var i = 0; i < pageInfoDivList.length; i++) {
            var pageInfoDiv = $(pageInfoDivList[i]);
            //关联的form表单
            var submitForm = $("#" + pageInfoDiv.data("search"));
            //使提交按钮有一个大遮罩效果
            submitForm.find(":submit").click(function () {
                Shade.blockUI($(".page-content"));
            });
            //总页数
            var pageCount = pageInfoDiv.find(".page_count").val();
            //当前页
            var pageNow = pageInfoDiv.find(".page_now").val();
            //页码隐藏对象
            var pageNumObj = pageInfoDiv.find(".page_num");

            //绑定分页大小改变时查询第一页数据(根据改变的分页大小)
            pageInfoDiv.find("div.dataTables_infos").find("select").change(function () {
                Shade.blockUI($(".page-content"));
                submitForm.submit();
            });

            //绑定跳转页码事件
            pageInfoDiv.find(".goPage").click(function () {
                var reg = new RegExp("^[0-9]*$");
                var pageVal = $(this).parent().parent().find(".goPageVal").val();
                if (pageVal == null || pageVal == '') {
                    BootboxExt.alert('请先输入页码');
                } else {
                    if (!reg.test(pageVal)) {
                        BootboxExt.alert('输入页码无效');
                    } else {
                        if (parseInt(pageVal) > parseInt(pageCount) || parseInt(pageVal) == 0) {
                            BootboxExt.alert('输入页码超出范围');
                        } else {
                            if (parseInt(pageNow) != parseInt(pageVal)) {
                                pageNumObj.val(parseInt(pageVal));
                                Shade.blockUI($(".page-content"));
                                submitForm.submit();
                            }
                        }
                    }
                }
            });

            //首页 下一页 页码 上一页 尾页
            pageInfoDiv.find("div.dataTables_paginate").find('li a').click(function () {
                var className = $(this).parent().attr("class");
                var pageNum = $(this).parent().parent().find("li.active").find("a").text();
                if (className.indexOf("first") > -1) {
                    if (parseInt(pageNum) > 1) {
                        pageNumObj.val(1);
                    } else {
                        return;
                    }
                } else if (className.indexOf("prev") > -1) {
                    if (parseInt(pageNum) > 1) {
                        pageNumObj.val(parseInt(pageNum) - 1);
                    } else {
                        return;
                    }
                } else if (className.indexOf("next") > -1) {
                    if (parseInt(pageNum) < pageCount) {
                        pageNumObj.val(parseInt(pageNum) + 1)
                    } else {
                        return;
                    }
                } else if (className.indexOf("last") > -1) {
                    if (parseInt(pageNum) < pageCount) {
                        pageNumObj.val(pageCount);
                    } else {
                        return;
                    }
                } else if (className == "active") {
                    return;
                } else {
                    pageNumObj.val($(this).text());
                }
                Shade.blockUI($(".page-content"));
                submitForm.submit();
            })
        }
    }
});
