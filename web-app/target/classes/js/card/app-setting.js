$(function () {
    $("#btnSave").click(function () {
        if (dataValid()) {
            $("#btnSave").attr("disabled",true);
            $.post("/card/app-setting/app-setting-add", {
                "appId": $("#appId").val(),
                "token": $("#token").val(),
                "appSecret": $("#appSecret").val(),
                "aesKey": $("#aesKey").val(),
                "redirectUrl": $("#redirectUrl").val(),
                "brandName": $("#brandName").val(),
                "servicePhone": $("#servicePhone").val(),
                "protocol": $("input[name='protocol']:checked").val(),
                "wxCallbackDomain": $("#wxCallbackDomain").val(),
                "status": $("#status").val()
            }, function (data) {
                $("#btnSave").attr("disabled",false);
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/card/app-setting/app-setting-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function () {
                        window.location.reload();
                    });
                }
            });
        }
    });

    $("#btnUpdate").click(function () {
        if (dataValid()) {
            $("#btnUpdate").attr("disabled",true);
            $.post("/card/app-setting/app-setting-update", {
                "id": $("#id").val(),
                "appId": $("#appId").val(),
                "token": $("#token").val(),
                "appSecret": $("#appSecret").val(),
                "aesKey": $("#aesKey").val(),
                "redirectUrl": $("#redirectUrl").val(),
                "brandName": $("#brandName").val(),
                "servicePhone": $("#servicePhone").val(),
                "protocol": $("input[name='protocol']:checked").val(),
                "wxCallbackDomain": $("#wxCallbackDomain").val(),
                "status": $("#status").val()
            }, function (data) {
                $("#btnUpdate").attr("disabled",false);
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/card/app-setting/app-setting-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function () {
                        window.location.reload();
                    });
                }
            });
        }
    });

});

function dataValid() {
    var appId = $("#appId").val();
    var token = $("#token").val();
    var appSecret = $("#appSecret").val();
    var aesKey = $("#aesKey").val();
    var redirectUrl = $("#redirectUrl").val();
    var brandName = $("#brandName").val();
    var servicePhone = $("#servicePhone").val();
    var wxCallbackDomain = $("#wxCallbackDomain").val();
    var status = $("#status").val();
    if (appId == null || appId == "") {
        BootboxExt.alert("请输入appId");
        return false;
    }
    if (getStrLength(appId) > 50) {
        BootboxExt.alert("字数上限为50个汉字");
        return false;
    }
    if (token == null || token == "") {
        BootboxExt.alert("请输入token");
        return false;
    }
    if (getStrLength(token) > 300) {
        BootboxExt.alert("字数上限为300个汉字");
        return false;
    }
    if (appSecret == null || appSecret == "") {
        BootboxExt.alert("请输入appSecret");
        return false;
    }
    if (getStrLength(appSecret) > 50) {
        BootboxExt.alert("字数上限为50个汉字");
        return false;
    }
    if (aesKey == null || aesKey == "") {
        BootboxExt.alert("请输入aesKey");
        return false;
    }
    if (getStrLength(aesKey) > 100) {
        BootboxExt.alert("字数上限为100个汉字");
        return false;
    }
    if (redirectUrl == null || redirectUrl == "") {
        BootboxExt.alert("请输入重定向Url");
        return false;
    }
    if (getStrLength(redirectUrl) > 300) {
        BootboxExt.alert("字数上限为300个汉字");
        return false;
    }
    if (brandName == null || brandName == "") {
        BootboxExt.alert("请输入商户名称");
        return false;
    }
    if (getStrLength(brandName) > 36) {
        BootboxExt.alert("商户名称字数上限为12个汉字");
        return false;
    }
    if (servicePhone == null || servicePhone == "") {
        BootboxExt.alert("请输入客服电话");
        return false;
    }
    if (servicePhone != null && servicePhone != "" && !/^([1][3,4,5,7,8][0-9]{9}|[0][0-9]{2,3}-[0-9]{5,10}|[1-9]{1}[0-9]{5,8})$/.test(servicePhone)) {
        BootboxExt.alert("请输入正确的客服电话");
        return false;
    }
    if (wxCallbackDomain == null || wxCallbackDomain == "") {
        BootboxExt.alert("请输入微信认证回调域名");
        return false;
    }
    if (getStrLength(wxCallbackDomain) > 100) {
        BootboxExt.alert("字数上限为100个汉字");
        return false;
    }
    if (status == null || status == "") {
        BootboxExt.alert("请选择状态");
        return false;
    }
    return true;
}

function getStrLength(str) {
    var strLen = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            strLen += 3;
        } else {
            strLen++;
        }
    }
    return strLen;
}

function appSettingDel(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/card/app-setting/app-setting-delete", {
                "id": id
            }, function (data) {
                if (data.result == true) {
                    BootboxExt.confirm(data.msg, function () {
                        location.href = "/card/app-setting/app-setting-search";
                    });
                } else {
                    BootboxExt.confirm(data.msg, function () {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}