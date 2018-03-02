/**
 * 查询导出excel。
 */
$("#export").click(function () {
    $('#export').attr('disabled', true);
    var el = $("#listBody");
    Shade.blockUI(el);
    $.post("/general-ledger/inst-gl-info/export", $("#instGlInfoForm").serialize(), function (data) {
        Shade.unblockUI(el);
        $('#export').attr('disabled', false);
        if (data.code == 1) {
            var tempName = data.tempName;
            var fileName = data.fileName;
            var loadUrl = "/general-ledger/inst-gl-info/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
            window.location.href = loadUrl;
        } else {
            BootboxExt.alert(data.msg, function () {
            });
        }
    },"json").error(function()
    {
        $('#export').attr('disabled', false);
        Shade.unblockUI(el);
        BootboxExt.alert("网络异常，请联系维护人员", function (res) {});
    });


});

var instGlInfoVo = new Object();
function setSearchParam() {
    instGlInfoVo.instId = $("#instId").val();
    instGlInfoVo.productType = $("#productType").val();
    instGlInfoVo.accType = $("#accType").val();
}

function changeInstId(id){
    $(".redss").val(id);
};