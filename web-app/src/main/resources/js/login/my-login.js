/**
 * Created by vip on 2017/7/14.
 */
var allowLogin = true;//true：enter键登陆  false：enter键隐藏提示
var code = 1;
var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        userAccount: {
            required: true,
            stringMaxLength: 20
        },
        userPassword: {
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

function clearInput() {
    bootbox.hideAll();//隐藏弹出框
    allowLogin = true;//键盘enter键进行登陆
    if (code === 1) {//成功

    } else if (code === 4) {//验证码不能为空
        $("#captcha").val('');
        $("#captcha").focus();
    } else if (code === 5 || code === 6 || code === 14) {//验证码已失效、验证码错误、用户未分配角色
        $("#captcha").val('');
        $("#captcha").focus();
        refreshAuthCode();
    } else if (code === 7 || code === 8) {//密码错误
        $("#userPassword").val('');
        $("#captcha").val('');
        $("#userPassword").focus();
        refreshAuthCode();
    } else {//账号错误
        $("#userAccount").val('');
        $("#userPassword").val('');
        $("#captcha").val('');
        $("#userAccount").focus();
        refreshAuthCode();
    }
}

$(function () {
    $("#btnLogin").click(function () {
        //对密码进行加密
        if (addForm.valid()) { //验证通过
            $("#btnLogin").attr("disabled", true);
            $("html").css('height', '100%');
            Shade.blockUI($("html"));
            $.post("/manage/login",
                $("#loginForm").serialize(),
                function (data) {
                    code = data.code;
                    $("#btnLogin").attr("disabled", false);
                    if (data.code === 1) {
                        allowLogin = true;
                        location.href = "/home";
                    } else {
                        Shade.unblockUI($("html"));
                        allowLogin = false;
                        BootboxExt.alert(data.msg, function (res) {
                            clearInput();
                        });
                    }
                })
        }
    })
});

$("#codeImg").click(function () {
    refreshAuthCode();
});

function refreshAuthCode() {
    $("#codeImg").attr("src", '/manage/genCaptcha?' + Math.random());
}

function encryptPwd() {
    var encrypted = encode64($('#userPassword').val());
    $('#userPassword').val(encrypted);
}

/**
 * 按Enter键进行登陆。
 */
$(".login").keypress(function (event) {
    var key;//event.keyCode
    if (window.event) {//ie
        key = event.keyCode;
    } else if (event.which) {//ff
        key = event.which;//event.keyCode
    }
    if (key === 13) {
        event.preventDefault();//取消事件的默认行为
        if (allowLogin) {
            $("#btnLogin").click();
        } else {
            clearInput();
        }
    }
});
//进入页面定位鼠标
$("#userAccount").focus();