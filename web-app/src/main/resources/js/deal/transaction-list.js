var transactionVo = new Object();
function setSearchParam() {
    transactionVo.userId = $("#userId").val();
    transactionVo.orderId = $("#orderId").val();
    transactionVo.status = $("#status").val();
    transactionVo.txnTimeBegin = $("#txnTimeBegin").val();
    transactionVo.txnTimeEnd = $("#txnTimeEnd").val();
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
    var el = $("#orderForm");
    transactionVo.status=$("#statusValue").val();
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: transactionVo,
        url: "/deal/transaction/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/deal/transaction/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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