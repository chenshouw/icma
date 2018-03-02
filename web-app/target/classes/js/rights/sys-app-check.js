var sysAppForm = $('form');
sysAppForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        name: {
            required: true,
            stringMaxLength: 30
        },
        status: {
            required: true
        },
        code: {
            required: true,
            stringMaxLength: 20,
            character: true,
            remote: {
                url: "/rights/sys-app/codeUnique",
                type: "POST",
                dataType: "json",
                data: {
                    oldCode: function () {
                        return $("#oldCode").val();
                    },
                    code: function () {
                        return $("#code").val();
                    }

                }
            }
        },
        descn: {
            required: true,
            stringMaxLength: 50
        } ,
        appUrl: {
            required: true,
            stringMaxLength: 50,
            url: true
        }
    },
    messages: {
        code: {
            remote: "该系统编码已存在，请重新输入"
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
