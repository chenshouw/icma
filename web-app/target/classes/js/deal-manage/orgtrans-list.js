var orgTransVo  = new Object();

function setSearchParam() {
    orgTransVo.transId = $("#transId").val();
    orgTransVo.sysOrderId = $("#sysOrderId").val();
    orgTransVo.txnIdString=$("#txnIdString").val();
    orgTransVo.acqId = $("#acqId").val();

    orgTransVo.issuId = $("#issuId").val();
    orgTransVo.subIssu = $("#subIssu").val();
    orgTransVo.pan = $("#pan").val();
    orgTransVo.orgCode = $("#orgCode").val();

    orgTransVo.txnDateBegin = $("#txnDateBegin").val();
    orgTransVo.txnDateEnd = $("#txnDateEnd").val();
    orgTransVo.settleDateBegin = $("#settleDateBegin").val();
    orgTransVo.settleDateEnd = $("#settleDateEnd").val();

    orgTransVo.teller = $("#teller").val().trim();
    orgTransVo.parProductType = $("#parProductType").val();
    orgTransVo.productType = $("#productType").val();
    orgTransVo.channels = $("#channels").val();

    orgTransVo.settStatus = $("#settStatus").val();
    orgTransVo.shopId = $("#shopId").val().trim();
    orgTransVo.phone = $("#phone").val().trim();
    orgTransVo.empName = $("#empName").val().trim();

    orgTransVo.payGateWayOrderNo = $("#payGateWayOrderNo").val();
    orgTransVo.thirdPartyCode = $("#thirdPartyCode").val();

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

    /*orgTransVo.uploadDateBegin = $("#uploadDateBegin").val();
    orgTransVo.uploadDateEnd = $("#uploadDateEnd").val();*/
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

function changeTxnId() {
    var txnId1 = $("#txnId1").val();
    $("#txnIdString").val(txnId1);
}

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
            data: orgTransVo,
            url: "/trans/deal-manage/org-trans/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI(el);
                $('#export').removeClass('disabled');
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/trans/deal-manage/org-trans/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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
