var selectIds=[];
var selectNames=[];
function deleteUser(userId) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/rights/user/delete", { userId: userId}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/rights/user/search";
                    });
                }else{
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

var roleInfoItems;

    /**
 * 初始化表格数据。
 */
function initRoleTables(userId,sysId) {
    var roleId = "";
    if (userId == null || '' == userId) {
        userId = $("#hiddenUserId").val();
    } else {
        $("#hiddenUserId").val(userId);
    }
        if (sysId == null || '' == sysId) {
            sysId = $("#hiddenSysId").val();
        } else {
            $("#hiddenSysId").val(sysId);
        }
    queryRoleInfo(userId);
    if(roleInfoItems != null){
        $.each(roleInfoItems, function (index, row) {
            selectIds[index] = row.roleId;
            selectNames[index]= row.roleName;
        });
    }
    //先销毁表格
    $('#role_tables').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    var table = $("#role_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/rights/role/search-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber:1,
        pageSize: 10,
        pageList: [ 10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:'',
        queryParams: queryParamsRole,
        singleSelect : false,
        uniqueId: "roleId",
        responseHandler:responseHandler,
        columns: [
            {
                field : 'checked',
                checkbox: true,
            },
            {
                field: 'roleName',
                title: '角色名称'
            }, {
                field: 'roleCode',
                title: '角色编码'
            }, {
                field: 'roleDesc',
                title: '角色描述'
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
        selectIds = _[func](selectIds, ids);
        selectNames = _[func](selectNames, texts);
    });
}

//表格分页之前处理多选框数据
function responseHandler(res) {
    $.each(res.rows, function (i, row) {
        row.checkStatus = $.inArray(row.id, selectIds) != -1;  //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });
    return res;
}

function queryParamsRole(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        roleName: $("#roleName").val(),
        roleCode: $("#roleCode").val(),
        userId: $("#hiddenUserId").val(),
        sysId: $("#hiddenSysId").val(),
    };
    return temp;
}


/**
 * 初始化表格数据。
 */
function viewRoleTables(userId) {
    //先销毁表格
    $('#viewRoleTable').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#viewRoleTable").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: "/rights/user/queryRoleByUser/"+userId,//获取数据的Servlet地址
        striped: true,  //表格显示条纹
        data: {userId:userId},
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:'',
        singleSelect : true,
        columns: [
            {
                field: 'roleName',
                title: '角色名称'
            }, {
                field: 'roleCode',
                title: '角色编码'
            }, {
                field: 'roleDesc',
                title: '角色描述'
            }],
        onLoadError: function(){  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time : 1500, icon : 2});
        }
    });
}

function queryRoleInfo(userId) {
    $.ajax({
        async: false,
        type: "get",
        url: "/rights/user/queryRoleByUser/"+userId ,
        dataType: "json",
        success: function (data) {
            roleInfoItems = data.rows;
        }
    });
}

 /**
 * 选择角色信息。
 */
function selectRole() {
    var userId = $("#hiddenUserId").val();
     var el = $("#userBody");
     $("#btn-myModal").attr("disabled",true);
     Shade.blockUI(el);
    if(selectIds == null || selectIds.length < 1) {
        $("#btn-myModal").attr("disabled",false);
        Shade.unblockUI(el);
        BootboxExt.alert("请先选择分配的角色!");
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
    $.get("/rights/user/saveRoleRelUser", { roleIds: selects,userId:userId}, function (data)
    {
        $("#btn-myModal").attr("disabled",false);
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

var userVo = new Object();
function setSearchParam() {
    userVo.userName = $("#userName").val();
    userVo.userAccount = $("#userAccount").val();
    userVo.userSex = $("#userSex").val();
    userVo.userStatus = $("#userStatus").val();
    userVo.createTimeBegin = $("#createTimeBegin").val();
    userVo.createTimeEnd = $("#createTimeEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#createTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
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
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createTimeBegin").datetimepicker("setEndDate", $("#createTimeEnd").val());
        $("#createTimeEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#createTimeBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#createTimeEnd").val("");
    });
});


