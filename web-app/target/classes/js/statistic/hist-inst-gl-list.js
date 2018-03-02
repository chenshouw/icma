/**
 * 查询导出excel。
 */
$("#export").click(function () {
    $('#export').attr('disabled', true);
    var el = $("#listBody");
    Shade.blockUI(el);
    $.post("/general-ledger/hist-inst-gl/export", $("#histInstGlForm").serialize(), function (data) {
        Shade.unblockUI(el);
        $('#export').attr('disabled', false);
        if (data.code == 1) {
            var tempName = data.tempName;
            var fileName = data.fileName;
            var loadUrl = "/general-ledger/hist-inst-gl/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
            window.location.href = loadUrl;
        } else {
            BootboxExt.alert(data.msg, function () {
            });
        }
    },"json").error(function()
    {
        $('#export').attr('disabled', false);
        Shade.unblockUI(el);
        BootboxExt.alert("网络异常，请联系维护人员", function (res) {});
    });


});


var instGlInfoVo = new Object();
function setSearchParam() {
    instGlInfoVo.instId = $("#instId").val();
    instGlInfoVo.productType = $("#productType").val();
    instGlInfoVo.accType = $("#accType").val();

    instGlInfoVo.selectStatus = $("#selectStatus").val();
    instGlInfoVo.selectDayBegin = $("#selectDayBegin").val();
    instGlInfoVo.selectDayEnd = $("#selectDayEnd").val();
    instGlInfoVo.selectMonthBegin = $("#selectMonthBegin").val();
    instGlInfoVo.selectMonthEnd = $("#selectMonthEnd").val();
    instGlInfoVo.selectYearBegin = $("#selectYearBegin").val();
    instGlInfoVo.selectYearEnd = $("#selectYearEnd").val();
    instGlInfoVo.selectYearQuarter = $("#selectYearQuarter").val();
    instGlInfoVo.selectQuarter = $("#selectQuarter").val();
}

jQuery(document).ready(function () {
    $("#settDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settDateEnd").datetimepicker("setStartDate", $("#settDateBegin").val());
        $("#settDateBegin").datetimepicker("hide");
    });
    $("#settDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settDateBegin").datetimepicker("setEndDate", $("#settDateEnd").val());
        $("#settDateEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#settDateBeginClear").click(function () {
        $("#settDateBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#settDateEndClear").click(function () {
        $("#settDateEnd").val("");
    });


    /**
     * 按日期查询。
     */
    $("#selectDayBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#selectDayEnd").datetimepicker("setStartDate", $("#selectDayBegin").val());
        $("#selectDayBegin").datetimepicker("hide");
    });
    $("#selectDayEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView:"month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#selectDayBegin").datetimepicker("setEndDate", $("#selectDayEnd").val());
        $("#selectDayEnd").datetimepicker("hide");
    });
    /**
     * 按日开始时间清空事件
     */
    $("#selectDayBeginClear").click(function () {
        $("#selectDayBegin").val("");
    });
    /**
     * 按日结束时间清空事件
     */
    $("#selectDayEndClear").click(function () {
        $("#selectDayEnd").val("");
    });


    /**
     * 按月份查询。
     */
    $("#selectMonthBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        startView: "year",
        minView: "year",
        format: "yyyy-mm",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#selectMonthEnd").datetimepicker("setStartDate", $("#selectMonthBegin").val());
        $("#selectMonthBegin").datetimepicker("hide");
    });
    $("#selectMonthEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        startView: "year",
        minView: "year",
        format: "yyyy-mm",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#selectMonthBegin").datetimepicker("setEndDate", $("#selectMonthEnd").val());
        $("#selectMonthEnd").datetimepicker("hide");
    });
    /**
     * 按月开始时间清空事件
     */
    $("#selectMonthBeginClear").click(function () {
        $("#selectMonthBegin").val("");
    });
    /**
     * 按月结束时间清空事件
     */
    $("#selectMonthEndClear").click(function () {
        $("#selectMonthEnd").val("");
    });


    /**
     * 按年份查询。
     */
    $("#selectYearBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        startView: 4,   minView: 4,
        format: "yyyy",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#selectYearEnd").datetimepicker("setStartDate", $("#selectYearBegin").val());
        $("#selectYearBegin").datetimepicker("hide");
    });
    $("#selectYearEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        startView: 4,   minView: 4,
        format: "yyyy",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#selectYearBegin").datetimepicker("setEndDate", $("#selectYearEnd").val());
        $("#selectYearEnd").datetimepicker("hide");
    });
    /**
     * 按年开始时间清空事件
     */
    $("#selectYearBeginClear").click(function () {
        $("#selectYearBegin").val("");
    });
    /**
     * 按年结束时间清空事件
     */
    $("#selectYearEndClear").click(function () {
        $("#selectYearEnd").val("");
    });


    /**
     * 选择年份。
     */
    $("#selectYearQuarter").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        startView: 4,
        minView: 4,
        format: "yyyy",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#selectYearQuarter2").datetimepicker("setStartDate", $("#selectYearQuarter").val());
        $("#selectYearQuarter").datetimepicker("hide");
    });

    $("#selectYearQuarter2").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        startView: 4,   minView: 4,
        format: "yyyy",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#selectYearQuarter").datetimepicker("setEndDate", $("#selectYearQuarter2").val());
        $("#selectYearQuarter2").datetimepicker("hide");
    });


    /**
     * 选择年份时间清空事件
     */
    $("#selectYearQuarterClear").click(function () {
        var selectQuarter = $("#selectQuarter").val();
        if (null != selectQuarter && "" != selectQuarter) {
            BootboxExt.alert("请先选择年份才能使用季度查询条件");
        } else {
            $("#selectYearQuarter").val("");
        }

    });

});

function changeInstId(id){
    $(".redss").val(id);
};

/**
 * 选择的操作。
 */
function selectOpt(){
    var selectStatus = $("#selectStatus").val();

    if ('' != selectStatus && null != selectStatus) {
        if(selectStatus == 0) {
            $("#monthOpt").hide();
            $("#yearOpt").hide();
            $("#yearQuarterOpt").hide();
            $("#quarterOpt").hide();
            $("#dayOpt").show();
            $("#selectMonthBegin").val("");
            $("#selectMonthEnd").val("");
            $("#selectYearBegin").val("");
            $("#selectYearEnd").val("");
            $("#selectYearQuarter").val("");
            $("#selectQuarter").val("");
        } else if (selectStatus == 1) { //按月查询
            $("#dayOpt").hide();
            $("#yearOpt").hide();
            $("#yearQuarterOpt").hide();
            $("#quarterOpt").hide();
            $("#monthOpt").show();
            $("#selectDayBegin").val("");
            $("#selectDayEnd").val("");
            $("#selectYearBegin").val("");
            $("#selectYearEnd").val("");
            $("#selectYearQuarter").val("");
            $("#selectQuarter").val("");
        } else if(selectStatus == 2) {  //按季查询
            $("#dayOpt").hide();
            $("#monthOpt").hide();
            $("#yearOpt").hide();
            $("#yearQuarterOpt").show();
            $("#quarterOpt").show();
            $("#selectDayBegin").val("");
            $("#selectDayEnd").val("");
            $("#selectMonthBegin").val("");
            $("#selectMonthEnd").val("");
            $("#selectYearBegin").val("");
            $("#selectYearEnd").val("");
        } else if(selectStatus == 3) { //按年查询
            $("#dayOpt").hide();
            $("#monthOpt").hide();
            $("#yearQuarterOpt").hide();
            $("#quarterOpt").hide();
            $("#yearOpt").show();
            $("#selectDayBegin").val("");
            $("#selectDayEnd").val("");
            $("#selectMonthBegin").val("");
            $("#selectMonthEnd").val("");
            $("#selectYearQuarter").val("");
            $("#selectQuarter").val("");
        }
    } else {
        $("#dayOpt").hide();
        $("#monthOpt").hide();
        $("#yearQuarterOpt").hide();
        $("#quarterOpt").hide();
        $("#yearOpt").hide();
    }
}

function changeQuarter(){
    var selectYearQuarter = $("#selectYearQuarter").val();
    var selectStatus = $("#selectStatus").val();
    if ((null == selectYearQuarter || '' == selectYearQuarter) && selectStatus == '2') {
        BootboxExt.alert("请先选择年份", function (res) {
            $("#selectQuarter").val("");
        });
    }

}