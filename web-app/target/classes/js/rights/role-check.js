var roleForm = $('form');
roleForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        roleName: {
            required: true,
            stringMaxLength: 60
        },
        roleStatus: {
            required: true,
            stringMaxLength: 1
        },
        sysId: {
            required: true
        },
        roleDesc: {
            required: true,
            stringMaxLength: 128
        } ,
        roleCode:{
            required: true,
            newCharacterNo2: true,
            stringMaxLength: 30,
            remote: {
                url: "/rights/role/codeUnique",
                type: "POST",
                dataType: "json",
                data: {
                    oldCode: function () {
                        return $("#oldCode").val();
                    },
                    roleCode: function () {
                        return $("#roleCode").val();
                    }
                }
            }
        }

    },
    messages: {
        roleCode: {
            remote: "该角色编号存在，请重新输入"
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
