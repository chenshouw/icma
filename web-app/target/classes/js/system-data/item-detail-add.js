function deleteItem(itemId) {
    $.post("/system-data/item/delete-item-itemDetail", {id: itemId}, function (data) {
        if (data.result == true) {
            BootboxExt.alert("删除成功", function (res) {
                location.href = "/system-data/item/search";
            });
        } else {
            BootboxExt.alert("删除失败", function (res) {
                window.location.reload();
            });
        }
    });
}

var itemDetailForm = $('#itemDetailForm');
itemDetailForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        name: {
            required: true,
            stringMaxLength: 100
        },
        description: {
            stringMaxLength: 200
        },
        code: {
            required: true,
            newNumberAndCharacter:true,
            stringMaxLength: 12
        },
        supperCode: {
            required: true,
            newNumberAndCharacter:true,
            stringMaxLength: 12
        },
        orderId: {
            required: true,
            number: true,
            stringMaxLength: 5
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

var statusFlag = false;
function checkStatus() {
    var status = document.getElementById("status").value;
    if ("" != status) {
        statusFlag = true;
    }
}

$(function () {
    $("#btnSave").click(function () {
        checkStatus();
        var itemId = $("#itemId").val().trim();
        if (statusFlag == true) {
            statusFlag = false;
            if (itemDetailForm.valid()) {
                $("#btnSave").attr("disabled",true);
                Shade.blockUI($("#itemDetailBody"));
                $.post("/system-data/item/add-item-detail",
                    $("#itemDetailForm").serialize(),
                    function (data) {
                        $("#btnSave").attr("disabled",false);
                        Shade.unblockUI($("#itemDetailBody"));
                        if (data.result == true) {
                            BootboxExt.alert("新增成功", function (res) {
                                //location.href = "/system-data/item/detail?id=" + itemId;
                                history.back();
                                //location.reload();
                                //location.replace(document.referrer)

                            });
                        } else {
                            BootboxExt.alert("新增失败");
                        }
                    })
            }
        } else {
            BootboxExt.alert("请选择状态");
        }
    });
});

$(function () {
    $("#btnUpdate").click(function () {
        checkStatus();
        var itemId = $("#itemId").val().trim();
        if (statusFlag == true) {
            statusFlag = false;
            if (itemDetailForm.valid()) {
                $("#btnUpdate").attr("disabled",true);
                Shade.blockUI($("#itemDetailBody"));
                $.post("/system-data/item/update-item-detailSingle", $("#itemDetailForm").serialize(), function (data) {
                    $("#btnUpdate").attr("disabled",false);
                    Shade.unblockUI($("#itemDetailBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            //location.href = "/system-data/item/detail?id=" + itemId;
                            window.history.back();
                        });
                    } else {
                        BootboxExt.alert("修改失败");
                    }
                });
            }
        } else {
            BootboxExt.aler
            t("请选择状态");
        }
    });
});