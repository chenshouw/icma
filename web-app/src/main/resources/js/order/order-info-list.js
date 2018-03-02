var orderInfoVo = new Object();

function setSearchParam() {
    orderInfoVo.mid = $("#mid").val();
    orderInfoVo.subMid = $("#subMid").val();
    orderInfoVo.tid = $("#tid").val();
    orderInfoVo.txnId = $("#txnId").val();
    orderInfoVo.sysOrderId = $("#sysOrderId").val();
    orderInfoVo.orderId = $("#orderId").val();
    orderInfoVo.trace = $("#trace").val();
    orderInfoVo.orderStatus = $("#orderStatus").val();
    orderInfoVo.txnStatus = $("#txnStatus").val();
    orderInfoVo.channels = $("#channels").val();
    orderInfoVo.payType = $("#payType").val();
    orderInfoVo.settleStatus = $("#settleStatus").val();
    orderInfoVo.goods = $("#goods").val();
    orderInfoVo.payTimeBegin = $("#payTimeBegin").val();
    orderInfoVo.payTimeEnd = $("#payTimeEnd").val();
    orderInfoVo.settleTimeBegin = $("#settleTimeBegin").val();
    orderInfoVo.settleTimeEnd = $("#settleTimeEnd").val();
    orderInfoVo.createTimeBegin = $("#createTimeBegin").val();
    orderInfoVo.createTimeEnd = $("#createTimeEnd").val();
    orderInfoVo.txnTimeBegin = $("#txnTimeBegin").val();
    orderInfoVo.txnTimeEnd = $("#txnTimeEnd").val();
}

jQuery(document).ready(function () {
    setSearchParam();

    $("#createTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createTimeEnd").datetimepicker("setStartDate", $("#createTimeBegin").val());
        $("#createTimeBegin").datetimepicker("hide");
    });
    $("#createTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createTimeBegin").datetimepicker("setEndDate", $("#createTimeEnd").val());
        $("#createTimeEnd").datetimepicker("hide");
    });

    $("#settleTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settleTimeEnd").datetimepicker("setStartDate", $("#settleTimeBegin").val());
        $("#settleTimeBegin").datetimepicker("hide");
    });
    $("#settleTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settleTimeBegin").datetimepicker("setEndDate", $("#settleTimeEnd").val());
        $("#settleTimeEnd").datetimepicker("hide");
    });

    $("#txnTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnTimeEnd").datetimepicker("setStartDate", $("#txnTimeBegin").val());
        $("#txnTimeBegin").datetimepicker("hide");
    });
    $("#txnTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnTimeBegin").datetimepicker("setEndDate", $("#txnTimeEnd").val());
        $("#txnTimeEnd").datetimepicker("hide");
    });


    $("#txnTimeBeginClear").click(function () {
        $("#txnTimeBegin").val("");
    });

    $("#txnTimeEndClear").click(function () {
        $("#txnTimeEnd").val("");
    });

    $("#settleTimeBeginClear").click(function () {
        $("#settleTimeBegin").val("");
    });

    $("#settleTimeEndClear").click(function () {
        $("#settleTimeEnd").val("");
    });

    $("#createTimeBeginClear").click(function () {
        $("#createTimeBegin").val("");
    });

    $("#createTimeEndClear").click(function () {
        $("#createTimeEnd").val("");
    });
});

function clearFile() {
    $("#batchFile").val('');
}

// 文件修改时
$("#batchFile").change(function () {
    $("#batchImportBtn").val("上传");
    $("#progressBar").width("0%");
    var file = $(this).prop('files');
    if (file.length != 0) {
        $("#batchImportBtn").attr('disabled', false);
    }

});
var xhr = new XMLHttpRequest();

var response = "";

function callback() {
    //接收响应数据
    //判断对象状态是否交互完成，如果为4则交互完成
    if (xhr.readyState == 4) {
        //判断对象状态是否交互成功,如果成功则为200
        if (xhr.status == 200) {
            //接收数据,得到服务器输出的纯文本数据
            response = xhr.responseText;
        }
    }
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
 * 终端弹出框查询参数。
 * @param params
 * @returns {{pageSize, pageNumber}}
 */
function queryTidParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        tid: $("#tidSearch").val(),
        tidShortName: $("#tidShortNameSearch").val(),
        tidName: $("#tidNameSearch").val(),
        mid: $("#mid").val(),
        subMid: $("#subMid").val(),

    };
    return temp;
}

/**
 * 终端弹出框重置。
 */
function cleanTidInfoQuery() {
    $("#tidSearch").val('');
    $("#tidShortNameSearch").val('');
    $("#tidNameSearch").val('');
    refreshAlertTidData();
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
 * 终端弹出框查询。
 */
function refreshAlertTidData() {
    $("#tid-info-table").bootstrapTable('refresh', {
        url: '/mch/tid/search-list',
        queryParams: queryTidParams
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
    $("#subMidShortName").val(selectInfo == undefined ? "" : selectInfo.subMidShortName);
    $('#subMidShortName').valid();
    $("#tid").val("");
    $("#tidShortName").val("");
}

/**
 * 初始化表格数据。
 */
function initTable() {
    var midStr = $("#mid").val();
    if(midStr == null || midStr == ''){
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
 * 初始化终端表格数据。
 */
function initTidTable() {

    var midStr = $("#subMid").val();
    if(midStr == null || midStr == ''){
        BootboxExt.alert("请先选择子商户");
        return;
    }

    $('#tidModal').modal('show');
    //先销毁表格
    $('#tid-info-table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#tid-info-table").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/mch/tid/search-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        queryParams: queryTidParams,
        singleSelect: true,
        uniqueId: "tid",
        columns: [
            {
                checkbox: true,
                formatter: tidFormatter
            }, {
                field: 'tid',
                title: '终端号'
            }, {
                field: 'tidShortName',
                title: '终端简称'
            }, {
                field: 'tidName',
                title: '终端名称'
            }],
        onLoadError: function () {  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
        }
    });
}

/**
 * 选中子商户信息提交。
 */
function selectTid() {
    var selectInfo = $("#tid-info-table").bootstrapTable('getSelections')[0];
    if (selectInfo == null || selectInfo.length < 1) {
        BootboxExt.alert("请选择一个终端");
        return;
    }
    $('#tidModal').modal('hide');
    $("#tid").val(selectInfo == undefined ? "" : selectInfo.tid);
    $("#tidShortName").val(selectInfo == undefined ? "" : selectInfo.tidShortName);
    $('#tidName').valid();
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
 * 是否选中终端。
 * @param value
 * @param row
 * @param index
 * @returns {*}
 */
function tidFormatter(value, row, index) {
    if (row.tid === $("#tid").val()) {
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
        $("#subMidShortName").val("");
        $("#subMid").val("");
    }
    $('#mchInfoModal').modal('hide');
    $("#midShortName").val(selectInfo == undefined ? "" : selectInfo.midShortName);
    $("#mid").val(selectInfo == undefined ? "" : selectInfo.mid);
    $('#midShortName').valid();
    $('#subMidShortName').valid();
    $("#tid").val("");
    $("#tidShortName").val("");
}

/**
 * 清空选择商户。
 */
function clearMchInfoTable() {
    $("#mid").val("");
    $("#midShortName").val("");
    $("#subMid").val("");
    $("#subMidShortName").val("");
    $('#midShortName').valid();
    $('#subMidShortName').valid();
    $("#tid").val("");
    $("#tidShortName").val("");
}

/**
 * 清空选中子商户
 */
function clearSubMchInfo() {
    $("#subMid").val("");
    $("#subMidShortName").val("");
    $('#subMidShortName').valid();
    $("#tid").val("");
    $("#tidShortName").val("");
}

/**
 * 清空选中终端
 */
function clearTidInfo() {
    $("#tid").val("");
    $("#tidShortName").val("");
    $('#tidShortName').valid();
}



/**
 * 日志查询导出excel。
 */
$("#export").click(function () {
    $("#export").attr('disabled', true);
    var el = $("#orderBody");
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: orderInfoVo,
        url: "/deal-manage/order/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $("#export").attr('disabled', false);
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/deal-manage/order/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
                window.location.href = loadUrl;
            } else {
                BootboxExt.alert(data.msg, function () {
                });
            }
        },
        error: function () {
            BootboxExt.alert("网络异常，请联系维护人员", function () {
            });
        }
    });

})

/**
 * 下载模板
 */
function down() {
    var fileName = "order-info.xlsx";
    var loadUrl = "/deal-manage/order/down?fileName=终端批量导入-模板.xlsx&realFileAddr=" + fileName;
    window.location.href = loadUrl;
}



