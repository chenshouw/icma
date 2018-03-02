var auditLogVo = new Object();

function setSearchParam() {
    auditLogVo.message = $("#message").val();
    auditLogVo.target = $("#target").val();
    auditLogVo.flag = $("#flag-exp").val();
    auditLogVo.createTimeBegin = $("#createTimeBegin").val();
    auditLogVo.createTimeEnd = $("#createTimeEnd").val();
}

jQuery(document).ready(function () {
    /**
     * 创建日期
     */
    $("#createTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: "month",
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
        format: "yyyy-mm-dd",
        minView: "month",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createTimeBegin").datetimepicker("setEndDate", $("#createTimeEnd").val());
        $("#createTimeEnd").datetimepicker("hide");
    });
    /**
     * 创建日期开始时间清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#createTimeBegin").val("");
    });
    /**
     * 创建日期结束时间清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#createTimeEnd").val("");
    });
});

$(function () {
    setSearchParam();

    /**
     * 审计日志查询导出excel。
     */
    $("#export").click(function () {
        $('#export').addClass('disabled');
        var el = $(".page-content");
        Shade.blockUI(el);
        $.ajax({
            type: "POST",
            data: auditLogVo,
            url: "/system-data/audit-log/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI(el);
                $('#export').removeClass('disabled');
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/system-data/audit-log/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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