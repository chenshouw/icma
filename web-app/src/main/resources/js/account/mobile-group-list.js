var mobileGroup = new Object();

function setSearchParam() {
    mobileGroup.name = $("#name").val();
    mobileGroup.description = $("#description").val();
    mobileGroup.teller = $("#teller").val();

    mobileGroup.createTimeBegin = $("#createTimeBegin").val();
    mobileGroup.createTimeEnd = $("#createTimeEnd").val();

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


function deleteMobileGroup(itemDetailId) {
    BootboxExt.confirm("确认删除吗?", function (res) {
        if (res) {
            $.get("/account-manage/mobile-group/todelete", {id: itemDetailId}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/account-manage/mobile-group/search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            });
        }
    });
};

/**
 * 查询导出excel。
 */
$("#export").click(function () {
    $('#export').addClass('disabled');
    var el = $("#listBody");
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: mobileGroup,
        url: "/account-manage/mobile-group/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/account-manage/mobile-group/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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


