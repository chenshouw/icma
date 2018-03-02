$(function () {
        $("#btnSave").click(function () {
        if (faceValueForm.valid()) { //验证通过
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#faceValueBody"));
            $.post("/basic-data/face-value/add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled",false);
                    Shade.unblockUI($("#faceValueBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/basic-data/face-value/search";
                        });
                    }else if (data.result == "isHas") {
                        BootboxExt.alert("该面值已存在", function (res) {
                            return;
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
        if (faceValueForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#faceValueBody"));
            $.post("/basic-data/face-value/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled",false);
                    Shade.unblockUI($("#faceValueBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/basic-data/face-value/search";
                        });
                    }else if (data.result == "isHas") {
                        BootboxExt.alert("该面值已存在", function (res) {
                            return;
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

function deleteFaceValue(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/basic-data/face-value/remove", { id: id}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/basic-data/face-value/search";
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


var faceValueVo = new Object();
function setSearchParam() {
    faceValueVo.status = $("#status").val();
    faceValueVo.status = $("#name").val();
    faceValueVo.createTimeBegin = $("#createTimeBegin").val();
    faceValueVo.createTimeEnd = $("#createTimeEnd").val();
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
