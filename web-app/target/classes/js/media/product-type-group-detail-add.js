var productTypeDetailForm = $('#parProductTypeDetailForm');
productTypeDetailForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        productAttrArgs: {
            required: true
        },
        productAttrValue: {
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
        var checkResult = false;
        $.ajax({
            async: false,
            type: "post",
            url: "/media/product/group/checkArgs",
            data: $("#parProductTypeDetailForm").serialize(),
            dataType: "json",
            success: function(data){
                if(data.result){
                    checkResult = false;
                    BootboxExt.alert("产品属性参数已存在,请重新选择");
                    return;
                }else{
                    checkResult = true;
                }
            }
        });

        if(checkResult){
            if (productTypeDetailForm.valid()) {
                $("#btnSave").attr("disabled",true);
                Shade.blockUI($("#productTypeDetailBody"));
                $.post("/media/product/group/add-product-group-detail",
                    $("#parProductTypeDetailForm").serialize(),
                    function (data) {
                        $("#btnSave").attr("disabled",false);
                        Shade.unblockUI($("#productTypeDetailBody"));
                        if (data.result == "success") {
                            BootboxExt.alert("新增成功", function (res) {
                                location.href = "/media/product/group/to-detail?productTypeGroup=" + parProductType;
                            });
                        } else if (data.result == "isHas") {
                            BootboxExt.alert("产品属性已经存在");
                        } else {
                            BootboxExt.alert("新增失败", function (res) {
                                window.location.reload();
                            });
                        }
                    })
            }
        }
    });
});

$(function () {
    $("#btnUpdate").click(function () {
        var parProductType = $("#parProductType").val().trim();
        $("#productAttrArgs").removeAttr("disabled");
        if (productTypeDetailForm.valid()) {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#productTypeDetailBody"));
            $.post("/media/product/group/update-product-group-detail", $("#parProductTypeDetailForm").serialize(), function (data) {
                $("#btnUpdate").attr("disabled",false);
                Shade.unblockUI($("#productTypeDetailBody"));
                if (data.result == true) {
                    BootboxExt.alert("修改成功", function (res) {
                        location.href = "/media/product/group/to-detail?productTypeGroup=" + parProductType;
                    });
                } else {
                    BootboxExt.alert("修改失败");
                }
            });
        }
    });
});