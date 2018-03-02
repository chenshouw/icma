var flowRuleVo = new Object();
function setSearchParam() {
    flowRuleVo.operation = $("#operation").val();
    flowRuleVo.preStatus = $("#preStatus").val();
    flowRuleVo.postStatus = $("#postStatus").val();
    flowRuleVo.memo = $("#memo").val();
    flowRuleVo.createTimeBegin = $("#createTimeBegin").val();
    flowRuleVo.createTimeEnd = $("#createTimeEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#createTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
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
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
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
 * 删除操作。
 * @param id 主键
 */
function deleteFlowRule(id) {
    BootboxExt.confirm("确认删除吗", function (res) {
        if (res) {
            $.get("/system-data/flow-rule/remove", {id: id}, function (data) {
                if (data == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/system-data/flow-rule/search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

/**
 * 查询导出excel。
 */
$("#export").click(function () {
    $('#export').addClass('disabled');
    var el = $("#flowRuleBody");
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: flowRuleVo,
        url: "/system-data/flow-rule/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/system-data/flow-rule/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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