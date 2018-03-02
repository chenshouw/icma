var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        productId: {
            required: true
        },
        txnAmt: {
            required: true,
            allnumbesidezero: true
        }

    },
    highlight: function (element) {
        $(element)
            .closest('.form-group').addClass('has-error');
    },

    unhighlight: function (element) {
        $(element)
            .closest('.form-group').removeClass('has-error');
    },

    success: function (label) {
        label
            .closest('.form-group').removeClass('has-error');
    }
});



$(function () {
    $("#btnSave").click(function () {
        var productId = $("#productId").val();
        var txnAmt = $("#txnAmt").val();
        var channels = $("#channels").val();

        if (null == productId || '' == productId) {
            BootboxExt.alert("卡号不可为空");
            return;
        }
        if (null == txnAmt || '' == txnAmt) {
            BootboxExt.alert("充值金额不可为空");
            return;
        }
        if (txnAmt == 0 || txnAmt == 0.0 || txnAmt == 0.00) {
            BootboxExt.alert("充值金额不能为0");
            return;
        }

        var flag = true;

        if (addForm.valid()) {
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/account-manage/card-recharge/card-recharge", $("#addForm").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("充值成功", function (res) {
                            location.href = "/account-manage/card-recharge/to-card-recharge";
                        });
                    } else if (data.result == "notExists") {
                        BootboxExt.alert("卡号不存在，请检查数据", function (res) {
                        });
                    } else {
                        if (data.memo != null) {
                            BootboxExt.alert(data.memo,function () {
                            });
                        } else {
                            BootboxExt.alert("充值失败", function (res) {
                            });
                        }

                    }
                });
        }
        {
        }
    });
})


function cleanCardQuery() {
    history.go(0);
}


