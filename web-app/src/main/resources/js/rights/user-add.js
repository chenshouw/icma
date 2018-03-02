var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        userName: {
            required: true,
            stringMaxLength: 40
        },
        userAccount: {
            required: true,
            stringMaxLength: 20
        },
        userPassword: {
            required: true,
            pwd: true,
            stringMaxLength: 64
        },
        userComfirmPassword: {
            required: true,
            pwd: true,
            stringMaxLength: 64
        },
        userStatus: {
            required: true,
            stringMaxLength: 2
        },
        userSex: {
            required: true,
            stringMaxLength: 2
        },
        mobile: {
            required: true,
            mobile: true,
            stringMaxLength: 11
        },
        email: {
            email: true,
            stringMaxLength: 32
        },
        sysId: {
            required: true,
        },
        merchantType: {
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
	    var sysId = $("#sysId").val();
	    if (sysId == "2") {
            var mid = $("#merchantId").val();
            if (null == mid || "" == mid) {
                BootboxExt.alert("请选择商户");
                return;
            }
        }else{
            $("#merchantId").val("");
            $("#subMid").val("");
        }
        var pwd = $("#userPassword").val();
        var comfirmPwd = $("#userComfirmPassword").val();
        if(pwd != comfirmPwd){
            BootboxExt.alert("密码和确认密码不一致，请重新输入")
            $("#userPassword").val('');
            $("#userComfirmPassword").val('');
            $("#userPassword").focus();
            return;
        }
		if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#userBody"));
			$.post("/rights/user/add",
					$("#addForm").serialize(),
					function(data){
			    $("#btnSave").attr("disabled", false);
			    Shade.unblockUI($("#userBody"));
				if(data.result == true){
					BootboxExt.alert("新增成功",function(res){
						location.href="/rights/user/search";
					});
				}else if(data.result == false){
                    BootboxExt.alert("新增失败",function(res){
                        window.location.reload();
                    });
                }else{
				    if(data.result == "a"){
                        BootboxExt.alert("该账号已存在",function(res){
                            $("#userAccount").val('');
                            $("#userAccount").focus();
                        });
                    }else if(data.result == "b"){
                        BootboxExt.alert("该手机号用户已绑定",function(res){
                            $("#mobile").val('');
                            $("#mobile").focus();
                        });

                    }
				}
			})
		}
	});

	$("#btnUpdate").click(function () {
        var sysId = $("#sysId").val();
        if (sysId == "2") {
            var mid = $("#merchantId").val();
            if (null == mid || "" == mid) {
                BootboxExt.alert("请选择商户");
                return;
            }
        }else{
            $("#merchantId").val("");
            $("#subMid").val("");
        }
		if (addForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#userBody"));
			$.post("/rights/user/update",
					$("#updateForm").serialize(),
					function(data){
			    $("#btnUpdate").attr("disabled", false);
			    Shade.unblockUI($("#userBody"));
                if(data.result == true){
                    BootboxExt.alert("修改成功",function(res){
                        location.href="/rights/user/search";
                    });
                }else if(data.result == false){
                    BootboxExt.alert("修改失败",function(res){
                        window.location.reload();
                    });
                }else{
                    if(data.result == "a"){
                        BootboxExt.alert("该账号已存在",function(res){
                            $("#userAccount").val('');
                            $("#userAccount").focus();
                        });
                    }else if(data.result == "b"){
                        BootboxExt.alert("该手机号用户已绑定",function(res){
                            $("#mobile").val('');
                            $("#mobile").focus();
                        });

                    }
                }
			})
		}
	});
});


/**
 * 返回按钮。
 */
function returnSearch() {
    Shade.blockUI($("#tidBoby"));
    window.location.href = "/rights/user/search";
}

function  mchDiv() {
    var sysId = $("#sysId").val();
    if ( "1" == sysId) {
        $('#mchDiv').hide();
    } else {
        $('#mchDiv').show();
    }
}



