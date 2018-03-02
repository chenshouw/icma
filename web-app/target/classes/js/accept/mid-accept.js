$(function () {

    $("#issuId").change(function () {
        var issuName = $("#issuId").val();
        $("#issuName").val(issuName);
    });

    $("#mid").change(function () {
        var midName = $("#mid").val();
        $("#midName").val(midName);
    });

    $("#btnSave").click(function () {
        var issuId = $("#issuId").find("option:selected").text().split('-')[0];
        var issuName = $("#issuName").val();
        var mid = $("#mid").find("option:selected").text().split('-')[0];
        var midName = $("#midName").val();
        var flag = $("#flag").val();
        var memo = $("#memo").val();

        if (issuId == null || issuId == "" || issuId=="请选择发卡机构代码") {
            BootboxExt.alert("请选择发卡机构代码");
            return false;
        } else if (mid == null || mid == "" || mid=="请选择商户代码") {
            BootboxExt.alert("请选择商户代码");
            return false;
        } else if (getStrLength(issuName) > 60) {
            BootboxExt.alert("发卡机构名称不能大于20个汉字");
            return false;
        } else if (getStrLength(midName) > 60) {
            BootboxExt.alert("商户名称不能大于20个汉字");
            return false;
        } else if (getStrLength(memo) > 30) {
            BootboxExt.alert("备注不能大于10个汉字");
            return false;
        } else {
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#midAcceptBody"));
            $.post("/accept-manage/mid-accept/mid-accept-add", {
                "issuId": issuId,
                "issuName": issuName,
                "mid": mid,
                "midName": midName,
                "flag": flag,
                "memo": memo
            }, function (data) {
                $("#btnSave").attr("disabled",false);
                Shade.unblockUI($("#midAcceptBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/mid-accept/mid-accept-search";
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
        var issuId = $("#issuId").val();
        var issuName = $("#issuName").val();
        var mid = $("#mid").val();
        var midName = $("#midName").val();
        var flag = $("#flag").val();
        var memo = $("#memo").val();

        if (getStrLength(issuName) > 60) {
            BootboxExt.alert("发卡机构名称不能大于20个汉字");
            return false;
        } else if (getStrLength(midName) > 60) {
            BootboxExt.alert("商户名称不能大于20个汉字");
            return false;
        } else if (getStrLength(memo) > 30) {
            BootboxExt.alert("备注不能大于10个汉字");
            return false;
        } else {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#midAcceptBody"));
            $.post("/accept-manage/mid-accept/mid-accept-update", {
                "issuId": issuId,
                "issuName": issuName,
                "mid": mid,
                "midName": midName,
                "flag": flag,
                "memo": memo
            }, function (data) {
                $("#btnUpdate").attr("disabled",false);
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/mid-accept/mid-accept-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function () {
                    });
                }
            });
        }
    });

});

function midAcceptDel(issuId, mid) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/accept-manage/mid-accept/mid-accept-delete", {
                "issuId": issuId,
                "mid": mid
            }, function (data) {
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/mid-accept/mid-accept-search";
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

function getStrLength(str) {
    var strlen = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            strlen += 3;
        } else {
            strlen++;
        }
    }
    return strlen;
}