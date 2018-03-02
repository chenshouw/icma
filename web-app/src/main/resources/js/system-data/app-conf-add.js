var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        instId: {
            required: true
        },
        appId: {
            required: true,
            onlynum: true,
            stringMaxLength: 50
        },
        appKey: {
            required: true,
            alnum: true,
            stringMaxLength: 32
        },
        appKeyThirdPart: {
            required: true,
            stringMaxLength: 32
        },
        appUrlThirdPart: {
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

$(function () {
    // 验证数据
    $("#btnSave").click(function () {
        // var instId = $("#instId").val();
        // if(instId == null || instId == ''){
        //     BootboxExt.alert("请选择渠道类型ID");
        //     return;
        // }

        if (addForm.valid()){
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#appConfBody"));
            $.post("/system-data/app-conf/add", $("#appConfForm").serialize(), function (data) {
                $("#btnSave").attr("disabled",false);
                Shade.unblockUI($("#appConfBody"));
                if (data.result == "success"){
                    BootboxExt.alert("新增成功", function (res) {
                        location.href = "/system-data/app-conf/search";
                    });
                } else if(data.result == "isHas"){
                    BootboxExt.alert("该APP应用ID已存在");
                }else{
                    BootboxExt.alert("新增失败", function (res) {
                    });
                }
            });
        }
    });

    // 验证数据
    $("#btnUpdate").click(function () {
        // var instId = $("#instId").val();
        // if(instId == null || instId == ''){
        //     BootboxExt.alert("请选择渠道类型ID");
        //     return;
        // }

        if (addForm.valid()) {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#appConfBody"));
            $.post("/system-data/app-conf/update", $("#updateFrom").serialize(), function (data) {
                $("#btnUpdate").attr("disabled",false);
                Shade.unblockUI($("#appConfBody"));
                if (data.result == true) {
                    BootboxExt.alert("修改成功", function (res) {
                        location.href = "/system-data/app-conf/search";
                    });
                } else {
                    BootboxExt.alert("修改失败", function (res) {
                    });
                }
            });
        }
    });

});





