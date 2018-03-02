var count = 0;
$(function () {
    $("#btnPasswords").click(function () {
        var userPassword = $("#userPassword").val();
        var rpassword = $("#rpassword").val();
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        if (userPassword == null || userPassword == "") {
            count++;
            BootboxExt.alert("密码不能为空");
            return;
        } else {
            if (!reg.exec(userPassword)) {
                count++;
                BootboxExt.alert("密码只能是6-21位字母和数字组成");
                return;
            }
        }
        if (rpassword == null || rpassword == "") {
            count++;
            BootboxExt.alert("确认密码不能为空");
            return;
        } else {
            if (!reg.exec(rpassword)) {
                count++;
                BootboxExt.alert("确认密码只能是6-21位字母和数字组成");
                return;
            }
            if (userPassword != rpassword) {
                count++;
                BootboxExt.alert("密码与确认密码不一致");
                return;
            }
        }
        $("#btnPasswords").attr("disabled", true);
        $.post("/manage/user-password",
            $("#userPasswordFrom").serialize(),
            function (data) {
                $("#btnPasswords").attr("disabled", false);
                if (data.result == true) {
                    count = -1;
                    BootboxExt.alert("修改成功", function (res) {
                        //修改成功直接调整到登陆界面
                        location.href = "/login";
                    });
                } else {
                    count++;
                    BootboxExt.alert("修改失败", function (res) {
                        window.location.reload();
                    });
                }
            })
    })

    $(".login").keypress(function (event) {
        var key;//event.keyCode
        if (window.event) {//ie
            key = event.keyCode;
        } else if (event.which) {//ff
            key = event.which;//event.keyCode
        }
        if (key === 13) {
            event.preventDefault();//取消事件的默认行为
            if (count == -1) {//修改成功直接调整到登陆界面
                location.href = "/login";
            } else if (count == 0) {
                $("#btnPasswords").click();
            } else {
                bootbox.hideAll();
                $("#userPassword").focus();
                count = 0;
            }
        }
    });
});
//进入页面定位鼠标
$("#userPassword").focus();
