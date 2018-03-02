$(function() {
    $("#btnSave").click(function () {
        if (tidGroupForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#tidGroupBody"));
            $.post("/rights/tidGroup/add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#tidGroupBody"));
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/rights/tidGroup/search";
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
        if (tidGroupForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#tidGroupBody"));
            $.post("/rights/tidGroup/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#tidGroupBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/rights/tidGroup/search";
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


function deleteTidGroup(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/rights/tidGroup/remove", { id: id}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/rights/tidGroup/search";
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
var tidGroupVo = new Object();
function setSearchParam() {
    tidGroupVo.tidGroupName = $("#tidGroupName").val();
    tidGroupVo.tidGroupStatus = $("#tidGroupStatus").val();
    tidGroupVo.sysId = $("#sysId").val();
    tidGroupVo.merchantId = $("#merchantId").val();
    tidGroupVo.createTimeBegin = $("#createTimeBegin").val();
    tidGroupVo.craeteTimeEnd = $("#craeteTimeEnd").val();
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
