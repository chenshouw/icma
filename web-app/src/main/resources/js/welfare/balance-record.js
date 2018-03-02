var welfareCardVo = new Object();

$(function () {
    welfareCardVo.batchNo = $("#batchNo").val();
    welfareCardVo.empNo = $("#empNo").val();
    welfareCardVo.empName = $("#empName").val();
    welfareCardVo.phone = $("#phone").val();
    welfareCardVo.cardNo = $("#cardNo").val();
    welfareCardVo.issuId = $("#issuId").val();
    welfareCardVo.subIssu = $("#subIssu").val();
    /**
     * 终端查询导出excel。
     */
    $("#export").click(function () {
        $('#export').addClass('disabled');
        var el = $("#balanceBalForm");
        Shade.blockUI($("#balanceBody"));
        $.ajax({
            type: "POST",
            data: welfareCardVo,
            url: "/welfare/balance/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI($("#balanceBody"));
                $('#export').removeClass('disabled');
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/welfare/balance/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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