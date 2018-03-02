$(function () {
    $("#btnSave").click(function () {
        if (flowRuleForm.valid()) { //验证通过
            $('#btnSave').attr('disabled', true);
            Shade.blockUI($("#flowRuleBody"));
            $.post("/system-data/flow-rule/add",
                $("#addFrom").serialize(),

                function (data) {
                    $('#btnSave').attr('disabled', false);
                    Shade.unblockUI($("#flowRuleBody"));
                    if (data == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/system-data/flow-rule/search";
                        });
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                });
        }
    });
});

