var sysArgsForm = $('#sysArgsForm');
sysArgsForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        argName: {
            required: true,
            stringMaxLength: 100,
            // upperCharacter2:true
            checkArgName:true
        },
        argValue: {
            required: true,
            stringMaxLength: 100
        },
        memo: {
            required: true,
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


$.validator.addMethod("checkArgName",function(value,element,params){
    var checkArgName = /^[A-Z_]{1,100}$/;
    return this.optional(element)||(checkArgName.test(value));
},"*参数名称为大写字母或下划线");

$(function () {
    // 验证数据
    $("#btnSave").click(function () {
        if (sysArgsForm.valid()) {
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#sysArgsBody"));
            BootboxExt.confirm("请你谨慎操作，此数据增加成功后，不能删除，只能修改，且参数名不能修改,确认增加吗？", function (res) {
                $("#btnSave").attr("disabled",false);
                Shade.unblockUI($("#sysArgsBody"));
                if (res) {
                    $.post("/system-param/sys-args/add", $("#sysArgsForm").serialize(), function (data) {
                        if (data.result == true) {
                            BootboxExt.alert(data.msg, function (res) {
                                location.href = "/system-param/sys-args/search";
                            });
                        } else {
                            BootboxExt.alert(data.msg, function (res) {
                            });
                        }
                    });
                }
            });
        }
    });

    // 验证数据
    $("#btnUpdate").click(function () {
        if (sysArgsForm.valid()) {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#sysArgsBody"));
            $.post("/system-param/sys-args/update", $("#sysArgsForm").serialize(), function (data) {
                $("#btnUpdate").attr("disabled",false);
                Shade.unblockUI($("#sysArgsBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/system-param/sys-args/search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function () {
                        window.location.reload();
                    });
                }
            });
        }
    });

});

