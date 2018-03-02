var tidGroupForm = $('form');
tidGroupForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        tidGroupName: {
            required: true,
            string: true,
            stringMaxLength: 60
        },
        tidGroupStatus: {
            required: true,
            stringMaxLength: 1
        },
        sysId: {
            required: true
        },
        merchantId: {
            required: true
        },
        tidGroupDesc: {
            required: true,
            stringMaxLength: 128
        } ,
        tidGroupCode:{
            required: true,
            newCharacterNo2: true,
            stringMaxLength: 30,
            remote: {
                url: "/rights/tidGroup/codeUnique",
                type: "POST",
                dataType: "json",
                data: {
                    oldCode: function () {
                        return $("#oldCode").val();
                    },
                    tidGroupCode: function () {
                        return $("#tidGroupCode").val();
                    }
                }
            }
        }

    },
    messages: {
        tidGroupCode: {
            remote: "该终端权限编号存在，请重新输入"
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
