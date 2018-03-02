var count = 0;
$(function () {
    $("#btnUserAccount").click(function () {
        var userAccount = $("#userAccount").val();
        if (userAccount == null || userAccount == "") {
            count++;
            BootboxExt.alert("账户能为空");
            return;
        }
        $("#btnUserAccount").attr("disabled", true);
        $.post("/manage/user-account",
            $("#userAccountFrom").serialize(),
            function (data) {
                $("#btnUserAccount").attr("disabled", false);
                if (data.result == '2') {
                    count = 0;
                    BootboxExt.alert(function (res) {
                        location.href = "/manage/touser-mobile?mobile=" + encode64(data.mobile);
                    });
                } else {
                    count++;
                    BootboxExt.alert(data.result);
                }
            }
        )
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
            if (count == 0) {
                $("#btnUserAccount").click();
            } else {
                bootbox.hideAll();
                $("#userAccount").focus();
                count = 0;
            }
        }
    });
});
//进入页面定位鼠标
$("#userAccount").focus();
