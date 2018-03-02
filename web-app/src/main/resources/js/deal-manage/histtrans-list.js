var histTransVo = new Object();

function setSearchParam() {
    histTransVo.transId = $("#transId").val();
    histTransVo.sysOrderId = $("#sysOrderId").val();
    histTransVo.txnIdString=$("#txnIdString").val();
    histTransVo.acqId = $("#acqId").val();

    histTransVo.issuId = $("#issuId").val();
    histTransVo.subIssu = $("#subIssu").val();
    histTransVo.pan = $("#pan").val();
    histTransVo.orgCode = $("#orgCode").val();

    histTransVo.txnDateBegin = $("#txnDateBegin").val();
    histTransVo.txnDateEnd = $("#txnDateEnd").val();
    histTransVo.settleDateBegin = $("#settleDateBegin").val();
    histTransVo.settleDateEnd = $("#settleDateEnd").val();

    histTransVo.teller = $("#teller").val().trim();
    histTransVo.parProductType = $("#parProductType").val();
    histTransVo.productType = $("#productType").val();
    histTransVo.channels = $("#channels").val();

    histTransVo.settStatus = $("#settStatus").val();
    histTransVo.shopId = $("#shopId").val();
    histTransVo.phone = $("#phone").val();
    histTransVo.empName = $("#empName").val();

    histTransVo.payGateWayOrderNo = $("#payGateWayOrderNo").val();
    histTransVo.thirdPartyCode = $("#thirdPartyCode").val();

    var txnIdString = $("#txnIdString").val();
    if (txnIdString != null && txnIdString != "") {
        var array = txnIdString.split(",");
        var oldnumber = new Array();
        for (var i = 0; i < array.length; i++) {
            oldnumber.push(array[i]);
        }

        var sel=document.getElementById("txnId1");
        var len=sel.options.length;
        for(var i=0;i<oldnumber.length;i++){
            for(var j=0;j<len;j++){
                if(sel.options[j].value==oldnumber[i]){
                    sel.options[j].setAttribute("selected",true);
                    break;
                }
            }
        }
    }
}

function changeTxnId() {
    var txnId1 = $("#txnId1").val();
    $("#txnIdString").val(txnId1);
}

function settStatusChange() {
    var settStatus = $("#settStatus1").val();
    $("#settStatus").val(settStatus);
}

jQuery(document).ready(function () {
    setSearchParam();
    /**
     * 交易日期
     */
    $("#txnDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: "month",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnDateEnd").datetimepicker("setStartDate", $("#txnDateBegin").val());
        $("#txnDateBegin").datetimepicker("hide");
    });
    $("#txnDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: "month",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnDateBegin").datetimepicker("setEndDate", $("#txnDateEnd").val());
        $("#txnDateEnd").datetimepicker("hide");
    });
    /**
     * 交易日期开始时间清空事件
     */
    $("#txnDateBeginClear").click(function () {
        $("#txnDateBegin").val("");
    });
    /**
     * 交易日期结束时间清空事件
     */
    $("#txnDateEndClear").click(function () {
        $("#txnDateEnd").val("");
    });

    /**
     * 清算日期
     */
    $("#settleDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: "month",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settleDateEnd").datetimepicker("setStartDate", $("#settleDateBegin").val());
        $("#settleDateBegin").datetimepicker("hide");
    });
    $("#settleDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: "month",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#settleDateBegin").datetimepicker("setEndDate", $("#settleDateEnd").val());
        $("#settleDateEnd").datetimepicker("hide");
    });
    /**
     * 清算日期开始时间清空事件
     */
    $("#settleDateBeginClear").click(function () {
        $("#settleDateBegin").val("");
    });
    /**
     * 清算日期结束时间清空事件
     */
    $("#settleDateEndClear").click(function () {
        $("#settleDateEnd").val("");
    });

});



$(function () {
    /**
     * 终端查询导出excel。
     */
    $("#export").click(function () {
        $('#export').addClass('disabled');
        var el = $("#listBody");
        Shade.blockUI(el);
        $.ajax({
            type: "POST",
            data: histTransVo,
            url: "/trans/deal-manage/hist-trans/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI(el);
                $('#export').removeClass('disabled');
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/trans/deal-manage/hist-trans/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
                    window.location.href = loadUrl;
                } else {
                    BootboxExt.alert(data.msg, function () {
                    });
                }
            },
            error: function () {
                Shade.unblockUI(el);
                $('#export').removeClass('disabled');
                BootboxExt.alert("网络异常，请联系维护人员", function () {
                });
            }
        });
    });
})
