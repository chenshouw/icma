var orderVo = new Object();
function setSearchParam() {
    orderVo.userId = $("#userId").val();
    orderVo.orderId = $("#orderId").val();
    orderVo.status = $("#status").val();
    orderVo.txnTimeBegin = $("#txnTimeBegin").val();
    orderVo.txnTimeEnd = $("#txnTimeEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#txnTimeBegin").datetimepicker({
        language: 'ja',
        timePicker: false,
        startView: "year",
        minView: "year",
        format: "yyyy-mm",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnTimeEnd").datetimepicker("setStartDate", $("#txnTimeBegin").val());
        $("#txnTimeBegin").datetimepicker("hide");
    });
    $("#txnTimeEnd").datetimepicker({
        language: 'ja',
        timePicker: false,
        startView: "year",
        minView: "year",
        format: "yyyy-mm",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#txnTimeBegin").datetimepicker("setEndDate", $("#txnTimeEnd").val());
        $("#txnTimeEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#txnTimeBeginClear").click(function () {
        $("#txnTimeBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#txnTimeEndClear").click(function () {
        $("#txnTimeEnd").val("");
    });
});

function grant() {
    window.location.href="/welfare/staff-welfare/to-add";
    // $.ajax({
    //     url: "/welfare/staff-welfare/check",
    //     dataType: 'json',
    //     method: 'POST',
    //     success: function (data) {
    //         console.log(data);
    //         if (data.result){
    //             window.location.href="/welfare/staff-welfare/to-add";
    //         }else {
    //             BootboxExt.alert(data.msg);
    //         }
    //     },
    //     error: function () {
    //     }
    // });
}

/**
 * 下载模板
 */
function down() {
    Shade.blockUI($("#listBody"));
    var fileName = "员工福利.xlsx";
    var loadUrl = "/welfare/staff-welfare/down?fileName=" + fileName;
    window.location.href = loadUrl;
    Shade.unblockUI($("#listBody"));
}


/**
 * 查看详情
 * @param batchNo
 */
function findDetail(batchNo) {
    $("#batchNos").val(batchNo);
    // $("#detailForm").action("/welfare/staff-welfare/to-cardDetail/" + batchNo);
    $("#detailForm").submit();
    Shade.blockUI($(".page-content"));
}

/**
 * 下载历史福利文件。
 * @param fileName
 * @param path
 */
function downWelfareFile(fileName, path) {
    var loadUrl = "/welfare/staff-welfare/downFile?fileName=" + fileName + "&path=" + path;
    window.location.href = loadUrl;
}