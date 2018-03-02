var addForm = $('#addForm');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        name: {
            required: true,
            stringMaxLength:50
        },
        code: {
            required: true,
            newCharacterNo2: true,
            stringMaxLength:100
        },
        value: {
            required: true,
            stringMaxLength:300
        },
        memo:{
            stringMaxLength:500
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
        if (addForm.valid()) {
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#systemConfigBody"));
            $.post("/system-data/system-config/add", $("#addForm").serialize(), function (data) {
                $("#btnSave").attr("disabled", false);
                Shade.unblockUI($("#systemConfigBody"));
                if (data.flag) {
                    BootboxExt.alert(data.msg, function (res) {
                        location.href = "/system-data/system-config/search";
                    });
                } else {
                    BootboxExt.alert(data.msg);
                }
            });
        }
    });
    $("#btnUpdate").click(function () {
        if (addForm.valid()) {
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#systemConfigBody"));
            $.post("/system-data/system-config/update", $("#addForm").serialize(), function (data) {
                $("#btnUpdate").attr("disabled", false);
                Shade.unblockUI($("#systemConfigBody"));
                if (data.flag) {
                    BootboxExt.alert(data.msg, function (res) {
                        location.href = "/system-data/system-config/search";
                    });
                } else {
                    BootboxExt.alert(data.msg);
                }
            });
        }
    })
});