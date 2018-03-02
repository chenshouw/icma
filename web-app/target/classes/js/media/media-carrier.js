
$(function() {
    $("#btnSave").click(function () {
          if (mediaTypeFrom.valid()) { //验证通过
              $("#btnSave").attr("disabled", true);
              Shade.blockUI($("#mediaCarrierBody"));
              $.post("/media/carrier/add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#mediaCarrierBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/media/carrier/search";
                        });
                    } else if (data.result == "isHas"){
                        BootboxExt.alert("介质载体类型已经存在");
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
            Shade.blockUI($("#mediaCarrierBody"));
            $.post("/media/carrier/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#mediaCarrierBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/media/carrier/search";
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



function deleteMediaCarrier(carrierType) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/media/carrier/remove", { carrierType: carrierType}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/media/carrier/search";
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
    media.carrierType = $("#carrierType").val();
    media.name = $("#name").val();
    media.inventoryFlag = $("#inventoryFlag").val();
    media.cvvFlag = $("#cvvFlag").val();
    media.cvv2Flag = $("#cvv2Flag").val();
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


