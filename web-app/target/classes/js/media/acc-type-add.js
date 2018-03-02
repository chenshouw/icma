var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        accType: {
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        accName: {
            required: true,
            stringMaxLength: 100
        },
        amtUnit: {
            stringMaxLength: 12
        },
        pri: {
            onlynum: true,
            stringMaxLength: 38
        },
        iflag: {
            onlynum: true,
            stringMaxLength: 38
        },
        balanceHwm: {
            required: true,
            onlyamount: 12
        },
        chargeHwm: {
            required: true,
            onlyamount: 12
        },
        revokeWm: {
            required: true,
            onlyamount: 12
        },
        dftPeriod: {
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        expFlag: {
            required: true
        },
        scope: {
            required: true,
            onlynum: true,
            stringMaxLength: 38
        },
        accGrp: {
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

$(function(){
    $("#btnSave").click(function () {
        if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#accTypeBody"));
            $.post("/media/acc/type/add",
                $("#addForm").serialize(),
                function(data){
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#accTypeBody"));
                    if (data.result == "success") {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href="/media/acc/type/search";
                        });
                    } else if (data.result == "isHas"){
                        BootboxExt.alert("账户类型已经存在");
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });

    $("#btnUpdate").click(function () {
        if (addForm.valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#accTypeBody"));
            $.post("/media/acc/type/update",
                $("#updateForm").serialize(),
                function(data){
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#accTypeBody"));
                    if(data.result == true){
                        BootboxExt.alert("修改成功",function(res){
                            location.href="/media/acc/type/search";
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