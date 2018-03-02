var systemConfig = new Object();

function setSearchParam() {
    systemConfig.name = $("#name").val();
    systemConfig.code = $("#code").val();
    systemConfig.value = $("#").val();
    systemConfig.createBy = $("#createBy").val();
}

jQuery(document).ready(function () {
    setSearchParam();
});
/**
 * 系统参数查询导出excel。
 */
$("#export").click(function () {
    $('#export').addClass('disabled');
    var el = $(".page-content");
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: systemConfig,
        url: "/system-data/system-config/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/system-data/system-config/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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

function deleteSc(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/system-data/system-config/delete", {id: id}, function (data) {
                if (data.flag == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/system-data/system-config/search";
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

function toUpdate(id) {
    Shade.blockUI($('body'));
    window.location.href = "/system-data/system-config/to-update?id=" + id;
}

function toAdd() {
    Shade.blockUI($('body'));
    window.location.href = "/system-data/system-config/to-add";
}