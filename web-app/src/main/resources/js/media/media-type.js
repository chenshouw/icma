

$(function() {
    $("#btnSave").click(function () {
          if (mediaTypeFrom.valid()) { //验证通过
              $("#btnSave").attr("disabled", true);
              Shade.blockUI($("#mediaTypeBody"));
                $.post("/media/type/add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#mediaTypeBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/media/type/search";
                        });
                    } else if (data.result == "isHas"){
                        BootboxExt.alert("介质类型已经存在");
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }

                });
          }
    })
    $("#btnUpdate").click(function () {
        if (mediaTypeFrom.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#mediaTypeBody"));
            $.post("/media/type/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#mediaTypeBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/media/type/search";
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



function deleteMediaType(mediaType) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/media/type/remove", { mediaType: mediaType}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/media/type/search";
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
var media = new Object();
function setSearchParam() {
    media.mediaType = $("#mediaType").val();
    media.carrierType = $("#carrierType").val();
    media.chargeFlag = $("#chargeFlag").val();
    media.tradingFlag = $("#tradingFlag").val();
    media.lifeCycleFlag = $("#lifeCycleFlag").val();
    media.ownerFlag = $("#ownerFlag").val();
    media.ownerChangeFlag = $("#ownerChangeFlag").val();
    media.withAcc = $("#withAcc").val();
    media.flag = $("#flag").val();
    media.name = $("#name").val();
    media.modifyTimeBegin = $("#modifyTimeBegin").val();
    media.modifyTimeEnd = $("#modifyTimeEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#modifyTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
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
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createBegin").datetimepicker("setEndDate", $("#modifyTimeEnd").val());
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





