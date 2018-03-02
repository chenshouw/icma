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
});

/**
 * 时间格式化
 * @param oSettings
 * @param value
 * @returns
 */
function dateFormat(oSettings, value) {
    return new Date(value).format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 消息-状态
 * @param oSettings
 * @param value
 * @returns
 */
function fnStatus(oSettings, value) {
    return ItemInfo.getName(value, "MESSAGE_STATUS");
}

/**
 * 消息详情-状态
 * @param oSettings
 * @param value
 * @returns
 */
function fnDetailStatus(oSettings, value) {
    return ItemInfo.getName(value, "MESSAGE_DETAIL_STATUS");
}

/**
 * 详细详情-模式
 * @param oSettings
 * @param value
 * @returns
 */
function fnDetailModel(oSettings, value) {
    return ItemInfo.getName(value, "MESSAGE_DETAIL_MODEL");
}

/**
 * 填充数据。
 * @param message
 */
function fullMessage(message) {
    $("#message_msgId").html(message.msgId);
    $("#message_keys").html(message.keys);
    $("#message_topic").html(message.topic);
    $("#message_tags").html(message.tags);
    $("#message_createTime").html(dateFormat(null, message.createTime));
    $("#message_updateTime").html(dateFormat(null, message.updateTime));
    $("#message_status").html(fnStatus(null, message.status));
    $("#message_consumer_num").html(message.consumerNum);
    $("#message_message").html(message.message);
}

/**
 * 异步获取数据列表
 */
function searchDetailData(id) {
    $.ajax({
        type: "POST",
        data: {id: id},
        url: "/system-data/rocket-mq/detail",
        dataType: "json",
        success: function (data) {
            fullMessage(data.message);//填充数据
            var oTable = $('#detail_table').dataTable();
            //清空数据
            oTable.fnClearTable();
            // 返回数据
            $.each(data.list, function (i, item) {
                //往表格中添加数据
                oTable.fnAddData(item);
            });
            jQuery('#detail_table tbody tr .checkboxes').change(function () {
                $(this).parents('tr').toggleClass("active");
            });
        }
    });
}

/**
 * 初始化表格(消费详情)
 */
function init() {
    if (!jQuery().dataTable) {
        return;
    }
    var oTable = $('#detail_table').dataTable({
        "bFilter": false,//过滤功能
        "bSort": false,//排序功能
        "bInfo": false,//是否显示分页信息
        "bPaginate": false,//是否显示跳转分页
        "striped": true,  //表格显示条纹
        "aaSorting": [],//默认第一列初始化时不排序
        "aoColumns": [
            {"sTitle": "消费组", 'mData': 'groupName'},
            {"sTitle": "IP", 'mData': 'ip'},
            {"sTitle": "模式", 'mData': 'model', "fnRender": fnDetailModel},
            {"sTitle": "状态", 'mData': 'status', "fnRender": fnDetailStatus},
            {"sTitle": "时间", 'mData': 'createTime', "fnRender": dateFormat}
        ],
        "oLanguage": {
            "oPaginate": {"sFirst": "首页", "sPrevious": "上一页", "sNext": "下一页", "sLast": "尾页"},
            "sEmptyTable": "<span style='color:red'></span>",
            "sInfo": "显示 _START_ 到 _END_ 共 _TOTAL_ 条记录",
            "sInfoEmpty": "显示 0 到 0 共 0 条记录",
            "sInfoFiltered": "(从 _MAX_ 条记录查找)",
            "sLengthMenu": "每页 _MENU_ 条",
            "sLoadingRecords": "请稍后-加载...",
            "sProcessing": "正在处理...",
            "sSearch": "查找",
            "sZeroRecords": "<span style='color:red'>没有匹配的数据</span>"
        }
    });
    jQuery('#data_table_list_wrapper .dataTables_filter input').addClass("form-control input-medium"); // modify table search input
}

init();