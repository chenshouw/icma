var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        accAttr: {
            required: true
        },
        accAttrName: {
            required: true,
            stringMaxLength: 60
        },
        flag:{
            required: true
        },
        memo:{
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

function changeAccAttr() {
    $("#accType").val('');
    $("#accType1").val('');
    $("#accType2").val('');
    var accAttr = $("#accAttr").val();
    if ("2" == accAttr){
        $("#div1")[0].style.display= "none";
        $("#div2")[0].style.display="";
    }else {
        $("#div1")[0].style.display="";
        $("#div2")[0].style.display="none";
    }

}

function changeAccType() {
    var accAttr = $("#accAttr").val();
    if (accAttr == null || accAttr == '') {
        $("#accType2").val('');
        BootboxExt.alert("请先选择账户属性");
        return;
    }
    var accType1 = $("#accType1").val();
    var accType2 = $("#accType2").val();
    if ( $("#div1")[0].style.display=="") {
        $("#accType").val(accType2);
    }else {
        $("#accType").val(accType1);
    }
}

function isSelectAccType() {
    var flag = true;
    var accType = $("#accType").val();
    if (accType == null || ''== accType) {
        BootboxExt.alert("请选择账户类型");
        flag = false;
    } else {
        var accAttr = $("#accAttr").val();
        if (accAttr == '2') {
            if (parseInt(accType.split(",").length) <= 1) {
                BootboxExt.alert("综合账户的账户类型至少需要选择两条");
                flag = false;
            }
        }
    }
    return flag;
}


$(function () {
    $("#accType2").attr("disabled",false);
	$("#btnSave").click(function () {
		if (addForm.valid() && isSelectAccType()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#productAccBody"));
			$.post("/media/product/accManage/add",
                $("#addForm").serialize(),
                function(data){
                $("#btnSave").attr("disabled", false);
                Shade.unblockUI($("#productAccBody"));
                if (data.result == "success") {
                    BootboxExt.alert("新增成功", function (res) {
                        location.href="/media/product/accManage/search";
                    });
                } else if (data.result == "isHas"){
                    BootboxExt.alert("账户属性和账户类型联合组建已经存在");
                } else {
                    BootboxExt.alert("新增失败", function (res) {
                        window.location.reload();
                    });
                }
			})
		}
	});

	$("#btnUpdate").click(function () {
		if (addForm.valid() && isSelectAccType()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#productAccBody"));
			$.post("/media/product/accManage/update",
                $("#updateFrom").serialize(),
                function(data){
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#productAccBody"));
                    if(data.result == true){
                        BootboxExt.alert("修改成功",function(res){
                            location.href="/media/product/accManage/search";
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



