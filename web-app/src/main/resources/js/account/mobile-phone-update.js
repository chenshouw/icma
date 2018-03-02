var updateForm = $('form');
updateForm.validate({
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
                    oldPhoneNum: function () {
                        return $("#oldPhoneNum").val();
                    },
                    phoneNum: function () {
                        return $("#phoneNum").val();
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
    $("#btnUpdate").click(function () {
        isSelectInstId();
        if(!isSelect){
            BootboxExt.alert("请选择所属组织机构")
            return;
        }
        isSelect = false;
        if (updateForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#updateBody"));
            $.post("/account-manage/mobile-phone/update",
                $("#updateForm").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled",false);
                    Shade.unblockUI($("#updateBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/account-manage/mobile-phone/search";
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
