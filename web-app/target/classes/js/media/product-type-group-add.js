var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        parProductType: {
            required: true,
            onlynumbesidezero: true,
            maxlength: 18
        },
        productGroupName: {
            required: true,
            stringMaxLength: 100
        },
        status: {
            required: true
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

$(function () {

    $("#btnSave").click(function () {
        var parProductType = $("#parProductType").val();
        if (parProductType == null || parProductType == '') {
            BootboxExt.alert("请填写产品类型");
            return;
        }
        var productGroupName = $("#productGroupName").val();
        if (productGroupName == null || productGroupName == '') {
            BootboxExt.alert("请填写产品名称");
            return;
        }
        var status = $("#status").val();
        if (status == null || status == '') {
            BootboxExt.alert("请选择状态");
            return;
        }

        if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#prodcutTypeBody"));
            $.post("/media/product/group/add",
                $("#addForm").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#prodcutTypeBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/media/product/group/search";
                        });
                    } else if (data.result == "isHas") {
                        BootboxExt.alert("产品类型已经存在");
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });

    $("#btnUpdate").click(function () {
        var parProductType = $("#parProductType").val();
        if (parProductType == null || parProductType == '') {
            BootboxExt.alert("请填写产品类型");
            return;
        }
        var productGroupName = $("#productGroupName").val();
        if (productGroupName == null || productGroupName == '') {
            BootboxExt.alert("请填写产品名称");
            return;
        }
        var status = $("#status").val();
        if (status == null || status == '') {
            BootboxExt.alert("请选择状态");
            return;
        }
        if (addForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#prodcutTypeBody"));
            $.post("/media/product/group/update",
                $("#updateForm").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#prodcutTypeBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/media/product/group/search";
                        });
                    } else {
                        BootboxExt.alert("修改失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });
});



