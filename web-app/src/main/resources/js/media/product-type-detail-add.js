function deleteProductType(productType) {
    $.post("/media/product/type/delete-productType-productTypeDetail", {productType: productType}, function (data) {
        if (data.result == true) {
            BootboxExt.alert("删除成功", function (res) {
                location.href = "/media/product/type/search";
            });
        } else {
            BootboxExt.alert("删除失败", function (res) {
                window.location.reload();
            });
        }
    });
}

var productTypeDetailForm = $('#productTypeDetailForm');
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
        var productType = $("#productType").val().trim();
        var checkResult = false;
        $.ajax({
            async: false,
            type: "post",
            url: "/media/product/type/checkArgs",
            data: $("#productTypeDetailForm").serialize(),
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
                $.post("/media/product/type/add-product-type-detail",
                    $("#productTypeDetailForm").serialize(),
                    function (data) {
                        $("#btnSave").attr("disabled",false);
                        Shade.unblockUI($("#productTypeDetailBody"));
                        if (data.result == true) {
                            BootboxExt.alert("新增成功", function (res) {
                                location.href = "/media/product/type/detail?productType=" + productType;
                            });
                        }
                    })
            }
        }
    });
});

$(function () {
    $("#btnUpdate").click(function () {
        var productType = $("#productType").val().trim();
        $("#productAttrArgs").removeAttr("disabled");
        if (productTypeDetailForm.valid()) {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#productTypeDetailBody"));
            $.post("/media/product/type/update-productType-detail", $("#productTypeDetailForm").serialize(), function (data) {
                $("#btnUpdate").attr("disabled",false);
                Shade.unblockUI($("#productTypeDetailBody"));
                if (data.result == true) {
                    BootboxExt.alert("修改成功", function (res) {
                        location.href = "/media/product/type/detail?productType=" + productType;
                    });
                } else {
                    BootboxExt.alert("修改失败");
                }
            });
        }
    });
});