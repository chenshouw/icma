var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        txnAmt: {
            required: true,
            onlyamount: 12
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

$(function(){
    $("#btnSave").click(function () {
        var txnAmt = $('#txnAmt').val();
        if (txnAmt == 0 || txnAmt == 0.0 || txnAmt == 0.00) {
            BootboxExt.alert("调账金额不能为0");
            return;
        }
        if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#dealAccountFormBody"));
            $.post("/trans/deal-manage/pos-trans/consumeAccountRegulation",
                $("#addForm").serialize(),
                function(data){
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#dealAccountFormBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("调账成功", function (res) {
                            location.href="/trans/deal-manage/pos-trans/search";
                        });
                    } else if (data.result == "error") {
                        BootboxExt.alert(data.memo, function (res) {

                        });
                    } else {
                        BootboxExt.alert("调账失败", function (res) {

                        });
                    }
                })
        }
    });

    $("#choose").click(function () {
        $("#txnAmt").val($("#oldtxnAmt").val());
    })
});
