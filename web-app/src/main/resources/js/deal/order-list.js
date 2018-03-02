var orderVo = new Object();
function setSearchParam() {
    orderVo.userId = $("#userId").val();
    orderVo.orderId = $("#orderId").val();
    orderVo.status = $("#status").val();
    orderVo.payGateWayOrderNo = $("#payGateWayOrderNo").val();
    orderVo.thirdPartyCode = $("#thirdPartyCode").val();
    orderVo.txnTimeBegin = $("#txnTimeBegin").val();
    orderVo.txnTimeEnd = $("#txnTimeEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#txnTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnTimeEnd").datetimepicker("setStartDate", $("#txnTimeBegin").val());
        $("#txnTimeBegin").datetimepicker("hide");
    });
    $("#txnTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnTimeBegin").datetimepicker("setEndDate", $("#txnTimeEnd").val());
        $("#txnTimeEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#txnTimeBeginClear").click(function () {
        $("#txnTimeBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#txnTimeEndClear").click(function () {
        $("#txnTimeEnd").val("");
    });
});
/**
 * 订单查询导出excel。
 */
$("#export").click(function () {
    $('#export').addClass('disabled');
    var el = $("#listBody");
    orderVo.status = $("#statusValue").val();
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: orderVo,
        url: "/deal/order/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/deal/order/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
                window.location.href = loadUrl;
            } else {
                BootboxExt.alert(data.msg, function () {
                });
            }
        },
        error: function () {
            Shade.unblockUI(el);
            BootboxExt.alert("网络异常，请联系维护人员", function () {
            });
        }
    });
});