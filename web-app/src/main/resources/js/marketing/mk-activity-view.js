/**
 * Created by vip on 2017/8/3.
 */
/**
 * 初始化产品信息表格数据。
 */
function viewProductTable() {
    //先销毁表格
    $('#product_table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#product_table").bootstrapTable({
        method: "get",  //使用post请求到服务器获取数据
        url: '/marketing/activity/view-product-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        pagination: true, //是否显示分页（*）
        pageNumber:1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:'',
        queryParams:viewQueryParams,
        singleSelect : false,
        uniqueId: "productType",
        columns: [
            {
                field: 'checked',
                checkbox: true
            }, {
                field: 'productType',
                title: '产品类型'
            }, {
                field: 'productName',
                title: '产品名称'
            }],
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        },
        formatNoMatches: function () {  //没有匹配的结果
            return '无符合条件的记录';
        },
        onLoadError: function (data) {
            $('#product_table').bootstrapTable('removeAll');
        },
    });
}

/**
 * 初始化表格渠道号数据。
 */
function viewChannelTable() {
    //先销毁表格
    $('#channel_table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#channel_table").bootstrapTable({
        method: "get",  //使用post请求到服务器获取数据
        url: '/marketing/activity/view-channel-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        pagination: true, //是否显示分页（*）
        pageNumber:1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType:"",
        queryParams: viewQueryParams,
        singleSelect : false,
        uniqueId: "channelId",
        columns: [
            {
                field: 'checked',
                checkbox: true
            },  {
                field: 'channelId',
                title: '渠道编号'
            }, {
                field: 'channelName',
                title: '渠道名称'
         }],
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        },
        formatNoMatches: function () {  //没有匹配的结果
            return '无符合条件的记录';
        },
        onLoadError: function (data) {
            $('#channel_table').bootstrapTable('removeAll');
        },
    });
}

function viewQueryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        activityId:  $("#id").val(),
    };
    return temp;
}

var type = $("#type").html().trim();
if(type == "购卡"){
    $("#faceValue").show();
    $("#instalment").show();
}
