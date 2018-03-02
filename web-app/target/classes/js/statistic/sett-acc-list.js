var settAccVo = new Object();

function setSearchParam(){
    settAccVo.settDateBegin = $("#settDateBegin").val()
    settAccVo.settDateEnd = $("#settDateEnd").val();
    settAccVo.acqId = $("#acqId").val();
    settAccVo.mid = $("#mid").val();
    settAccVo.midName = $("#midName").val();
}

jQuery(document).ready(function () {
    setSearchParam();
    $("#settDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
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
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settDateBegin").datetimepicker("setEndDate", $("#settDateEnd").val());
        $("#settDateEnd").datetimepicker("hide");
    });
    /**
     * 结算开始时间清空事件
     */
    $("#settDateBeginClear").click(function () {
        $("#settDateBegin").val("");
    });
    /**
     * 结算结束时间清空事件
     */
    $("#settDateEndClear").click(function () {
        $("#settDateEnd").val("");
    });
});

$(function () {
    /**
     * 终端查询导出excel。
     */
    $("#export").click(function () {
        $('#export').addClass('disabled');
        var el = $("#listBody");
        Shade.blockUI(el);
        $.ajax({
            type: "POST",
            data: settAccVo,
            url: "/statistic/settAcc/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI(el);
                $('#export').removeClass('disabled');
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/statistic/settAcc/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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
})