var int;
var count = 0;
var checkMobileObj = {
    mobile: "",
    verifyCode: "",
    codeTimeout: 60,
    timeout: 60,
    isActiveInterval: false,
    sendVerifyCode: function () {
        checkMobileObj.mobile = $("#mobile").val();
        checkMobileObj.verifyCode = $("#verifyCode").val();
        if (!checkMobileObj.isActiveInterval) {
            int = self.setInterval("checkMobileObj.codeTimeoutInterval()", 1000);
            checkMobileObj.isActiveInterval = true;
            var url = "/manage/send-code";
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'post',
                data: {mobile: checkMobileObj.mobile},
                success: function (res) {
                    if (res.code === 'success') {

                    } else {
                        BootboxExt.alert(res.msg);
                    }
                }
            });
        }
    },
    submitForm: function () {
        var mobile;
        if (checkMobileObj.mobile) {
            mobile = checkMobileObj.mobile;
        } else {
            mobile = $("#mobile").val();
        }
        var verifyCode;
        if (checkMobileObj.verifyCode) {
            verifyCode = checkMobileObj.verifyCode;
        } else {
            verifyCode = $("#verifyCode").val();
        }
        if (!verifyCode || verifyCode.trim().length === 0) {
            count++;
            BootboxExt.alert('验证码不能为空');
            return false;
        }
        var verifyCode = $("#verifyCode").val();
        var url = '/manage/check-code';
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'post',
            data: {mobile: mobile, verifyCode: verifyCode},
            success: function (res) {
                if (res.code === '00') {
                    $("#myMobile").val(mobile);
                    location.href = "/user/update-password/touser-password?mobile=" + mobile;
                  /*  $.post("/user/update-password/touser-password",
                        $("#userPasswordFrom").serialize(),
                        function(data){
                            if (data.result == '2')  {
                                BootboxExt.alert("修改成功",function(res){
                                    location.href="/user/update-password/tosms_verification"
                                });
                            } else {
                                BootboxExt.alert("修改失败", function (res) {
                                    window.location.reload();
                                });
                            }
                        }
                    )
*/
                } else {
                    count++;
                    BootboxExt.alert(res.msg);
                }
            },
            error: function (res) {
                count++;
                BootboxExt.alert('请求失败，请重试');
            }
        });
    },
    codeTimeoutInterval: function () {
        if (checkMobileObj.timeout === 1) {
            window.clearInterval(int);
            checkMobileObj.isActiveInterval = false;
            $("#verifyCodeBtn").html('重新获取');
            checkMobileObj.timeout = checkMobileObj.codeTimeout;
        } else {
            var timeout = checkMobileObj.timeout;
            timeout--;
            checkMobileObj.timeout = timeout;
            $("#verifyCodeBtn").html(timeout + "秒后请重试");
        }
    },
    init: function () {
        $("#okBtn").on('click', function () {
            checkMobileObj.submitForm();
        });

    }
};

checkMobileObj.init();

$(".login").keypress(function (event) {
    var key;//event.keyCode
    if (window.event) {//ie
        key = event.keyCode;
    } else if (event.which) {//ff
        key = event.which;//event.keyCode
    }
    if (key === 13) {
        event.preventDefault();//取消事件的默认行为
        if (count == 0) {
            checkMobileObj.submitForm();
        } else {
            bootbox.hideAll();
            $("#verifyCode").focus();
            count = 0;
        }
    }
});
//进入页面定位鼠标
$("#verifyCode").focus();



var userPasswordFrom = $('form');
userPasswordFrom.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        userPassword: {
            required: true,
            pwd: true,
            stringMaxLength: 64
        },
        userComfirmPassword: {
            required: true,
            pwd: true,
            stringMaxLength: 64
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


var encrypted;
function encryptPwd() {
     encrypted = encode64($('#oldCipher').val());
    $('#oldCipher').val(encrypted);
}


$(function () {
    $("#btnPasswords").click(function () {
        var pwd = $("#userPassword").val();
        var comfirmPwd = $("#userComfirmPassword").val();
        if (pwd != comfirmPwd) {
            BootboxExt.alert("密码和确认密码不一致，请重新输入")
            $("#userPassword").val('');
            $("#userComfirmPassword").val('');
            $("#userPassword").focus();
            return;
        }
        $.post("/user/update-password/check_cipher",{oldCipher:encrypted},
            function(data){
                console.log(data);
                if (data.result ==  '1')  {
                    updatePasswords();
                } else {
                    BootboxExt.alert("输入的旧密码错误!", function (res) {
                        window.location.reload();
                    });
                }
            }
        ,"json")
    });
});

function updatePasswords() {
      $.post("/manage/user-password",
          $("#userPasswordFrom").serialize(),
          function (data) {
              $("#btnPasswords").attr("disabled", false);
              if (data.result == true) {
                  count = -1;
                  BootboxExt.alert("修改成功", function (res) {
                      //修改成功直接调整到登陆界面
                      location.href = "/manage/logout";
                  });
              } else {
                  count++;
                  BootboxExt.alert("修改失败", function (res) {
                      window.location.reload();
                  });
              }
          })
}

