/**
 * Created by yuanyaping on 2017/7/17.
 */

var registrationFroms = $('form');
registrationFroms.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        userName: {
            required: true
        },
        userAccount: {
            required: true
        },
        uerPassword: {
            required: true
        },
        rpassword: {
            equired: true,
            /*equalTo: "#register_password"*/
        },
        userSex:{
            required: true
        },
        tnc: {
            required: true
        }
    },
    messages: { // custom messages for radio buttons and checkboxes
        tnc: {
            required: "Please accept TNC first."
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

function  check() {


}


$(function () {
    $("#btnSave").click(function () {
      /*  if (registrationFroms.valid()) { //验证通过*/
            var  userNames=$("#userName").val();
            var  userAccounts=$("#userAccount").val();
            var  userPassword=$("#userPassword").val();
            var  rpassword=$("#rpassword").val();
            var  userSex=$("#userSex").val();
            var  mobile=$("#mobile").val();
            var  email=$("#email").val();
            if(userNames == null || userNames == ""){
                BootboxExt.alert("用户名不能为空");
                return;
            }
            if(userAccounts == null || userAccounts == ""){
                BootboxExt.alert("账户不能为空");
                return;
            }
            if(userPassword == null || userPassword == ""){
                BootboxExt.alert("密码不能为空");
                return;
            }
            if(rpassword == null || rpassword == "") {
                BootboxExt.alert("请确认密码");
                return;
            }else{
                if(userPassword != rpassword){
                    BootboxExt.alert("两次密码不一致");
                    return;
                }
            }
            if(userSex == null || userSex == ""){
                BootboxExt.alert("性别不能为空");
                return;
            }
            if(mobile != ""){
                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile))){
                    BootboxExt.alert("电话号码或手机号码格式不正确");
                    return ;
                }
            }
            if(email != ""){
                if(!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/).test(email)){
                    BootboxExt.alert("邮箱格式不正确");
                    return;
                }
            }

            $("#btnSave").attr("disabled", true);
            $.post("/rights/user/add",
                $("#loginForm").serialize(),
                function(data){
                    $("#btnSave").attr("disabled", false);
                    if (data.result == true) {
                        BootboxExt.alert("创建成功",function(res){
                            location.href="/manage/add-success";
                        });
                    } else {
                        BootboxExt.alert("创建失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
    /*    }*/
    })
});
