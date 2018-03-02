var addForm = $('#shopGrpDefForm');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        shopGrp: {
            required: true
        },
        shopId: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    success: function (label) {
        label.closest('.form-group').removeClass('has-error');
    }
});


$(function () {
    $("#btnSave").click(function () {
        if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#shopGrpDefBody"));
            $.post("/shop/shopGrpDef/add",
                $("#shopGrpDefForm").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#shopGrpDefBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/shop/shopGrpDef/search";
                        });
                    } else if (data.result == "isHas") {
                        BootboxExt.alert("此数据已重复（门店分组和门店编号不能同时重复）", function (res) {
                            return;
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
        if (addForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#shopGrpDefBody"));
            $.post("/shop/shopGrpDef/update",
                $("#shopGrpDefForm").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#shopGrpDefBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/shop/shopGrpDef/search";
                        });
                    }else if (data.result == "isHas") {
                        BootboxExt.alert("此数据已重复（门店分组和门店编号不能同时重复）", function (res) {
                            return;
                        });
                    }  else {
                        BootboxExt.alert("修改失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });
});

//检查门店分组是否存在
function shopGrpIsExit(){
    var shopGrp = $("#shopGrp").val();
    if (shopGrp != null && shopGrp != "") {
        $.get("/shop/shopGrpDef/findshopGropExit", {shopGrp: shopGrp}, function (data) {
            if (data.grpName == "noExit") {
                BootboxExt.alert("此门店分组不存在", function (res) {
                    $("#shopGrp").val("");
                    $("#grpName").val("");
                });
            } else if(data.grpName == "noCurrentInst"){
                BootboxExt.alert("此门店分组不属于当前机构", function (res) {
                    $("#shopGrp").val("");
                    $("#grpName").val("");
                });
            } else {
                $("#grpName").val(data.grpName);
            }
        }, "json");
    }
}

//检查门店编号是否存在
function shopIdIsExit(){
    var shopId = $("#shopId").val();
    if (shopId != null && shopId != "") {
        $.get("/shop/shopGrpDef/findshopInfoExit", {shopId:shopId}, function (data) {
            if (data.cname == "noExit") {
                BootboxExt.alert("此门店编号不存在", function () {
                    $("#shopId").val("");
                    $("#cName").val("");
                });
            }else if(data.cname == "noCurrentInst"){
                BootboxExt.alert("此门店编号不属于当前机构", function () {
                    $("#shopId").val("");
                    $("#cName").val("");
                });
            } else {
                $("#cName").val(data.cname);
            }
        }, "json");
    }
}


var selectionShopIds = [];  //保存选中门店编号ids
var selectionShopNames = [];  //保存选中门店名称names


/**
 * 初始化表格数据。
 */
function initShopInfoTables() {
    var shopGrp = $("#shopGrp").val();
    if (shopGrp == null || shopGrp == "") {
        BootboxExt.alert("请先选择门店分组信息");
        return;
    } else {
        $("#shopInfoId").empty();
        $("#shopName").empty();
        $("#ywyId").empty();

        $("#shopInfoModel").modal("show");
        var shopIds = $("#shopIds").val();
        var shopNames = $("#shopNames").val();
        if (shopIds != null && shopIds != ''){
            selectionShopIds = shopIds.split(",");
            selectionShopNames = shopNames.split(",");
        }

        //先销毁表格
        $('#shop_info_tables').bootstrapTable('destroy');
        //初始化表格,动态从服务器加载数据
        var table = $("#shop_info_tables").bootstrapTable({
            method: "GET",  //使用get请求到服务器获取数据
            url: '/shop/shopGrpDef/search-shopInfo-list', //获取数据的Servlet地址
            striped: true,  //表格显示条纹
            showRefresh: true,  //显示刷新按钮
            pagination: true,                   //是否显示分页（*）
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            queryParamsType: '',
            queryParams: queryShopInfoParams,
            singleSelect: false,
            uniqueId: "shopId",
            responseHandler:responseShopInfoHandler,
            columns: [
                {
                    field: 'checked',
                    checkbox: true
                },
                {
                    field: 'shopId',
                    title: '门店代码'
                }, {
                    field: 'cname',
                    title: '门店名称'
                }, {
                    field: 'acqName',
                    title: '门店所属受理机构'
                }, {
                    field: 'ywyId',
                    title: '业务员'
                }, {
                    field: 'brCname',
                    title: '中文简称'
                }, {
                    field: 'linkMan',
                    title: '联系人'
                }, {
                    field: 'phone',
                    title: '联系电话'
                }, {
                    field: 'areaCode',
                    title: '地区编码'
                }, {
                    field: 'status',
                    title: '开通标志'
                }, {
                    field: 'modiDate',
                    title: '修改日期'
                }, {
                    field: 'teller',
                    title: '操作员'
                }
            ],
            formatLoadingMessage: function () {
                return "请稍等，正在加载中...";
            },
            formatNoMatches: function () {  //没有匹配的结果
                return '无符合条件的记录';
            },
            onLoadError: function (data) {
                $('#shop_info_tables').bootstrapTable('removeAll');
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
                return row.shopId;
            });
            var texts = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
                return (row.shopId +'_'+ row.cname);
            });
            func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
            selectionShopIds = _[func](selectionShopIds, ids);
            selectionShopNames = _[func](selectionShopNames, texts);
        });

    }



}

//表格分页之前处理多选框数据
function responseShopInfoHandler(res) {
    $.each(res.rows, function (i, row) {
        row.checkStatus = $.inArray(row.shopId, selectionShopIds) != -1;  //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });
    return res;
}

function queryShopInfoParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        shopInfoId: $("#shopInfoId").val(),
        shopName: $("#shopName").val(),
        ywyId: $("#ywyId").val(),
        shopGrpId: $("#shopGrp").val(),
        shopIds:$("#shopIds").val(),
        flag : $("#flag").val(),
        acqId:$("#acqId").val()
    };
    return temp;
}

var selectionShopIds = [];  //保存选中门店信息ids
var selectionShopNames = [];  //保存选中门店名称
$("#shopInfoBtn").click(function () {
    if (selectionShopIds.length <= 0) {
        BootboxExt.alert("请选择门店信息");
        return;
    }
    $('#shopInfoModel').modal('hide');
    var ids = "";
    var texts = "";
    for(var i = 0;i <selectionShopIds.length ; i++){
        ids += selectionShopIds[i] + ",";
        texts += selectionShopNames[i] + ",";
    }

    $("#shopIds").val(ids.substring(0, ids.length - 1));
    $("#shopNames").val(texts.substring(0, texts.length - 1));

});

//重置门店分组查询的信息
function cleanShopInfoQueary(){
    $("#shopInfoId").val("");
    $("#shopName").val("");
    $("#ywyId").val("");
    initShopInfoTables();
}

//初始化门店分组表格信息
/**
 * 初始化表格数据。
 */
function initShopGrpTables() {
    $("#shopGrpId").empty();
    $("#shopGrpName").empty();
    //先销毁表格
    $('#shop_grp_tables').bootstrapTable('destroy');
    selectionShopIds = [];
    selectionShopNames = [];
    //初始化表格,动态从服务器加载数据
    $("#shop_grp_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/shop/shopGrpDef/search-shopGrp-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        queryParams: queryShopGrpParams,
        singleSelect: true,
        uniqueId: "shopGrp",
        columns: [
            {
                field: 'checked',
                checkbox: true
            },
            {
                field: 'shopGrp',
                title: '门店分组代码'
            }, {
                field: 'grpName',
                title: '门店分组名称'
            }, {
                field: 'acqId',
                title: '门店分组所属受理机构ID'
            }, {
                field: 'acqName',
                title: '门店分组所属受理机构'
            }
        ],
        onLoadError: function () {  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
        }
    });
    $('#shop_grp_tables').bootstrapTable('hideColumn', 'acqId');
}

function queryShopGrpParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        shopGrpId: $("#shopGrpId").val(),
        shopGrpName: $("#shopGrpName").val(),
        shopGrp:$("#shopGrp").val()
    };
    return temp;
}

$("#shopGrpBtn").click(function () {
    var selectInfo = $("#shop_grp_tables").bootstrapTable('getSelections')[0];
    if(selectInfo == null ||  selectInfo.length < 1) {
        BootboxExt.alert("请选择门店分组信息");
        return;
    }
    $('#shopGrpModal').modal('hide');
    $("#shopGrp").val(selectInfo == undefined ? "" : selectInfo.shopGrp);
    $("#grpName").val(selectInfo == undefined ? "" : selectInfo.grpName);
    $("#acqId").val(selectInfo == undefined ? "" : selectInfo.acqId);

    $("#shopIds").val("");
    $("#shopNames").val("");
});

//重置门店分组查询的信息
function cleanShopGrpQueary(){
    $("#shopGrpId").val("");
    $("#shopGrpName").val("");
    initShopGrpTables();
}

var inputs = $("input");
for(var i = 0; i < inputs.length; i++) {
    inputs[i].onmouseover = function () {
        this.title = this.value;
    }
}