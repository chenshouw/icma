var txnIdForm = $('#txnIdForm');
txnIdForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        txnId: {
            required: true,
            gteq: 0,
            tidLength:22
        },
        txnName: {
            required: true,
            stringMaxLength: 200
        },
        txnType: {
            stringMaxLength: 30
        },
        procDll: {
            stringMaxLength: 60
        },
        procMeth: {
            stringMaxLength: 60
        },
        modDll: {
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
    // 验证数据
    $("#btnSave").click(function () {
        var txnId = $("#txnId").val();
        if (txnId == null || txnId == "") {
            BootboxExt.alert("请输入交易码ID");
            return false;
        }
        if (!/^-?\d*$/.test(txnId)) {
            BootboxExt.alert("交易码ID必须为整数");
            return false;
        }
        if (dataValid() && txnIdForm.valid()) {
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#txnIdBody"));
            $.post("/system-param/txn-id/txn-id-add", $("#txnIdForm").serialize(), function (data) {
                $("#btnSave").attr("disabled",false);
                Shade.unblockUI($("#txnIdBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function (res) {
                        location.href = "/system-param/txn-id/txn-id-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function (res) {
                    });
                }
            });
        }
    });

    // 验证数据
    $("#btnUpdate").click(function () {
        if (dataValid()) {
            $("#btnUpdate").attr("disabled",true);
            Shade.blockUI($("#txnIdBody"));
            $.post("/system-param/txn-id/txn-id-update", $("#txnIdForm").serialize(), function (data) {
                $("#btnUpdate").attr("disabled",false);
                Shade.unblockUI($("#txnIdBody"));
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/system-param/txn-id/txn-id-search";
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

function dataValid() {
    var txnName = $("#txnName").val();
    var crFlag = $("#crFlag").val();
    var insTrans = $("#insTrans").val();
    var doOrders = $("#doOrders").val();
    var settFlag = $("#settFlag").val();
    var profFlag = $("#profFlag").val();
    var revFlag = $("#revFlag").val();
    if (txnName == null || txnName == "") {
        BootboxExt.alert("请输入交易码名称");
        return false;
    }
    if (crFlag == null || crFlag == "") {
        BootboxExt.alert("请选择CR_FLAG");
        return false;
    }
    if (insTrans == null || insTrans == "") {
        BootboxExt.alert("请选择INS_TRANS");
        return false;
    }
    if (doOrders == null || doOrders == "") {
        BootboxExt.alert("请选择DO_ORDERS");
        return false;
    }
    if (settFlag == null || settFlag == "") {
        BootboxExt.alert("请选择SETT_FLAG");
        return false;
    }
    if (profFlag == null || profFlag == "") {
        BootboxExt.alert("请选择是否参加分润");
        return false;
    }
    if (revFlag == null || revFlag == "") {
        BootboxExt.alert("请选择是否引发冲正");
        return false;
    }
    return true;
}

function txnIdDel(txnId) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/system-param/txn-id/txn-id-delete", {"txnId": txnId}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert(data.msg, function () {
                        location.href = "/system-param/txn-id/txn-id-search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function () {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}