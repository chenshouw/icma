$(function () {
    // 验证数据
    $("#btnSave").click(function () {
        if (dataValid()) {
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#respCodeBody"));
            $.post("/system-param/resp-code/resp-code-add", $("#respCodeForm").serialize(), function (data) {
                $("#btnSave").attr("disabled",false);
                Shade.unblockUI($("#respCodeBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function (res) {
                        location.href = "/system-param/resp-code/resp-code-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function (res) {
                    });
                }
            });
        }
    });

    // 验证数据
    $("#btnUpdate").click(function () {
        if (dataValid()) {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#respCodeBody"));
            $.post("/system-param/resp-code/resp-code-update", $("#respCodeForm").serialize(), function (data) {
                $("#btnUpdate").attr("disabled",false);
                Shade.unblockUI($("#respCodeBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function (res) {
                        location.href = "/system-param/resp-code/resp-code-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function (res) {
                        window.location.reload();
                    });
                }
            });
        }
    });

});

function dataValid() {
    var respCode = $("#respCode").val();//返回码
    var respCodeText = $("#respCodeText").val();//返回码说明
    var respDetail = $("#respDetail").val();//返回码详情
    var detail = $("#detail").val();//详情
    if (respCode == null || respCode == "") {
        BootboxExt.alert("返回码不能为空");
        return false;
    }
    if (getStrLength(respCode) > 2) {
        BootboxExt.alert("返回码长度不能大于2个字符");
        return false;
    }
    if (respCodeText == null || respCodeText == "") {
        BootboxExt.alert("返回码说明不能为空");
        return false;
    }
    if (getStrLength(respCodeText) > 8) {
        BootboxExt.alert("返回码说明长度不能大于8个字符");
        return false;
    }
    if (respDetail == null || respDetail == "") {
        alert("返回码详情不能为空");
        return false;
    }
    if (getStrLength(respDetail) > 20) {
        BootboxExt.alert("返回码详情长度不能大于20个字符");
        return false;
    }
    if (detail == null || detail == "") {
        BootboxExt.alert("详情不能为空");
        return false;
    }
    if (getStrLength(detail) > 60) {
        BootboxExt.alert("详情长度不能大于60个字符");
        return false;
    }
    return true;
}

function getStrLength(str) {
    var strlen = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            strlen += 2;
        } else {
            strlen++;
        }
    }
    return strlen;
}

function respCodeDel(respCode) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/system-param/resp-code/resp-code-delete", {"respCode": respCode}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/system-param/resp-code/resp-code-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function () {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}