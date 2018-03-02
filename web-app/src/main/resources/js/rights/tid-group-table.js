var selectGroupIds=[];
var selectGroupNames=[];
var tidGroupInfoItems;

/**
 * 初始化表格数据。
 */
function initTidGroupTables(userId,merchantId,subMid) {
    if (userId == null || '' == userId) {
        userId = $("#tidGroupHiddenUserId").val();
    } else {
        $("#tidGroupHiddenUserId").val(userId);
    }
    if (merchantId == null || '' == merchantId) {
        merchantId = $("#tidGroupMid").val();
    } else {
        $("#tidGroupMid").val(merchantId);
    }
    if (subMid == null || '' == subMid) {
        subMid = $("#tidGroupSubMchId").val();
    } else {
        $("#tidGroupSubMchId").val(subMid);
    }
    queryTidGroupInfo(userId);
    if(tidGroupInfoItems != null){
        $.each(tidGroupInfoItems, function (index, row) {
            selectGroupIds[index] = row.tidGroupId;
            selectGroupNames[index]= row.tidGroupName;
        });
    }
    //先销毁表格
    $('#tid_group_tables').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    var table = $("#tid_group_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/rights/userTidGroup/search-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber:1,
        pageSize: 10,
        pageList: [ 10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:'',
        queryParams: queryParamsTidGroup,
        singleSelect : false,
        uniqueId: "tidGroupId",
        responseHandler:responseHandler,
        columns: [
            {
                field : 'checked',
                checkbox: true,
            },
            {
                field: 'tidGroupCode',
                title: '终端组编码'
            }, {
                field: 'tidGroupName',
                title: '终端组名称'
            }, {
                field: 'tidGroupDesc',
                title: '终端组描述'
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
            return row.roleId;
        });
        var texts = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return row.roleName;
        });
        func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
        selectGroupIds = _[func](selectGroupIds, ids);
        selectGroupNames = _[func](selectGroupNames, texts);
    });
}

//表格分页之前处理多选框数据
function responseHandler(res) {
    $.each(res.rows, function (i, row) {
        row.checkStatus = $.inArray(row.id, selectGroupIds) != -1;  //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });
    return res;
}

function queryParamsTidGroup(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        tidGroupName: $("#tidGroupName").val(),
        tidGroupId: $("#tidGroupId").val(),
        tidGroupCode: $("#tidGroupCode").val(),
        userId: $("#tidGroupHiddenUserId").val(),
        merchantId:$("#tidGroupMid").val(),
        subMid:$("#tidGroupSubMchId").val(),
    };
    return temp;
}


function queryTidGroupInfo(userId) {
    $.ajax({
        async: false,
        type: "get",
        url: "/rights/tidGroup/queryRoleByUser/"+userId ,
        dataType: "json",
        success: function (data) {
            tidGroupInfoItems = data.rows;
        }
    });
}

/**
 * 选择终端组信息。
 */
function selectTidGroup() {
    var userId = $("#tidGroupHiddenUserId").val();
    var el = $("#userBody");
    $("#btn-myModal-tidGroup").attr("disabled",true);
    Shade.blockUI(el);
    if(selectGroupIds == null || selectGroupIds.length < 1) {
        $("#btn-myModal-tidGroup").attr("disabled",false);
        Shade.unblockUI(el);
        BootboxExt.alert("请先选择终端组信息!");
        return;
    }
    var selects = "";
    for (var i = 0; i < selectGroupIds.length; i++) {
        if (i > 0) {
            selects += ',';
        }
        selects += selectGroupIds[i];
    }
    var el = $("#userBody");
    $("#btn-myModal-tidGroup").attr("disabled",true);
    Shade.blockUI(el);
    $('#myModal-tidGroup').modal('hide');
    $.get("/rights/userTidGroup/saveUserTidGroupUser", { tidGroupIds: selects,userId:userId}, function (data)
    {
        $("#btn-myModal-tidGroup").attr("disabled",false);
        Shade.unblockUI(el);
        if(data.result == true){
            BootboxExt.alert("分配成功", function (res) {
                location.href = "/rights/user/search";
            });
        }else{
            BootboxExt.alert("分配失败", function (res) {
                window.location.reload();
            });
        }
    }, "json");
}

/**
 * 初始化表格数据。
 */
function viewTidGroupTables(userId) {
    //先销毁表格
    $('#viewTidGroupTable').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#viewTidGroupTable").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: "/rights/tidGroup/queryRoleByUser/"+userId,//获取数据的Servlet地址
        striped: true,  //表格显示条纹
        data: {userId:userId},
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:'',
        singleSelect : true,
        columns: [
            {
                field : 'checked',
                checkbox: true,
            },
            {
                field: 'tidGroupCode',
                title: '终端组编码'
            }, {
                field: 'tidGroupName',
                title: '终端组名称'
            }, {
                field: 'tidGroupDesc',
                title: '终端组描述'
            }],
        onLoadError: function(){  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time : 1500, icon : 2});
        }
    });
}

