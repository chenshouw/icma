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

    //秘钥更新日期
    $("#keyupdTime").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true,
    }).on('changeDate', function (ev) {
        $("#keyupdTime").datetimepicker("hide");
    });

    $("#itemForm").validate({
        errorElement: 'span',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            channels: {
                required: true,
                alnum: true,
                stringMaxLength: 60
            },
            name: {
                required: true,
                stringMaxLength: 100
            },
            productType: {
                required: true
            },
            keyupdTime: {
                required: true
            },
            keyupdPeriod: {
                required: true,
                aintAndZ: true
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
    //新增
    $("#btnSave").click(function () {
        if ($("#itemForm").valid()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("body"));
            $.post(mchannelData.add_link + "?" + new Date().getTime(),
                $("form").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("body"));
                    if (data.code == "success") {
                        BootboxExt.alert(data.msg, function (res) {
                            location.href = mchannelData.list_link;
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
            $.post(mchannelData.update_link + "?" + new Date().getTime(),
                $("form").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("body"));
                    if (data.code == "success") {
                        BootboxExt.alert(data.msg, function (res) {
                            location.href = mchannelData.list_link;
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

var mchannelData = {
    list_link: "/mchannel/mchannel-search",
    add_link: "/mchannel/mchannel-add",
    update_link: "/mchannel/mchannel-update",
    delete_link: "/mchannel/mchannel-delete"
};

/**
 * 删除操作。
 * @param id 主键
 */
function deleteMChannels(channels) {
    BootboxExt.confirm("确认删除吗", function (res) {
        if (res) {
            $.get(mchannelData.delete_link + "?" + new Date().getTime(), {channels: channels}, function (data) {
                if (data.code == "success") {
                    BootboxExt.alert(data.msg, function (res) {
                        location.href = mchannelData.list_link;
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