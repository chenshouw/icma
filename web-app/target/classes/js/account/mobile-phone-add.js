var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        name: {
            required: true,
            maxlength: 30
        },
        sex: {
            required: true
        },
        identifyId: {
            maxlength: 30,
            idcardno: true
        },
        organization: {
            maxlength: 30
        },
        department: {
            maxlength: 30
        },
        position: {
            maxlength: 30
        },
        instId: {
            required: true,
            stringMaxLength: 60
        },
        phoneNum: {
            required: true,
            mobile: true,
            remote: {
                url: "/account-manage/mobile-phone/phoneUnique",
                type: "POST",
                dataType: "json",
                data: {
                    phoneNum: function () {
                        return $("#phoneNum").val();
                    },
                    oldPhoneNum: function () {
                        return null;
                    }
                }
            }
        },
        operators: {
            maxlength: 30
        },
        email: {
            email: true,
            maxlength: 80
        },
        status: {
            required: true
        }
    },
    messages: {
        phoneNum: {
            remote: "该手机号码已存在，请重新输入"
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


var isSelect = false;
function isSelectInstId() {
    var instId = $("#instId").val();
    if($.trim(instId) != null &&　$.trim(instId) !=''){
        isSelect = true;
    }
}

$(function () {
    $("#btnSave").click(function () {
        isSelect = false;
        if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/account-manage/mobile-phone/add",
                $("#addForm").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/account-manage/mobile-phone/search";
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





