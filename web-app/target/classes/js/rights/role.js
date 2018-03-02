$(function() {
    $("#btnSave").click(function () {
        if (roleForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#roleBody"));
            $.post("/rights/role/add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#roleBody"));
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/rights/role/search";
                        });
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                });
        }
    })
    $("#btnUpdate").click(function () {
        if (roleForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#roleBody"));
            $.post("/rights/role/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#roleBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/rights/role/search";
                        });
                    } else {
                        BootboxExt.alert("修改失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });
    $("#tree-modal").on("hidden.bs.modal",function(e){
        $(this).removeData();
        $.jstree.reference("#tree_cl").destroy(false);
    });
    $("#view-modal").on("hidden.bs.modal",function(e){
        $(this).removeData();
        $.jstree.reference("#view_tree").destroy(false);
    });
    var rightArr = "";
    $("#tree-btnSave").click(function () {
        $("#tree-btnSave").attr("disabled", true);
        Shade.blockUI($("#tree-modal"));
        rightStrArray = getCheckboxTreeSelNode();
        for (var i = 0; i < rightStrArray.length; i++){
            if(i > 0){
                rightArr += ",";
            }
            rightArr += rightStrArray[i];
        }

        var roleId = $("#roleId").val();
        $.get("/rights/right-role-relation/add", { rightArr:rightArr, roleId: roleId},
            function(data){  //此处是回调函数 接收从后台传回的值
                $("#tree-btnSave").attr("disabled", false);
               Shade.unblockUI($("#tree-modal"));
                if(data.result == true){
                    BootboxExt.alert("分配成功", function (res) {
                        location.href = "/rights/role/search";
                    });
                }
            }, "json");
    });
});

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
    if ($("#merchantId").val() != (selectInfo == undefined ? "" : selectInfo.mid)) {
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
    $("#merchantId").val("");
    $("#merchantName").val("");
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

function treeRole(roleId,sysId){
    $("#roleId").val(roleId);
    var checkId = new Array();
    $.get("/rights/right-role-relation/getRoleRelRight", {roleId: roleId},
        function(data){  //此处是回调函数 接收从后台传回的值
            var dataArr = data.result.split(",");
            for (var j = 0; j < dataArr.length; j++) {
                checkId.push(dataArr[j]);
            }
        }, "json");
    var menuTree = $("#tree_cl").bind("loaded.jstree",function(e,data){
        $("#tree_cl").jstree("open_all");
        $("#tree_cl").find("li").each(function(){
            if(checkId == null){
                // $("#tree_cl").jstree("check_node",jQuery(this));
            }else {
                for(var i=0;i<checkId.length;i++){
                    var currentNode = $('#tree_cl').jstree("get_node", checkId[i]);
                    if(jQuery(this).attr("id") == checkId[i] && $('#tree_cl').jstree("is_leaf", currentNode)){
                        jQuery("#tree_cl").jstree("check_node",jQuery(this));
                    }
                }
            }
        });
    }).jstree({
        "core" : {
            "data":{
                "url":'/rights/right/getRightTree/'+sysId,
                "dataType":"json",
                "cache":false
            },
            "attr":{
                "class":"jstree-checked"
            }
        },
        "types" : {
            "default" : {
                "icon" : "glyphicon glyphicon-flash"
            },
            "file" : {
                "icon" : "glyphicon glyphicon-ok"
            }
        },
        "checkbox" : {
            "keep_selected_style" : false,
            "real_checkboxes" : true,
            // "three_state": false,
            "tie_selection":true,
        },
        "plugins" : ["dnd", "search",
            "types", "wholerow","checkbox"
        ]
    });
}

function getCheckboxTreeSelNode(){
    var ids = Array();
    $("#tree_cl").find("li").each(function(){
        var liid = $(this).attr("id");
        var currentNode = $('#tree_cl').jstree("get_node", liid);
        if($("#tree_cl").jstree("is_undetermined",currentNode)){
            ids.push(liid);
        }
    });
    var nodes = $("#tree_cl").jstree("get_checked");
    for(var i=0, checkedLength = nodes.length; i<checkedLength;i++){
        ids.push(nodes[i]);
    }
    return ids;
}

// function getCheckboxTreeSelNode(){
//
//     var ids = Array();
//     $("#tree_cl").find(".jstree-undetermined").each(function(){
//         debugger;
//         ids.push($(this).attr("id"));
//     });
//
//
//     //var checkedNodes = $('#tree_cl').jstree("get_all_checked");
//     var nodes = $("#tree_cl").jstree("get_checked");
//     for(var i=0, checkedLength = nodes.length; i<checkedLength;i++){
//         ids.push(nodes[i]);
//     }
//     return ids;
// }


function viewRole(roleId) {
    $("#view_tree").jstree({
        "plugins" : ["types","themes", "wholerow"],
        "core" : {
            "themes" : { "stripes" : true },  // 条纹主题
            "animation": 0,
            'data' : {
                'url' : function (node) {
                    return '/rights/right/viewRightTree/'+roleId;
                }
            }
        },
        "types" : {
            "default" : {
                "icon" : "glyphicon glyphicon-flash"
            },
            "file" : {
                "icon" : "glyphicon glyphicon-ok"
            }
        }
    }).bind("loaded.jstree", function (e, data) {
        $("#viewTree p").remove();
        if(data.instance._cnt==0){
            //BootboxExt.alert("该角色没有任何权限");
            $("#viewTree").append("<p>该角色没有任何权限</p>");
        }
        data.instance.open_all();

    });
}

function deleteRole(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/rights/role/remove", { id: id}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/rights/role/search";
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
var roleVo = new Object();
function setSearchParam() {
    roleVo.roleName = $("#roleName").val();
    roleVo.roleStatus = $("#roleStatus").val();
    roleVo.sysId = $("#sysId").val();
    roleVo.merchantId = $("#merchantId").val();
    roleVo.createTimeBegin = $("#createTimeBegin").val();
    roleVo.craeteTimeEnd = $("#craeteTimeEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#createTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
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
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createBegin").datetimepicker("setEndDate", $("#createTimeEnd").val());
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
