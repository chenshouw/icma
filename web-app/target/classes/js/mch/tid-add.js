var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        tid: {
            required: true,
            onlynum: true,
            tidLength: 8
        },
        tidName: {
            required: true,
            stringMaxLength: 150
        },
        tidShortName: {
            required: true,
            stringMaxLength: 150
        },
        midName: {
            required: true,
            stringMaxLength: 150
        },
        subMidName: {
            required: true,
            stringMaxLength: 150
        },
        memo: {
            stringMaxLength: 100
        },
        status: {
            required: true
        },
        trace: {
            required: true,
            onlynum: true,
            stringMaxLength: 6
        }
    },
    highlight: function (element) {
        $(element)
            .closest('.form-group').addClass('has-error');
    },

    unhighlight: function (element) {
        $(element)
            .closest('.form-group').removeClass('has-error');
    },

    success: function (label) {
        label
            .closest('.form-group').removeClass('has-error');
    }
});

$(function () {
    $("#btnSave").click(function () {
        if (addForm.valid()) { //验证通过
            var mid = $("#mid").val();
            if (null == mid || "" == mid) {
                BootboxExt.alert("请选择商户");
                return;
            }

            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#tidBoby"));
            $.post("/mch/tid/add",
                $("#addForm").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#tidBoby"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/mch/tid/search";
                        });
                    } else if (data.result == "isHas") {
                        BootboxExt.alert("此终端编号已存在", function (res) {
                            return;
                        });
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });

    $("#btnUpdate").click(function () {
        if (addForm.valid()) { //验证通过
            var mid = $("#mid").val();
            if (null == mid || "" == mid) {
                BootboxExt.alert("请选择商户");
                return;
            }
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#tidBoby"));
            $.post("/mch/tid/update",
                $("#updateForm").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", true);
                    Shade.unblockUI($("#tidBoby"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/mch/tid/search";
                        });
                    } else {
                        BootboxExt.alert("修改失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });
});

/**
 * 初始化表格数据。
 */
function initTable() {
    var midStr = $("#mid").val();
    if (midStr == null || midStr == "") {
        //$('#myModal').modal('hide');
        BootboxExt.alert("请先选择商户");
        return;
    }

    $('#myModal').modal('show');
    //先销毁表格
    $('#item_info_table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#item_info_table").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/mch/sub/search-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        queryParams: queryParams,
        singleSelect: true,
        uniqueId: "subMid",
        columns: [
            {
                checkbox: true,
                formatter: subMidFormatter
            }, {
                field: 'subMid',
                title: '子商户号'
            }, {
                field: 'subMidShortName',
                title: '子商户简称'
            }, {
                field: 'subMidName',
                title: '子商户名称'
            }, {
                field: 'midName',
                title: '商户名称'
            }],
        onLoadError: function () {  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
        }
    });
}

/**
 * 是否选中子商户。
 * @param value
 * @param row
 * @param index
 * @returns {*}
 */
function subMidFormatter(value, row, index) {
    if (row.subMid === $("#subMid").val()) {
        return {
            disabled: false,//设置是否可用
            checked: true//设置选中
        };
    }
    return value;
}

/**
 * 子商户弹出框查询参数。
 * @param params
 * @returns {{pageSize, pageNumber, mid: (*|jQuery), subMid: (*|jQuery), subMidShortName: (*|jQuery), subMidName: (*|jQuery)}}
 */
function queryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        mid: $("#mid").val(),
        subMid: $("#subMidSearch").val(),
        subMidShortName: $("#subMidShortNameSearch").val(),
        subMidName: $("#subMidNameSearch").val()
    };
    return temp;
}

/**
 * 子商户弹出框查询。
 */
function refreshAlertSubMchData() {
    $("#item_info_table").bootstrapTable('refresh', {
        url: '/mch/sub/search-list',
        queryParams: queryParams
    });
}

/**
 * 子商户弹出框重置。
 */
function cleanSubMchInfoQuery() {
    $("#subMidSearch").val('');
    $("#subMidShortNameSearch").val('');
    $("#subMidNameSearch").val('');
    refreshAlertSubMchData();
}

/**
 * 选中子商户信息提交。
 */
function selectItem() {
    var selectInfo = $("#item_info_table").bootstrapTable('getSelections')[0];
    if (selectInfo == null || selectInfo.length < 1) {
        BootboxExt.alert("请选择一个子商户");
        return;
    }
    $('#myModal').modal('hide');
    $("#subMid").val(selectInfo == undefined ? "" : selectInfo.subMid);
    $("#subMidName").val(selectInfo == undefined ? "" : selectInfo.subMidName);
    $('#subMidName').valid();
}

/**
 * 初始化商户表格数据。
 */
function initMchInfoTable() {
    //先销毁表格
    $('#mchInfoTable').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#mchInfoTable").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/mch/info/search-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        queryParams: queryMchInfoParams,
        singleSelect: true,
        uniqueId: "mid",
        columns: [
            {
                checkbox: true,
                formatter: midFormatter
            }, {
                field: 'mid',
                title: '商户号'
            }, {
                field: 'midShortName',
                title: '商户简称'
            }, {
                field: 'midName',
                title: '商户名称'
            }],
        onLoadError: function () {  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
        }
    });
}

/**
 * 是否选中商户。
 * @param value
 * @param row
 * @param index
 * @returns {*}
 */
function midFormatter(value, row, index) {
    if (row.mid === $("#mid").val()) {
        return {
            disabled: false,//设置是否可用
            checked: true//设置选中
        };
    }
    return value;
}

/**
 * 商户弹出框查询。
 */
function refreshAlertMchData() {
    $("#mchInfoTable").bootstrapTable('refresh', {
        url: '/mch/info/search-list',
        queryParams: queryMchInfoParams
    });
}

/**
 * 商户弹出框参数。
 * @param params
 * @returns {{pageSize, pageNumber, mid: (*|jQuery), midShortName: (*|jQuery), midName: (*|jQuery)}}
 */
function queryMchInfoParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        mid: $("#midSearch").val(),
        midShortName: $("#midShortNameSearch").val(),
        midName: $("#midNameSearch").val()
    };
    return temp;
}

/**
 * 商户弹出框重置。
 */
function cleanMchInfoQuery() {
    $("#midSearch").val('');
    $("#midShortNameSearch").val('');
    $("#midNameSearch").val('');
    refreshAlertMchData();
}


/**
 * 选中商户信息提交。
 */
function selectMchInfo() {
    var selectInfo = $("#mchInfoTable").bootstrapTable('getSelections')[0];
    if (selectInfo == null || selectInfo.length < 1) {
        BootboxExt.alert("请选择一个商户");
        return;
    }
    if ($("#mid").val() != (selectInfo == undefined ? "" : selectInfo.mid)) {
        $("#subMidName").val("");
        $("#subMid").val("");
    }
    $('#mchInfoModal').modal('hide');
    $("#midName").val(selectInfo == undefined ? "" : selectInfo.midName);
    $("#mid").val(selectInfo == undefined ? "" : selectInfo.mid);
    $('#midName').valid();
    $('#subMidName').valid();
}

/**
 * 清空选择商户。
 */
function clearMchInfoTable() {
    $("#mid").val("");
    $("#midName").val("");
    $("#subMid").val("");
    $("#subMidName").val("");
    $('#midName').valid();
    $('#subMidName').valid();
}

/**
 * 清空选中子商户
 */
function clearSubMchInfo() {
    $("#subMid").val("");
    $("#subMidName").val("");
    $('#subMidName').valid();
}

/**
 * 返回按钮。
 */
function returnSearch() {
    Shade.blockUI($("#tidBoby"));
    window.location.href = "/mch/tid/search";
}




