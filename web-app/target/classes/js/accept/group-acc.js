$(function () {

    $("#issuId").change(function () {
        var issuName = $("#issuId").val();
        $("#issuName").val(issuName);
    });

    $("#groupId").change(function () {
        var groupName = $("#groupId").val();
        $("#groupName").val(groupName);
    });

    $("#btnSave").click(function () {
        var issuId = $("#issuId").find("option:selected").text().split('-')[0];
        var issuName = $("#issuName").val();
        var groupId = $("#groupId").find("option:selected").text().split('-')[0];
        var groupName = $("#groupName").val();
        var flag = $("#flag").val();
        var memo = $("#memo").val();

        if (issuId == null || issuId == "" || issuId=="请选择发卡机构代码") {
            BootboxExt.alert("请选择发卡机构代码");
            return false;
        } else if (groupId == null || groupId == "" || groupId=="请选择商户组代码") {
            BootboxExt.alert("请选择商户组代码");
            return false;
        } else if (getStrLength(issuName) > 60) {
            BootboxExt.alert("发卡机构名称不能大于20个汉字");
            return false;
        } else if (getStrLength(groupName) > 60) {
            BootboxExt.alert("商户组名称不能大于20个汉字");
            return false;
        } else if (getStrLength(memo) > 30) {
            BootboxExt.alert("备注不能大于20个汉字");
            return false;
        } else {
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#groupAcceptBody"));
            $.post("/accept-manage/group-accept/group-accept-add", {
                "issuId": issuId,
                "issuName": issuName,
                "groupId": groupId,
                "groupName": groupName,
                "flag": flag,
                "memo": memo
            }, function (data) {
                $("#btnSave").attr("disabled",false);
                Shade.unblockUI($("#groupAcceptBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/group-accept/group-accept-search";
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
        var groupId = $("#groupId").val();
        var groupName = $("#groupName").val();
        var flag = $("#flag").val();
        var memo = $("#memo").val();

        if (getStrLength(issuName) > 60) {
            BootboxExt.alert("发卡机构名称不能大于20个汉字");
            return false;
        } else if (getStrLength(groupName) > 60) {
            BootboxExt.alert("商户组名称不能大于20个汉字");
            return false;
        } else if (getStrLength(memo) > 20) {
            BootboxExt.alert("备注不能大于10个汉字");
            return false;
        } else {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#groupAcceptBody"));
            $.post("/accept-manage/group-accept/group-accept-update", {
                "issuId": issuId,
                "issuName": issuName,
                "groupId": groupId,
                "groupName": groupName,
                "flag": flag,
                "memo": memo
            }, function (data) {
                $("#btnUpdate").attr("disabled",false);
                Shade.unblockUI($("#groupAcceptBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/group-accept/group-accept-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function () {
                    });
                }
            });
        }
    });

});

function groupAcceptDel(issuId, groupId) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/accept-manage/group-accept/group-accept-delete", {
                "issuId": issuId,
                "groupId": groupId
            }, function (data) {
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/group-accept/group-accept-search";
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
