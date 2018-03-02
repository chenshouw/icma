$(function () {

    $("#issuId").change(function () {
        var issuName = $("#issuId").val();
        $("#issuName").val(issuName);
    });

    $("#acqId").change(function () {
        var acqName = $("#acqId").val();
        $("#acqName").val(acqName);
    });

    $("#btnSave").click(function () {
        var issuId = $("#issuId").find("option:selected").text().split('-')[0];
        var issuName = $("#issuName").val();
        var acqId = $("#acqId").find("option:selected").text().split('-')[0];
        var acqName = $("#acqName").val();
        var flag = $("#flag").val();
        var memo = $("#memo").val();

        if (issuId == null || issuId == ""||issuId=="请选择发卡机构代码") {
            BootboxExt.alert("请选择发卡机构代码");
            return false;
        } else if (acqId == null || acqId == ""||acqId=="请选择受理机构代码") {
            BootboxExt.alert("请选择受理机构代码");
            return false;
        } else if (getStrLength(issuName) > 60) {
            BootboxExt.alert("发卡机构名称不能大于20个汉字");
            return false;
        } else if (getStrLength(acqName) > 60) {
            BootboxExt.alert("受理机构名称不能大于20个汉字");
            return false;
        } else if (getStrLength(memo) > 100) {
            BootboxExt.alert("备注不能大于33个汉字");
            return false;
        } else {
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#acqAcceptBody"));
            $.post("/accept-manage/acq-accept/acq-accept-add", {
                "issuId": issuId,
                "issuName": issuName,
                "acqId": acqId,
                "acqName": acqName,
                "flag": flag,
                "memo": memo
            }, function (data) {
                $("#btnSave").attr("disabled",false);
                Shade.unblockUI($("#acqAcceptBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/acq-accept/acq-accept-search";
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
        var acqId = $("#acqId").val();
        var acqName = $("#acqName").val();
        var flag = $("#flag").val();
        var memo = $("#memo").val();

        if (getStrLength(issuName) > 60) {
            BootboxExt.alert("发卡机构名称不能大于20个汉字");
            return false;
        } else if (getStrLength(acqName) > 60) {
            BootboxExt.alert("发受理机构名称不能大于20个汉字");
            return false;
        } else if (getStrLength(memo) > 100) {
            BootboxExt.alert("备注不能大于33个汉字");
            return false;
        } else {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#acqAcceptBody"));
            $.post("/accept-manage/acq-accept/acq-accept-update", {
                "issuId": issuId,
                "issuName": issuName,
                "acqId": acqId,
                "acqName": acqName,
                "flag": flag,
                "memo": memo
            }, function (data) {
                $("#btnUpdate").attr("disabled",false);
                Shade.unblockUI($("#acqAcceptBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/acq-accept/acq-accept-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function () {
                    });
                }
            });
        }
    });


});

function acqAcceptDel(issuId, acqId) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/accept-manage/acq-accept/acq-accept-delete", {
                "issuId": issuId,
                "acqId": acqId
            }, function (data) {
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/accept-manage/acq-accept/acq-accept-search";
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
