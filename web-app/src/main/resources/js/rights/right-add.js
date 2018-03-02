var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        rightCode: {
            required: true,
            newCharacterNo2: true,
            stringMaxLength: 60
        },
        rightDesc: {
            required: true,
            stringMaxLength: 128
        },
        rightName: {
            required: true,
            stringMaxLength: 32
        },
        parentMenuId: {
            required: true,
			stringMaxLength: 60
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
		if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#rightBody"));
			$.post("/rights/right/add",
					$("#addForm").serialize(),
					function(data){
                        $("#btnSave").attr("disabled", false);
                        Shade.unblockUI($("#rightBody"));
				if(data.result == "success"){
					BootboxExt.alert("新增成功",function(res){
						location.href="/rights/right/search";
					});
				}else if(data.result == "isHas"){
				    BootboxExt.alert("该权限编号已存在");
                }else{
					BootboxExt.alert("新增失败",function(res){
						window.location.reload();
					});
				}
			})
		}
	});

	$("#btnUpdate").click(function () {
		if (addForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#rightBody"));
			$.post("/rights/right/update",
					$("#updateForm").serialize(),
					function(data){
                        $("#btnUpdate").attr("disabled", false);
                        Shade.unblockUI($("#rightBody"));
				if(data.result == true){
					BootboxExt.alert("修改成功",function(res){
						location.href="/rights//right/search";
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

