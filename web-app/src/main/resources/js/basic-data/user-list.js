var userVo = new Object();
function setSearchParam() {
    userVo.userId = $("#userId").val();
    userVo.sysUserId = $("#sysUserId").val();
    userVo.openId = $("#openId").val();
    userVo.bingStatus = $("#bingStatus").val();
    userVo.createTimeBegin = $("#createTimeBegin").val();
    userVo.createTimeEnd = $("#createTimeEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#createTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: false
    }).on('changeDate', function (ev) {
        $("#createTimeEnd").datetimepicker("setStartDate", $("#createTimeBegin").val());
        $("#createTimeBegin").datetimepicker("hide");
    });
    $("#createTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: false
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
/**
 * 订单查询导出excel。
 */
$("#export").click(function () {
    $('#export').addClass('disabled');
    var el = $("#orderForm");
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: userVo,
        url: "/basic-data/user/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/basic-data/user/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
                window.location.href = loadUrl;
            } else {
                BootboxExt.alert(data.msg, function () {
                });
            }
        },
        error: function () {
            BootboxExt.alert("网络异常，请联系维护人员", function () {
            });
        }
    });
});