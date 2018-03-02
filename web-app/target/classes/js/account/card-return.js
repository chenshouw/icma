
var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        productId: {
            required: true
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

        if (null == productId || '' == productId) {
            BootboxExt.alert("卡号不可为空");
            return;
        }

        var flag = true;

        if (addForm.valid()) {
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/account-manage/card-return/card-return", {productId:$("#productId").val()},
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("退卡成功", function (res) {
                            location.href = "/account-manage/card-return/to-card-return";
                        });
                    } else if (data.result == "notExists") {
                        BootboxExt.alert("卡号不存在，请检查数据", function (res) {
                        });
                    } else {
                        if (data.memo != null && data.memo != '') {
                            BootboxExt.alert(data.memo, function (res) {
                            });
                        } else {
                            BootboxExt.alert("退卡失败", function (res) {
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


