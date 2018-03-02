var selectIds=[];
var selectNames=[];
var tidInfoItems;

/**
 * 初始化表格数据。
 */
function initTidTables(tidGroupId,merchantId,subMid) {
    var tid = "";

    if( merchantId == "null" || merchantId == null || '' == merchantId){
        $("#hiddenMerchantId").val('');
        console.log("m为空时："+$("#hiddenMerchantId").val());
    }else{
        $("#hiddenMerchantId").val(merchantId);
        console.log("m非空"+$("#hiddenMerchantId").val());
    }
    if ( subMid == "null" || subMid == null || '' == subMid){
        $("#hiddenSubMid").val('');
        console.log( "s为空时"+$("#hiddenSubMid").val());
    }else {
        $("#hiddenSubMid").val(subMid);
        console.log( "s非空"+$("#hiddenSubMid").val());
    }
    if (tidGroupId == null || '' == tidGroupId) {
        tidGroupId = $("#hiddenTidGroupId").val();
    } else {
        $("#hiddenTidGroupId").val(tidGroupId);
        // $("#roleCode").val('');
        // $("#roleName").val('');
    }
    queryTidInfo(tidGroupId);
    if(tidInfoItems != null){
        $.each(tidInfoItems, function (index, row) {
            selectIds[index] = row.tid;
            selectNames[index]= row.tidName;
        });
    }
    //先销毁表格
    $('#tid_tables').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    var table = $("#tid_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/rights/tidGroup/search-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber:1,
        pageSize: 100,
        pageList: [100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:'',
        queryParams: queryParams,
        singleSelect : false,
        uniqueId: "tidGroupId",
        responseHandler:responseHandler,
        columns: [
            {
                field : 'checked',
                checkbox: true,
            },
            {
                field: 'tidName',
                title: '终端名称'
            },
            {
                field: 'tid',
                title: '终端号'
            },
            {
                field: 'tidShortName',
                title: '终端简称'
            },
            {
                field: 'subMidShortName',
                title: '子商户简称'
            },
            {
                field: 'status',
                title: '状态'
            }],
        onLoadError: function(){  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time : 1500, icon : 2});
        }
    });

    //选中事件操作数组
    var union = function(array,ids){
        $.each(ids, function (i, id) {
            if($.inArray(id,array)==-1){
                array[array.length] = id;
            }
        });
        return array;
    };
    //取消选中事件操作数组
    var difference = function(array,ids){
        $.each(ids, function (i, id) {
            var index = $.inArray(id,array);
            if(index!=-1){
                array.splice(index, 1);
            }
        });
        return array;
    };
    var _ = {"union":union,"difference":difference};
    //绑定选中事件、取消事件、全部选中、全部取消
    table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
        var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return row.tid;
        });
        var texts = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return row.tidName;
        });
        func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
        selectIds = _[func](selectIds, ids);
        selectNames = _[func](selectNames, texts);
    });
}

function initTidTables2() {
    var tid = "";
    var tidGroupId = $("#hiddenTidGroupId").val();
    queryTidInfo(tidGroupId);
    if(tidInfoItems != null){
        $.each(tidInfoItems, function (index, row) {
            selectIds[index] = row.tid;
            selectNames[index]= row.tidName;
        });
    }
    //先销毁表格
    $('#tid_tables').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    var table = $("#tid_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/rights/tidGroup/search-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber:1,
        pageSize: 100,
        pageList: [100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:'',
        queryParams: queryParams,
        singleSelect : false,
        uniqueId: "tidGroupId",
        responseHandler:responseHandler,
        columns: [
            {
                field : 'checked',
                checkbox: true,
            },
            {
                field: 'tidName',
                title: '终端名称'
            },
            {
                field: 'tid',
                title: '终端号'
            },
            {
                field: 'tidShortName',
                title: '终端简称'
            },
            {
                field: 'subMidShortName',
                title: '子商户简称'
            },
            {
                field: 'status',
                title: '状态'
            }],
        onLoadError: function(){  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time : 1500, icon : 2});
        }
    });

    //选中事件操作数组
    var union = function(array,ids){
        $.each(ids, function (i, id) {
            if($.inArray(id,array)==-1){
                array[array.length] = id;
            }
        });
        return array;
    };
    //取消选中事件操作数组
    var difference = function(array,ids){
        $.each(ids, function (i, id) {
            var index = $.inArray(id,array);
            if(index!=-1){
                array.splice(index, 1);
            }
        });
        return array;
    };
    var _ = {"union":union,"difference":difference};
    //绑定选中事件、取消事件、全部选中、全部取消
    table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
        var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return row.tid;
        });
        var texts = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return row.tidName;
        });
        func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
        selectIds = _[func](selectIds, ids);
        selectNames = _[func](selectNames, texts);
    });
}


//表格分页之前处理多选框数据
function responseHandler(res) {
    $.each(res.rows, function (i, row) {
        row.checkStatus = $.inArray(row.tid, selectIds) != -1;  //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });
    return res;
}

function queryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        tidName: $("#tidName").val(),
        tid: $("#tid").val(),
        tidGroupId: $("#hiddenTidGroupId").val(),
        mchId: $("#hiddenMerchantId").val(),
        subId: $("#hiddenSubMid").val()

    };
    return temp;
}


/**
 * 初始化表格数据。
 */
function viewTidTables(tidGroupId) {
    //先销毁表格
    $('#viewTidTable').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#viewTidTable").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: "/rights/tidGroup/queryTidByGroupId/"+tidGroupId,//获取数据的Servlet地址
        striped: true,  //表格显示条纹
        data: {tidGroupId:tidGroupId},
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:'',
        singleSelect : true,
        columns: [
            {
                field: 'tidName',
                title: '终端名称'
            },
            {
                field: 'tid',
                title: '终端编号'
            },
            {
                field: 'tidShortName',
                title: '终端简称'
            },
            {
                field: 'subMidShortName',
                title: '子商户简称'
            },
            {
                field: 'status',
                title: '状态'
            }],
        onLoadError: function(){  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time : 1500, icon : 2});
        }
    });
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
        tidName: $("#tidName").val(),
        tid: $("#tid").val(),
        tidGroupId: $("#hiddenTidGroupId").val(),
        mchId: $("#hiddenMerchantId").val(),
        subId: $("#hiddenSubMid").val()
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
    $("#merchantName").val(selectInfo == undefined ? "" : selectInfo.midShortName);
    $("#merchantId").val(selectInfo == undefined ? "" : selectInfo.mid);
    $('#merchantName').valid();
    $("#tid").val("");
}

/**
 * 清空选择商户。
 */
function clearMchInfoTable() {
    $("#merchantName").val("");
    $("#merchantId").val("");
}


function queryTidInfo(tidGroupId) {
    $.ajax({
        async: false,
        type: "get",
        url: "/rights/tidGroup/queryTidByGroupId/"+tidGroupId ,
        dataType: "json",
        success: function (data) {
            tidInfoItems = data.rows;
        }
    });
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
    if (row.mid === $("#merchantId").val()) {
        return {
            disabled: false,//设置是否可用
            checked: true//设置选中
        };
    }
    return value;
}

/**
 * 选择终端信息。
 */
function selectTid() {
    var tidGroupId = $("#hiddenTidGroupId").val();
    var el = $("#userBody");
    $("#btn-myModal").attr("disabled",true);
    Shade.blockUI(el);
    if(selectIds == null || selectIds.length < 1) {
        $("#btn-myModal").attr("disabled",false);
        Shade.unblockUI(el);
        BootboxExt.alert("请先选择分配的终端!");
        return;
    }
    var selects = "";
    for (var i = 0; i < selectIds.length; i++) {
        if (i > 0) {
            selects += ',';
        }
        selects += selectIds[i];
    }
    var el = $("#userBody");
    $("#btn-myModal").attr("disabled",true);
    Shade.blockUI(el);
    $('#myModal').modal('hide');
    $.get("/rights/tidGroup/saveTidGroupRelation", { tids: selects,tidGroupId:tidGroupId}, function (data)
    {
        $("#btn-myModal").attr("disabled",false);
        Shade.unblockUI(el);
        if(data.result == true){
            BootboxExt.alert("分配成功", function (res) {
                location.href = "/rights/tidGroup/search";
            });
        }else{
            BootboxExt.alert("分配失败", function (res) {
                window.location.reload();
            });
        }
    }, "json");
}
