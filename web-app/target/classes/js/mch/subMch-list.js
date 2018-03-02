/**
 * 新增。
 */
function toAdd() {
    Shade.blockUI($('body'));
    window.location.href = "/mch/sub/to-add";
}

/**
 * 修改。
 * @param subMid 子商户号
 */
function toUpdateSubMchInfo(subMid) {
    Shade.blockUI($('body'));
    window.location.href = "/mch/sub/to-update?subMid=" + subMid;
}

/**
 * 删除。
 * @param subMid 子商户号
 */
function deleteSubMchInfo(subMid) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/mch/sub/delete", {subMid: subMid}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/mch/sub/search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

/**
 * 详情。
 * @param subMid 子商户号
 */
function viewSubMchInfo(subMid) {
    Shade.blockUI($('body'));
    window.location.href = "/mch/sub/view?subMid=" + subMid;
}

var subMchInfoVo = new Object();

function setSearchParam() {
    subMchInfoVo.subMid = $("#subMid").val();
    subMchInfoVo.subMidName = $("#subMidName").val();
    subMchInfoVo.mid = $("#mid").val();
    subMchInfoVo.flag = $("#flag").val();
    subMchInfoVo.modifyDateBegin = $("#modifyDateBegin").val();
    subMchInfoVo.modifyDateEnd = $("#modifyDateEnd").val();
}

jQuery(document).ready(function () {
    setSearchParam();
    $("#modifyDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modifyDateEnd").datetimepicker("setStartDate", $("#modifyDateBegin").val());
        $("#modifyDateBegin").datetimepicker("hide");
    });
    $("#modifyDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modifyDateBegin").datetimepicker("setEndDate", $("#modifyDateEnd").val());
        $("#modifyDateEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#modifyDateBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#modifyDateEnd").val("");
    });
});
