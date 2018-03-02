

$(function() {
    $("#btnSave").click(function () {
        if (mchInfoForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#mchGroupBody"));
            $.post("/mch/group/add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#mchGroupBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/mch/group/search";
                        });
                    }else if (data.result == "isHas") {
                        BootboxExt.alert("此商户组编号已存在", function (res) {
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
            Shade.blockUI($("#mchGroupBody"));
            $.post("/mch/group/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#mchGroupBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/mch/group/search";
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



function deleteMMchGroup(mchGrp) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/mch/group/remove", { mchGrp: mchGrp}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/mch/group/search";
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
var mMchGroup = new Object();
function setSearchParam() {
    mMchGroup.mchGrp = $("#mchGrp").val();
    mMchGroup.mchName = $("#mchName").val();
    mMchGroup.modiDateBegin = $("#modiDateBegin").val();
    mMchGroup.modiDateEnd = $("#modiDateEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#modiDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modiDateEnd").datetimepicker("setStartDate", $("#modiDateBegin").val());
        $("#modiDateBegin").datetimepicker("hide");
    });
    $("#modiDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createBegin").datetimepicker("setEndDate", $("#modiDateEnd").val());
        $("#modiDateEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#modiDateBeginClear").click(function () {
        $("#modiDateBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#modiDateEndClear").click(function () {
        $("#modiDateEnd").val("");
    });
});
