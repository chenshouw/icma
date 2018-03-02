function deleteMethod(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/basic-data/card-img/remove", {id: id}, function (data) {
                if (data.result == true) {
                    BootboxExt.confirm("删除成功", function (res) {
                        location.href = "/basic-data/card-img/search";
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

$(function () {
    $("#btnSave").click(function () {
        var fileValue = $("#picture").val();
        var describe = $("#describe").val();
        var imgType = $("#imgType").val();
        var memo = $("#memo").val();
        var productType = $("#productType").val();
        var status = $("#status").val();
        if (fileValue == null || fileValue == "") {
            BootboxExt.alert("请先选择文件");
            return false;
        } else if (describe == null || describe == "") {
            BootboxExt.alert("请输入描述");
            return false;
        } else if (imgType == null || imgType == "") {
            BootboxExt.alert("请选择图片类型");
            return false;
        } else if (productType == null || productType == "") {
            BootboxExt.alert("请选择卡类型");
            return false;
        } else if (status == null || status == "") {
            BootboxExt.alert("请选择卡面状态");
            return false;
        } else if (memo != "" && memo.length > 200) {
            BootboxExt.alert("备注字数请控制在200以内");
        } else { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#cardImgBody"));
            $.ajax({
                async: false,
                url: "/basic-data/card-img/add",
                type: 'POST',
                data: new FormData($("#addFrom")[0]),
                processData: false,
                contentType: false,
                success: function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#cardImgBody"));
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/basic-data/card-img/search";
                        });
                    } else if(data.mess == "该产品子类型已存在logo图片"){

                        BootboxExt.alert("该产品子类型已存在logo图片", function (res) {
                            window.location.reload();
                        });
                    } else {
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
        var describe = $("#describe").val();
        var imgType = $("#imgType").val();
        var memo = $("#memo").val();
        var status = $("#status").val();
        if (describe == null || describe == "") {
            BootboxExt.alert("请输入描述");
            return false;
        } else if (imgType == null || imgType == "") {
            BootboxExt.alert("请选择图片类型");
            return false;
        } else if (status == null || status == "") {
            BootboxExt.alert("请选择卡面状态");
            return false;
        } else if (memo != "" && memo.length > 200) {
            BootboxExt.alert("备注字数请控制在200以内");
        } else { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#cardImgBody"));
            $.post("/basic-data/card-img/update",
                $("#updateFrom").serialize(),
                function (data) {
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            $("#btnUpdate").attr("disabled", false);
                            Shade.unblockUI($("#cardImgBody"));
                            location.href = "/basic-data/card-img/search";
                        });
                    } else if(data.mess == "该产品子类型已存在logo图片"){

                        BootboxExt.alert("该产品子类型已存在logo图片", function (res) {
                            window.location.reload();
                        });
                    } else  {
                        BootboxExt.alert("修改失败", function (res) {
                            window.location.reload();
                        });
                    }
                }, "json");
        }

    });
});

var cardImgVo = new Object();
function setSearchParam() {
    cardImgVo.status = $("#status").val();
    cardImgVo.createTimeBegin = $("#createTimeBegin").val();
    cardImgVo.createTimeEnd = $("#createTimeEnd").val();
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
