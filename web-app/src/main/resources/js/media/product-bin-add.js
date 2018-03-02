var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        productBin: {
            required: true,
            onlynum: true,
            stringMaxLength: 16
        },
        issuId: {
            stringMaxLength: 60
        },
        lmIssuId: {
            alnum: true,
            stringMaxLength: 60
        },
        productType: {
            required: true
        },
        idLen: {
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        currSeq: {
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        maxSeq: {
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        status: {
            required: true,
            stringMaxLength: 38
        },
        memo: {
            stringMaxLength: 200
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
        var issuId = $("#issuId").val();
        if(issuId == null || issuId == ''){
            BootboxExt.alert("请选择发卡机构代码");
            return;
        }

		if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#productBinBody"));
			$.post("/media/product/bin/add",
                $("#addForm").serialize(),
                function(data){
                $("#btnSave").attr("disabled", false);
                Shade.unblockUI($("#productBinBody"));
                if (data.result == "success") {
                    BootboxExt.alert("新增成功", function (res) {
                        location.href="/media/product/bin/search";
                    });
                } else if (data.result == "isHas"){
                    BootboxExt.alert("产品BIN已经存在");
                } else {
                    BootboxExt.alert("新增失败", function (res) {
                        window.location.reload();
                    });
                }
			})
		}
	});

	$("#btnUpdate").click(function () {
        var issuId = $("#issuId").val();
        if(issuId == null || issuId == ''){
            BootboxExt.alert("请选择发卡机构代码");
            return;
        }
		if (addForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#productBinBody"));
			$.post("/media/product/bin/update",
                $("#updateForm").serialize(),
                function(data){
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#productBinBody"));
                    if(data.result == true){
                        BootboxExt.alert("修改成功",function(res){
                            location.href="/media/product/bin/search";
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






