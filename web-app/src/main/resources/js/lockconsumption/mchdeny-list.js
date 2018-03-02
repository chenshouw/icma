var mchdenyVo = new Object();

function setSearchParam() {

    mchdenyVo.modiDateBegin = $("#modiDateBegin").val();
    mchdenyVo.modiDateEnd = $("#modiDateEndClear").val();

    /*mchdenyVo.sid = $("#sid").val();
    mchdenyVo.sidType = $('#sidType');*/
    mchdenyVo.status = $("#status").val();
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
    $("#modiDateBeginClear").click(function () {
        $("#modiDateBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#modiDateEndClear").click(function () {
        $("#modiDateEnd").val("");
    });
});

var mchdenyFrom = $('#mchdenyFrom');
mchdenyFrom.validate({
    focusInvalid: false,
    ignore: "",
    rules: {
    },
    highlight: function (element) {
        $(element)
            .closest('.form-group').addClass('has-error');
    },

    unhighlight: function (element) {
        $(element)
            .closest('.form-group').removeClass('has-error');
    },

    success: function (label) {
        label
            .closest('.form-group').removeClass('has-error');
    }
});
$(function () {
    $("#btnSearch").click(function () {
        if (mchdenyFrom.valid()) { //验证通过
            $("#mchdenyFrom").serialize();
            mchdenyFrom.method = "post";
            mchdenyFrom.action = "/mchdeny/search";
            mchdenyFrom.submit();
        }
    });

    /**
     * 禁止商户查询导出excel。
     */
    $("#export").click(function () {
        $("#export").attr('disabled', true);
        var el = $("#mchdenyBody");
        Shade.blockUI(el);
        $.ajax({
            type: "POST",
            data: $("#mchdenyFrom").serialize(),
            url: "/mchdeny/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI(el);
                $("#export").attr('disabled', false);
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/mchdeny/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
                    window.location.href = loadUrl;
                } else {
                    BootboxExt.alert(data.msg, function () {
                    });
                }
            },
            error: function () {
                BootboxExt.alert("网络异常，请联系维护人员", function () {
                });
            }
        });
    });

    //卡类别  修改事件
    $('input[name=cidType]').change(function() {
        var cidTypeLength = $('input[name=cidType]').length;
        for (var i = 1; i <= cidTypeLength; i++) {
            var id = 'cid'+i;
            $('#'+id).val('');
            $('#cid').val('');
            $('#'+id).find("option").eq('').attr("selected","selected");
            $('#'+id).attr('disabled',true);
            $('#'+id).parent().find('.select2-chosen').text('');
        }
        var id = 'cid'+$(this).data('id');
        $('#'+id).attr('disabled',false);
    });

    var val = $('input:radio[name=cidType]:checked').val();
    if(null != val && '' != val){
        //卡判别方式的 已选类型 通过id查找相应的消费类型
        var str = $('input:radio[name=cidType]:checked').attr('id');
        var i = str.substr(str.length-1,1);
        //封装cid字段的 id值
        var id = 'cid'+i;

        //获取数据中存储的cid字段值
        var cid = $('#cid').val();

        //cid字段值显示
        $('#'+id).find("option").eq('').attr("selected",false);
        $('#'+id).attr("value",'');
        $('#'+id).val('');
        $('#'+id).val(cid);
        $('#'+id).attr("value",cid);

        var text = $('#'+id).find("option:selected").text();
        $('#'+id).parent().find('.select2-chosen').text(text);

    }

});

function deletemchdeny(ruleId) {
    BootboxExt.confirm("确认删除吗?", function (res) {
        if (res) {
            $.get("/mchdeny/todelete", {ruleId: ruleId}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/mchdeny/search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            });
        }
    });
};


/**
 * 初始化表格数据。
 */
function initShopInfoTables() {
    $("#shopInfoId").empty();
    $("#shopName").empty();
    $("#ywyId").empty();
    //先销毁表格
    $('#shop_info_tables').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#shop_info_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/shop/shopGrpDef/search-shopInfo-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        queryParams: queryShopInfoParams,
        singleSelect: true,
        uniqueId: "shopId",
        columns: [
            {
                field: 'checked',
                checkbox: true
            },
            {
                field: 'shopId',
                title: '门店代码'
            }, {
                field: 'cname',
                title: '门店名称'
            }, {
                field: 'acqName',
                title: '门店所属受理机构'
            }, {
                field: 'ywyId',
                title: '业务员'
            }, {
                field: 'brCname',
                title: '中文简称'
            }, {
                field: 'linkMan',
                title: '联系人'
            }, {
                field: 'phone',
                title: '联系电话'
            }, {
                field: 'areaCode',
                title: '地区编码'
            }, {
                field: 'status',
                title: '开通标志'
            }, {
                field: 'modiDate',
                title: '修改日期'
            }, {
                field: 'teller',
                title: '操作员'
            }
        ],
        onLoadError: function () {  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
        }
    });
}

function queryShopInfoParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        shopInfoId: $("#shopInfoId").val(),
        shopName: $("#shopName").val(),
        ywyId: $("#ywyId").val(),
        shopId:$("#sid").val()
    };
    return temp;
}

$("#shopInfoBtn").click(function () {
    var selectInfo = $("#shop_info_tables").bootstrapTable('getSelections')[0];
    if(selectInfo == null ||  selectInfo.length < 1) {
        BootboxExt.alert("请选择门店信息");
        return;
    }
    $('#shopInfoModel').modal('hide');
    $("#sid").val(selectInfo == undefined ? "" : selectInfo.shopId);
    $("#cName").val(selectInfo == undefined ? "" : selectInfo.cname);
});

function cleanShopQuery(){
    $("#shopInfoId").val('');
    $("#shopName").val('');
    $("#ywyId").val('');
    initShopInfoTables();
}


