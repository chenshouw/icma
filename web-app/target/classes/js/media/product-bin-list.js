function deleteProductBin(productBin) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/media/product/bin/delete", { productBin: productBin}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/media/product/bin/search";
                    });
                }else{
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}
var productBinVo = new Object();
function setSearchParam() {
    productBinVo.productBin = $("#productBin").val();
    productBinVo.issuId = $("#issuId").val();
    productBinVo.lmIssuId = $("#lmIssuId").val();
    productBinVo.productType = $("#productType").val();
    productBinVo.status = $("#status").val();
    productBinVo.modiDateBegin = $("#modiDateBegin").val();
    productBinVo.modifyDateEnd = $("#modifyDateEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#modiDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modiDateEnd").datetimepicker("setStartDate", $("#modiDateBegin").val());
        $("#modiDateBegin").datetimepicker("hide");
    });
    $("#modiDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modiDateBegin").datetimepicker("setEndDate", $("#modiDateEnd").val());
        $("#modiDateEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#modiDateBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#modiDateEnd").val("");
    });
});



