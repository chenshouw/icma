var histTransVo = new Object();

function setSearchParam() {
    histTransVo.empNo = $("#empNo").val();
    histTransVo.empName = $("#empName").val();
    histTransVo.phone = $("#phone").val();
    histTransVo.sysOrderId = $("#sysOrderId").val();
    histTransVo.pan = $("#pan").val();
    histTransVo.txnAmtMin = $("#txnAmtMin").val();
    histTransVo.txnAmtMax = $("#txnAmtMax").val();
    histTransVo.txnDateBegin = $("#txnDateBegin").val();
    histTransVo.txnDateEnd = $("#txnDateEnd").val();
    histTransVo.tranStatus = $("#tranStatus").val();
    histTransVo.settStatus = $("#settStatus").val();
    //交易类型
    histTransVo.txnId = $("#txnId").val();
}

$(function () {
    setSearchParam();

    /**
     * 交易日期
     */
    $("#txnDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: "month",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnDateEnd").datetimepicker("setStartDate", $("#txnDateBegin").val());
        $("#txnDateBegin").datetimepicker("hide");
    });
    $("#txnDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: "month",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnDateBegin").datetimepicker("setEndDate", $("#txnDateEnd").val());
        $("#txnDateEnd").datetimepicker("hide");
    });
    /**
     * 交易日期开始时间清空事件
     */
    $("#txnDateBeginClear").click(function () {
        $("#txnDateBegin").val("");
    });
    /**
     * 交易日期结束时间清空事件
     */
    $("#txnDateEndClear").click(function () {
        $("#txnDateEnd").val("");
    });
})

$(function () {
    /**
     * 终端查询导出excel。
     */
    $("#export").click(function () {
        setSearchParam();
        $('#export').addClass('disabled');
        var el = $("#cardPresentDetailForm");
        Shade.blockUI($("#listBody"));
        $.ajax({
            type: "POST",
            data: histTransVo,
            url: "/welfare/trans/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI($("#listBody"));
                $('#export').removeClass('disabled');
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/welfare/trans/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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
})

