function deleteProAccManage(accAttrCode) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/media/product/accManage/delete", { accAttrCode: accAttrCode}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/media/product/accManage/search";
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

jQuery(document).ready(function () {
    $("#updateTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#updateTimeEnd").datetimepicker("setStartDate", $("#updateTimeBegin").val());
        $("#updateTimeBegin").datetimepicker("hide");
    });
    $("#updateTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#updateTimeBegin").datetimepicker("setEndDate", $("#updateTimeEnd").val());
        $("#updateTimeEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#updateTimeBeginClear").click(function () {
        $("#updateTimeBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#updateTimeEndClear").click(function () {
        $("#updateTimeEnd").val("");
    });
});



