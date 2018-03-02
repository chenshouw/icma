var mobilePhone = new Object();

function setSearchParam() {
    mobilePhone.name = $("#name").val();
    mobilePhone.identifyId = $("#identifyId").val();
    mobilePhone.sex = $("#sex").val();
    mobilePhone.status = $("#status").val();

    mobilePhone.center = $("#center").val();
    mobilePhone.department = $("#department").val();
    mobilePhone.position = $("#position").val();
    mobilePhone.teller = $("#teller").val();

    mobilePhone.phoneNum = $("#phoneNum").val();
    mobilePhone.operators = $("#operators").val();
    mobilePhone.createTimeBegin = $("#createTimeBegin").val();
    mobilePhone.createTimeEnd = $("#createTimeEnd").val();

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


function deleteMobilePhone(itemDetailId) {
    BootboxExt.confirm("确认删除吗?", function (res) {
        if (res) {
            $.get("/account-manage/mobile-phone/todelete", {id: itemDetailId}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/account-manage/mobile-phone/search";
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
        data: mobilePhone,
        url: "/account-manage/mobile-phone/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/account-manage/mobile-phone/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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


