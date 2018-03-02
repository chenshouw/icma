$(function () {
    $("#goBack").click(function () {
        window.location.href = "/sell-card/batch-open-card/search";
    });
});
/**
 * 系统参数查询导出excel。
 */
$("#export").click(function () {
    $('#export').addClass('disabled');
    var el = $(".page-content");
    var id = $("#id").val();
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: {id: id},
        url: "/sell-card/batch-open-card/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/sell-card/batch-open-card/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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
