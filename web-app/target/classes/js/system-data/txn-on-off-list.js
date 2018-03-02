$(function () {
    // 验证数据
    $("#btnSave").click(function () {
        $("#btnSave").attr("disabled", true);
        Shade.blockUI($("#txnOnOffBody"));
        $.post("/system-data/txn-on-off/save", $("#txn-on-off-form").serialize(), function (result) {
            $("#btnSave").attr("disabled", false);
            Shade.unblockUI($("#txnOnOffBody"));
            if (result == true) {
                BootboxExt.alert("提交成功", function (res) {
                });
            } else {
                BootboxExt.alert("提交失败", function (res) {
                });
            }
        });
    });
});