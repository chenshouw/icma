var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        productType: {
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        productName: {
            required: true,
            stringMaxLength: 60
        },
        parProductType: {
            required: true
        },
        accAttrCode:{
            required: true,
            stringMaxLength: 38
        },
        mediaType:{
            stringMaxLength: 38
        },
        bin:{
            stringMaxLength: 20
        },
        parAmt:{
            required: true,
            onlyamount: 12
        },
        inventoryFlag1:{
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        validMon:{
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        renewMon:{
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        saleHwm:{
            required: true,
            onlyamount: 12
        },
        chargeHwm:{
            required: true,
            onlyamount: 12
        },
        balanceHwm:{
            required: true,
            onlyamount: 12
        },
        overdraw:{
            required: true,
            onlyamount: 12
        },
        pinFlag:{
            required: true,
            stringMaxLength: 38
        },
        maxRenewCnt:{
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        autoFlag:{
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        balPrn:{
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        billFlag:{
            required: true,
            onlynum: true,
            stringMaxLength: 38
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

    if($("#inFlag").val() == 0 ||　$("#inFlag").val() == 1){
        $("#inFlag").attr("disabled", true);
    }else{
        $("#inventoryFlag1").attr("disabled", false);
    }
	$("#btnSave").click(function () {
        var mediaType = $("#mediaType").val();
        if(mediaType == null || mediaType == ''){
            BootboxExt.alert("请选择介质类型");
            return;
        }
        var bin = $("#bin").val();
        if(bin == null || bin == ''){
            BootboxExt.alert("请选择前缀设置");
            return;
        }
        var accAttrCode = $("#accAttrCode").val();
        if(accAttrCode == null || accAttrCode == ''){
            BootboxExt.alert("请选择账户属性类别");
            return;
        }

		if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#prodcutTypeBody"));
			$.post("/media/product/type/add",
                $("#addForm").serialize(),
                function(data){
                $("#btnSave").attr("disabled", false);
                Shade.unblockUI($("#prodcutTypeBody"));
                if (data.result == "success") {
                    BootboxExt.alert("新增成功", function (res) {
                        location.href="/media/product/type/search";
                    });
                } else if (data.result == "isHas"){
                    BootboxExt.alert("产品子类型已经存在");
                } else {
                    BootboxExt.alert("新增失败", function (res) {
                        window.location.reload();
                    });
                        }
                    })
        }
    });

    $("#btnUpdate").click(function () {
        var mediaType = $("#mediaType").val();
        if(mediaType == null || mediaType == ''){
            BootboxExt.alert("请选择介质类型");
            return;
        }
        var bin = $("#bin").val();
        if(bin == null || bin == ''){
            BootboxExt.alert("请选择前缀设置");
            return;
        }
        var accAttrCode = $("#accAttrCode").val();
        if(accAttrCode == null || accAttrCode == ''){
            BootboxExt.alert("请选择账户属性类别");
            return;
        }

        if (addForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#prodcutTypeBody"));
            $.post("/media/product/type/update",
                $("#updateForm").serialize(),
                function(data){
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#prodcutTypeBody"));
                    if(data.result == true){
                        BootboxExt.alert("修改成功",function(res){
                            location.href="/media/product/type/search";
                        });
                    }else{
                        BootboxExt.alert("修改失败",function(res){
                            window.location.reload();
                        });
                    }
			})
		}
	});
});

/**
 * 根据选择介质类型，设置库存管理标志的值。
 */
function changeInventory(){
    $("#inFlag").val("");
    $("#inventoryFlag").val("");
    $("#inFlag").attr("disabled", false);
    var mediaType = $("#mediaType").val();
    $.get("/media/carrier/query-carrier", { mediaType: mediaType}, function (data)
    {
        var inventoryFlag = data.result;
        if(inventoryFlag == 0 || inventoryFlag == 1){
            $("#inFlag").val(inventoryFlag);
            $("#inventoryFlag").val(inventoryFlag);
            $("#inFlag").attr("disabled", true);
        }else{
            $("#inventoryFlag").val("");
        }
    }, "json");
}

function changeValue(){
    var inFlag = $("#inFlag").val();
    $("#inventoryFlag").val(inFlag);
}



