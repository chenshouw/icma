var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        // issuId: {
        //     required: true,
        //     stringMaxLength: 60
        // },
        sksj: {
            tidLength: 10,
            required: true,
            onlynum: true,
            remote: {
                url: "/sell-card/receipt-voucher/nameUnique",
                type: "POST",
                dataType: "json",
                data: {
                    sksj: function () {
                        return $("#sksj").val();
                    }
                }
            }
        },
        custNo: {
            tidLength: 10,
            onlynum: true
        },
        popAmt: {
            onlyamount: 12,
            required: true
        },
        usedAmt: {
            onlyamount: 12,
            required: true
        },
        ztzjAmt: {
            onlyamount: 12,
            required: true
        },
        payer: {
            required: true,
            maxlength: 30
        },
        memo: {
            maxlength: 166
        }
    },
    messages: {
        sksj: {
            remote: "该收款收据号已存在，请重新输入"
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

function isSelectIssuId() {
    var flag = true;
    var issuId = $("#issuId").val();
    if (issuId == null || ''== issuId) {
        BootboxExt.alert("请选择发卡机构");
        flag = false;
    }
    return flag;
}

$(function () {
    $("#btnSave").click(function () {
        if (addForm.valid() && isSelectIssuId()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/sell-card/receipt-voucher/add",
                $("#addForm").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {

                            location.href = "/sell-card/receipt-voucher/search";
                        });
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });
});


/**
 * 机构树
 */
$("#tree_cl").jstree({
    "core": {
        "themes": {
            "stripes": true,
        },
        "animation": 0,
        'data': {
            'url': function (node) {
                return '/insts/getInstTree/1';
            }
        }
    },
    "types": {
        "default": {
            "icon": "glyphicon glyphicon-flash"
        },
        "demo": {
            "icon": "glyphicon glyphicon-ok"
        }
    },
    "plugins": ["contextmenu", "types"],
    "contextmenu": {
        "items": {}
    }
}).on('change.jstree', function (e, data) {
}).bind('select_node.jstree', function (e, data) {
    $("#issuId").val(data.instance.get_node(data.selected[0]).id);
    //alert(data.instance.get_node(data.selected[0]).id);
}).bind("loaded.jstree", function (e, data) {
    var inst = data.instance;
    var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
    inst.select_node(obj);
    data.instance.open_all();
});





