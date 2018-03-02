function deleteMk(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/marketing/activity/delete", { id: id}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/marketing/activity/search";
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

function refreshCache(){
    $("#refreshCacheBtn").attr("disabled", true);
    $.get("/marketing/activity/refreshCache", function (data)
    {
        if(data.result == true){
            BootboxExt.alert("刷新成功", function (res) {
                $("#refreshCacheBtn").attr("disabled", false);
                location.href = "/marketing/activity/search";
            });
        }else{
            BootboxExt.alert("删除失败", function (res) {
                $("#refreshCacheBtn").attr("disabled", false);
                window.location.reload();
            });
        }
    }, "json");
}

function publishAct(id) {
    BootboxExt.confirm("确认发布该活动吗？", function (res) {
        if (res) {
            $.get("/marketing/activity/publishAct", { id: id}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("发布成功", function (res) {
                        location.href = "/marketing/activity/search";

                    });
                }else{
                    BootboxExt.alert("发布失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

function downAct(id) {
    BootboxExt.confirm("确认下架该活动吗？", function (res) {
        if (res) {
            $.get("/marketing/activity/undercarriage", { id: id}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("下架成功", function (res) {
                        location.href = "/marketing/activity/search";
                        $("#btn2").val("已下架");
                        $("#btn2").attr("disabled", true);
                    });
                }else{
                    BootboxExt.alert("下架失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

var activityVo = new Object();
function setSearchParam() {
    activityVo.title = $("#title").val();
    activityVo.status = $("#status").val();
    activityVo.startTimeBegin = $("#startTimeBegin").val();
    activityVo.startTimeEnd = $("#startTimeEnd").val();
    activityVo.endTimeBegin = $("#endTimeBegin").val();
    activityVo.endTimeEnd = $("#endTimeEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#startTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#startTimeEnd").datetimepicker("setStartDate", $("#startTimeBegin").val());
        $("#startTimeBegin").datetimepicker("hide");
    });
    $("#startTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#startTimeBegin").datetimepicker("setEndDate", $("#startTimeEnd").val());
        $("#startTimeEnd").datetimepicker("hide");
    });

    $("#endTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#endTimeEnd").datetimepicker("setStartDate", $("#endTimeBegin").val());
        $("#endTimeBegin").datetimepicker("hide");
    });
    $("#endTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#endTimeBegin").datetimepicker("setEndDate", $("#endTimeEnd").val());
        $("#endTimeEnd").datetimepicker("hide");
    });

    /**
     * 活动开始清空事件
     */
    $("#startTimeBeginClear").click(function () {
        $("#startTimeBegin").val("");
    });
    /**
     * 活动开始结束时间清空事件
     */
    $("#startTimeEndClear").click(function () {
        $("#startTimeEnd").val("");
    });
    /**
     * 活动结束开始时间清空事件
     */
    $("#endTimeBeginClear").click(function () {
        $("#endTimeBegin").val("");
    });
    /**
     * 活动结束时间清空事件
     */
    $("#endTimeEndClear").click(function () {
        $("#endTimeEnd").val("");
    });
});
