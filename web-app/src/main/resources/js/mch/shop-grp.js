$(function () {
    $("#btnSave").click(function () {
        if (shopGrpForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#shopGrpBody"));
            $.post("/shop/grp/shop-grp-add",
                $("#addFrom").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#shopGrpBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function () {
                            location.href = "/shop/grp/shop-grp-search";
                        });
                    } else if (data.result == "isHas") {
                        BootboxExt.alert("此门店分组代码已存在", function () {
                            return;
                        });
                    } else if (data.result == "isName") {
                        BootboxExt.alert("此门店分组名称已存在", function () {
                            return;
                        });
                    } else {
                        BootboxExt.alert("新增失败", function () {
                            window.location.reload();
                        });
                    }
                });
        }

    });

    $("#btnUpdate").click(function () {
        if (shopGrpForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#shopGrpBody"));
            $.post("/shop/grp/shop-grp-update",
                $("#updateFrom").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#shopGrpBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function () {
                            location.href = "/shop/grp/shop-grp-search";
                        });
                    } else {
                        BootboxExt.alert("修改失败", function () {
                            window.location.reload();
                        });
                    }
                })
        }
    });

});

function deleteShopGrp(shopGrp) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/shop/grp/shop-grp-delete", {shopGrp: shopGrp}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function () {
                        location.href = "/shop/grp/shop-grp-search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function () {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

function shopSetting(shopGrp) {
    location.href = "/shop/shopGrpDef/search?shopGrp=" + shopGrp;
}