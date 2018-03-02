$(function () {
    $("#btnSave").click(function () {
        if (mchInfoForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#mchInfoBody"));
            $.post("/mch/info/add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#mchInfoBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/mch/info/search";
                        });
                    } else if (data.result == "isHas") {
                        BootboxExt.alert("此商户号已存在", function (res) {
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
        if (mchInfoForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#mchInfoBody"));
            $.post("/mch/info/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#mchInfoBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/mch/info/search";
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
 * 新增。
 */
function toAdd() {
    Shade.blockUI($('body'));
    window.location.href = "/mch/info/to-add";
}

/**
 * 修改。
 */
function toUpdate(mid) {
    Shade.blockUI($('body'));
    window.location.href = "/mch/info/to-update?mid=" + mid;
}

/**
 * 删除。
 * @param mid
 */
function deleteMchInfo(mid) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/mch/info/remove", {mid: mid}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/mch/info/search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

/**
 * 详情。
 * @param mid
 */
function viewMchInfo(mid) {
    Shade.blockUI($('body'));
    window.location.href = "/mch/info/view?mid=" + mid;
}

var mchInfoVo = new Object();

function setSearchParam() {
    mchInfoVo.mid = $("#mid").val();
    mchInfoVo.midName = $("#midName").val();
    mchInfoVo.mchGrp = $("#mchGrp").val();
    mchInfoVo.mchAddr = $("#mchAddr").val();
    mchInfoVo.modifyTimeBegin = $("#modifyTimeBegin").val();
    mchInfoVo.modifyTimeEnd = $("#modifyTimeEnd").val();
}

jQuery(document).ready(function () {
    setSearchParam();
    $("#modifyTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modifyTimeEnd").datetimepicker("setStartDate", $("#modifyTimeBegin").val());
        $("#modifyTimeBegin").datetimepicker("hide");
    });
    $("#modifyTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createBegin").datetimepicker("setEndDate", $("#modifyTimeEnd").val() + 1);
        $("#modifyTimeEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#modifyTimeBeginClear").click(function () {
        $("#modifyTimeBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#modifyTimeEndClear").click(function () {
        $("#modifyTimeEnd").val("");
    });
});


/**
 * 初始化表格数据。
 */
function initTables() {
    //先销毁表格
    $('#item_info_tables').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#item_info_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/mch/group/search-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        singleSelect: true,
        uniqueId: "mchGrp",
        columns: [
            {
                checkbox: true
            },
            {
                field: 'mchGrp',
                title: '商户分组编号'
            }, {
                field: 'groupName',
                title: '商户分组名称'
            }],
        onLoadError: function () {  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
        }
    });
}

/**
 * 选择商户信息。
 */
function selectItem() {
    var selectInfo = $("#item_info_tables").bootstrapTable('getSelections')[0];
    $('#myModal').modal('hide');
    $("#mchGrp").val(selectInfo == undefined ? "" : selectInfo.mchGrp);
    $("#groupName").val(selectInfo == undefined ? "" : selectInfo.groupName);
}

function clearMchInfoTable() {
    $("#groupName").val("");
    $("#mchGrp").val("");
}

