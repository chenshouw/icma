$(function () {
    $("#btnSave").click(function () {
        if (sysAppForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#sysAppBody"));
            $.post("/rights/sys-app/add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#sysAppBody"));
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/rights/sys-app/search";
                        });
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                });
        }
    });

    $("#btnUpdate").click(function () {
        if (sysAppForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#sysAppBody"));
            $.post("/rights/sys-app/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#sysAppBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/rights/sys-app/search";
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
 * 删除事件。
 * @param id
 */
function deleteSysApp(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/rights/sys-app/remove", {id: id}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/rights/sys-app/search";
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
 * 新增跳转
 */
function addSysApp() {
    Shade.blockUI($("body"));
    window.location.href = "/rights/sys-app/to-add";
}

/**
 * 跳转到修改页面
 * @param id
 */
function updateSysApp(id) {
    Shade.blockUI($("body"));
    window.location.href = "/rights/sys-app/to-update?id=" + id;
}


var sysAppVo = new Object();

function setSearchParam() {
    sysAppVo.name = $("#name").val();
    sysAppVo.status = $("#status").val();
    sysAppVo.code = $("#code").val();
    sysAppVo.createTimeBegin = $("#createTimeBegin").val();
    sysAppVo.craeteTimeEnd = $("#craeteTimeEnd").val();
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
        $("#createBegin").datetimepicker("setEndDate", $("#createTimeEnd").val());
        $("#createTimeEnd").datetimepicker("hide");
    });
    /**
     * 创建日期清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#createTimeBegin").val("");
    });
    /**
     * 创建日期清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#createTimeEnd").val("");
    });
});