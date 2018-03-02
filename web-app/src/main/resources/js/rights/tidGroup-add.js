

/**
 * 初始化表格数据。
 */
function initSubTable() {
    var midStr = $("#merchantId").val();
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
            },
            {
                field: 'subMid',
                title: '子商户号'
            },
            {
                field: 'subMidShortName',
                title: '子商户简称'
            },
            {
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
        mid: $("#merchantId").val(),
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
    window.location.href = "/rights/user/search";
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
 * 是否选中商户。
 * @param value
 * @param row
 * @param index
 * @returns {*}
 */
function midFormatter(value, row, index) {
    if (row.mid === $("#merchantId").val()) {
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
    $("#merchantName").val(selectInfo == undefined ? "" : selectInfo.midName);
    $("#merchantId").val(selectInfo == undefined ? "" : selectInfo.mid);
    //$('#midName').valid();
    //$('#subMidName').valid();
}

/**
 * 清空选择商户。
 */
function clearMchInfoTable() {
    $("#merchantId").val("");
    $("#merchantName").val("");
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
    window.location.href = "/rights/user/search";
}
