$(function () {
    $("#btnSave").click(function () {
        var fileValue = $("#picture").val();
        var merchantId = $("#mchInfoId").val();
        if (fileValue == null || fileValue == "") {
            BootboxExt.alert("请先选择文件");
            return false;
        }else if (merchantId == null || merchantId == ""){
            BootboxExt.alert("请选择商户信息");
            return false;
        }
        else { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#mchInfoPicBody"));
            $.ajax({
                async: false,
                url: "/merchant/info/pic/add",
                type: 'POST',
                data: new FormData($("#addFrom")[0]),
                processData: false,
                contentType: false,
                success: function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#mchInfoPicBody"));
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/merchant/info/pic/search";
                        });
                    }  else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                },
                error: function (result) {
                    BootboxExt.alert("文件解析失败");
                }
            });
        }
    });

    $("#btnUpdate").click(function () {
        var mchInfoId = $("#mchInfoId").val();
       if (mchInfoId == null || mchInfoId == ""){
            BootboxExt.alert("请选择商户信息");
            return false;
        } else { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#mchInfoPicBody"));
            $.post("/merchant/info/pic/update",
                $("#updateFrom").serialize(),
                function (data) {
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            $("#btnUpdate").attr("disabled", false);
                            Shade.unblockUI($("#mchInfoPicBody"));
                            location.href = "/merchant/info/pic/search";
                        });
                    }else  {
                        BootboxExt.alert("修改失败", function (res) {
                            window.location.reload();
                        });
                    }
                }, "json");
        }

    });
});



function deleteMethod(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/merchant/info/pic/remove", {id: id}, function (data) {
                if (data.result == true) {
                    BootboxExt.confirm("删除成功", function (res) {
                        location.href = "/merchant/info/pic/search";
                    });
                } else {
                    BootboxExt.confirm("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}





var mchInfoPicVo = new Object();
function setSearchParam() {
    mchInfoPicVo.mchInfoId = $("#mchInfoId").val();
    mchInfoPicVo.createBy = $("#createBy").val();
    mchInfoPicVo.createTimeBegin = $("#createTimeBegin").val();
    mchInfoPicVo.createTimeEnd = $("#createTimeEnd").val();
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
