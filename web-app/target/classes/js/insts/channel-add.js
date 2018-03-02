var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        instId: {
            required: true,
            alnum: true
        },
        instName: {
            required: true
        },
        areaCode: {
            required: true,
            alnum: true
        },
        phone:{
            mobilephone:true
        },
        status: {
            required: true,
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
            Shade.blockUI($("#channelBody"));
			$.post("/trans/deal-manage/channel/add",
                $("#addForm").serialize(),
					function(data){
			    $("#btnSave").attr("disabled", false);
			    Shade.unblockUI($("#channelBody"));
				if(data.result == "success"){
					BootboxExt.alert("新增成功",function(res){
						location.href="/trans/deal-manage/channel/search";
					});
				}else if(data.result == "isHas"){
                    BootboxExt.alert("该渠道编号已存在",function(res){
                        //window.location.reload();
                    });
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
            Shade.blockUI($("#channelBody"));
			$.post("/trans/deal-manage/channel/update",
					$("#updateForm").serialize(),
					function(data){
			    $("#btnUpdate").attr("disabled", false);
			    Shade.unblockUI($("#channelBody"))
                if(data.result == true){
                    BootboxExt.alert("修改成功",function(res){
                        location.href="/trans/deal-manage/channel/search";
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




