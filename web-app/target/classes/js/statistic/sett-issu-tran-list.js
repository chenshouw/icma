var settIssuTran = new Object();

function setSearchParam() {
    settIssuTran.parProductType = $("#parProductType").val();
    settIssuTran.issuId = $("#issuId").val();
    settIssuTran.accType = $("#accType").val();

    settIssuTran.settDateBegin = $("#settDateBegin").val();
    settIssuTran.settDateEnd = $("#settDateEnd").val();
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
        data: settIssuTran,
        url: "/statistic/settIssuTran/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').attr('disabled', false);
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/statistic/settIssuTran/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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

