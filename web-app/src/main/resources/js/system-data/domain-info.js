/**
 * Created by HJpower on 2017/5/26.
 */
$(function () {
    $("#btnSave").click(function () {
        var ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        var domainReg = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
        var flag = false;
        var protocol = $("#protocol").val();
        var domain = $("#domain").val();
        var status = $("#status").val();

        if (protocol == null || protocol == "") {
            alert("请选择协议");
            return false;
        }
        if (domain == null || domain == "") {
            alert("请输入域名或IP");
            return false;
        }
        if (ipReg.test(domain) || domainReg.test(domain)) {
            flag = true;
        }
        if (status == null || status == "") {
            alert("请选择状态");
            return false;
        }
        if (flag) {
            $('#btnSave').attr('disabled', true);
            $.post("/system-data/domain-info/add",
                $("#domainForm").serialize(),
                function (data) {
                    $('#btnSave').attr('disabled', false);
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/system-data/domain-info/search";
                        });
                    } else {
                        BootboxExt.alert(data.message, function (res) {
                            window.location.reload();
                        });
                    }
                });
        } else {
            alert("请输入正确的域名或IP!");
            return false;
        }
    });

    $("#btnUpdate").click(function () {
        var ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        var domainReg = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
        var flag = false;
        var protocol = $("#protocol").val();
        var domain = $("#domain").val();
        var status = $("#status").val();
        if (protocol == null || protocol == "") {
            alert("请选择协议");
            return false;
        }
        if (domain == null || domain == "") {
            alert("请输入域名或IP");
            return false;
        }
        if (ipReg.test(domain) || domainReg.test(domain)) {
            flag = true;
        }
        if (status == null || status == "") {
            alert("请选择状态");
            return false;
        }
        if (flag) {
            $('#btnUpdate').attr('disabled', true);
            $.post("/system-data/domain-info/update",
                $("#domainForm").serialize(),
                function (data) {
                    $('#btnUpdate').attr('disabled', false);
                    if (data.result == true) {
                        BootboxExt.alert("更新成功", function (res) {
                            location.href = "/system-data/domain-info/search";
                        });
                    } else {
                        BootboxExt.alert("更新失败", function (res) {
                            window.location.reload();
                        });
                    }
                });
        } else {
            alert("请输入正确的域名或IP");
            return false;
        }
    });

});

function deleteMethod(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/system-data/domain-info/remove", {id: id}, function (data) {
                if (data.result == true) {
                    BootboxExt.confirm("删除成功", function (res) {
                        location.href = "/system-data/domain-info/search";
                    });
                } else {
                    BootboxExt.confirm("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            });
        }
    });
}