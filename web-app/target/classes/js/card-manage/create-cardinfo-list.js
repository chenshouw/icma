var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {

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
        if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            $.post("",
                $("#createCardInfoForm").serialize(),
                function (data) {
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            $("#btnSave").attr("disabled", false);
                            location.href = "";
                        });
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });
});