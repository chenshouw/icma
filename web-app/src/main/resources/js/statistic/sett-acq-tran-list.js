var settAcqTran = new Object();

function setSearchParam() {
    settAcqTran.productType = $("#parProductType").val();
    settAcqTran.channelId = $("#channelId").val();
    settAcqTran.acqId = $("#acqId").val();
    settAcqTran.accType = $("#accType").val();
    settAcqTran.orgCode = $("#orgCode").val();

    settAcqTran.settDateBegin = $("#settDateBegin").val();
    settAcqTran.settDateEnd = $("#settDateEnd").val();
}

jQuery(document).ready(function () {
    setSearchParam();
    $("#settDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settDateEnd").datetimepicker("setStartDate", $("#settDateBegin").val());
        $("#settDateBegin").datetimepicker("hide");
    });
    $("#settDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settDateBegin").datetimepicker("setEndDate", $("#settDateEnd").val());
        $("#settDateEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#settDateBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#settDateEnd").val("");
    });
});

/**
 * 查询导出excel。
 */
$("#export").click(function () {
    $('#export').attr('disabled', true);
    var el = $("#listBody");
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: settAcqTran,
        url: "/statistic/settAccTran/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').attr('disabled', false);
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/statistic/settAccTran/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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

