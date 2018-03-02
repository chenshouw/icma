$(function () {
    $("#btnUpdate").click(function () {
        if (flowRuleForm.valid()) { //验证通过
            $('#btnUpdate').attr('disabled', true);
            Shade.blockUI($("#flowRuleBody"));
            $.post("/system-data/flow-rule/update",
                $("#updateFrom").serialize(),
                function (data) {
                    $('#btnUpdate').attr('disabled', false);
                    Shade.unblockUI($("#flowRuleBody"));
                    if (data == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/system-data/flow-rule/search";
                        });
                    } else {
                        BootboxExt.alert("修改失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });
});

