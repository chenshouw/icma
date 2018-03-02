jQuery(document).ready(function () {
    $("#createTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createTimeEnd").datetimepicker("setStartDate", $("#createTimeBegin").val());
        $("#createTimeBegin").datetimepicker("hide");
    });
    $("#createTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#createTimeBegin").datetimepicker("setEndDate", $("#createTimeEnd").val());
        $("#createTimeEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#createTimeBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#createTimeEnd").val("");
    });

    $("#itemForm").validate({
        errorElement: 'span',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            memo: {stringMaxLength: 200},
            /*teller: {stringMaxLength: 20},*/
            status: {required: true},
            /*rptDlv: {stringMaxLength: 2},*/
            /*cliType: {stringMaxLength: 22},*/
            sec: {stringMaxLength: 20},
            auditor: {stringMaxLength: 20},
            orgCode: {stringMaxLength: 20},
            company: {stringMaxLength: 60},
            certNo: {idcardno: true, stringMaxLength: 18},
            ywyId: {stringMaxLength: 20},
            cliPhone2: {mobile: true, stringMaxLength: 20},
            cliPhone1: {mobile: true, stringMaxLength: 20},
            cliCaller: {stringMaxLength: 40},
            cliAddr: {stringMaxLength: 100},
            issuId: {required: true, stringMaxLength: 60},
            cliName: {required: true, stringMaxLength: 100},
            custNo: {required: true, alnum: true, stringMaxLength: 20}
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
    //新增
    $("#btnSave").click(function () {
        if ($("#itemForm").valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("body"));
            $.post(mcustInfoData.add_link + "?" + new Date().getTime(),
                $("form").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("body"));
                    if (data.code == "success") {
                        BootboxExt.alert(data.msg, function (res) {
                            location.href = mcustInfoData.list_link;
                        });
                    } else {
                        BootboxExt.alert(data.msg, function (res) {
                            // window.location.reload();
                        });
                    }
                })
        }
    });

    //修改
    $("#btnUpdate").on("click", function () {
        if ($("#itemForm").valid()) { //验证通过
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("body"));
            $.post(mcustInfoData.update_link + "?" + new Date().getTime(),
                $("form").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("body"));
                    if (data.code == "success") {
                        BootboxExt.alert(data.msg, function (res) {
                            location.href = mcustInfoData.list_link;
                        });
                    } else {
                        BootboxExt.alert(data.msg, function (res) {
                            // window.location.reload();
                        });
                    }
                })
        }
    });
});

var mcustInfoData = {
    list_link: "/mcustInfo/mcustInfo-search",
    add_link: "/mcustInfo/mcustInfo-add",
    update_link: "/mcustInfo/mcustInfo-update",
    delete_link: "/mcustInfo/mcustInfo-delete"
};
/**
 * 删除操作。
 * @param id 主键
 */
function deleteMcustInfo(custNo) {
    BootboxExt.confirm("确认删除吗", function (res) {
        if (res) {
            $.get(mcustInfoData.delete_link + "?" + new Date().getTime(), {custNo: custNo}, function (data) {
                if (data.code == "success") {
                    BootboxExt.alert(data.msg, function (res) {
                        location.href = mcustInfoData.list_link;
                    });
                } else {
                    BootboxExt.alert(data.msg, function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}