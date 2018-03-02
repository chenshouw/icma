var lpGoodVo = new Object();

function setSearchParam() {

    lpGoodVo.modiDateBegin = $("#modiDateBegin").val();
    lpGoodVo.modiDateEnd = $("#modiDateEndClear").val();

    lpGoodVo.sid = $("#sid").val();
    lpGoodVo.status = $("#status").val();
}
jQuery(document).ready(function () {
    setSearchParam();
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
});

var lpGoodFrom = $('#lpGoodFrom');
lpGoodFrom.validate({
    focusInvalid: false,
    ignore: "",
    rules: {
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
    /**
     * 锁定商品查询导出excel。
     */
    $("#export").click(function () {
        $("#export").attr('disabled', true);
        var el = $("body");
        Shade.blockUI(el);
        $.ajax({
            type: "POST",
            data: $("#lpGoodFrom").serialize(),
            url: "/lpGood/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI(el);
                $("#export").attr('disabled', false);
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/lpGood/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
                    window.location.href = loadUrl;
                } else {
                    BootboxExt.alert(data.msg, function () {
                    });
                }
            },
            error: function () {
                Shade.unblockUI(el);
                $("#export").attr('disabled', false);
                BootboxExt.alert("网络异常，请联系维护人员", function () {
                });
            }
        });
    });

    //卡类别  修改事件
    $('input[name=cidType]').change(function() {
        var cidTypeLength = $('input[name=cidType]').length;
        for (var i = 1; i <= cidTypeLength; i++) {
            var id = 'cid'+i;
            $('#'+id).val('');
            $('#'+id).select2("val", "");
            $('#'+id).attr('disabled',true);
        }
        var id = 'cid'+$(this).data('id');
        $('#'+id).attr('disabled',false);
    });

});

function deletelpGood(ruleId) {
    BootboxExt.confirm("确认删除吗?", function (res) {
        if (res) {
            $.get("/lpGood/todelete", {ruleId: ruleId}, function (data) {
                if (data.code == true) {
                    BootboxExt.alert(data.msg, function (res) {
                        location.href = "/lpGood/search";
                    });
                } else {
                    BootboxExt.alert(data.msg, function (res) {
                        window.location.reload();
                    });
                }
            });
        }
    });
};


