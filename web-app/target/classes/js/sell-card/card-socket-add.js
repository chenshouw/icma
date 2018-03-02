$(function () {
    $("#btnSave").click(function () {
        var panNum = $("#panNum").val();
        var txnAmt = $("#txnAmt").val();
        var productType = $("#productType").val();
        var issuId = $("#issuId").val();
        var custNo = $("#custNo").val();
        var accType = $("#accType").val();
        var parProductType = $("#parProductType").val();

        if (null == parProductType || '' == parProductType) {
            BootboxExt.alert("产品类型不可为空");
            return;
        }
        if (null == issuId || '' == issuId) {
            BootboxExt.alert("发卡机构不可为空");
            return;
        }
        if (null == custNo || '' == custNo) {
            BootboxExt.alert("客户号不可为空");
            return;
        }
        if (null == productType || '' == productType) {
            BootboxExt.alert("产品子类型不可为空");
            return;
        }
        if (!/^(\+?[1-9]\d{0,2}|\+?1000)$/.test(panNum)) {
            BootboxExt.alert("开卡数量必须为1-1000的正整数");
            return;
        }
         if (!/^[0-9]+$/.test(txnAmt)) {
             BootboxExt.alert("开卡金额必须为数字");
             return;
         }
        if (null == accType || '' == accType) {
            BootboxExt.alert("账户类型不可为空");
            return;
        }

        var flag = true;

        $.ajax({
            async: false,
            type: "get",
            url: "/sell-card/card-socket/checkSeq",
            data: {productType: productType,issuId:issuId},
            dataType: "json",
            success: function (data) {
                if ((parseInt(data.curr) + parseInt(panNum)) > parseInt(data.max)) {
                    flag = false;
                    BootboxExt.alert("此卡开卡数量已超过最大开卡数量,请重新选择");
                    return;
                }
                if (!/^(?:0\.\d{1,2}|[1-9]\d{0,4}(?:\.\d{1,2})?|" + data.maxValue + "|0)$/.test(txnAmt) || parseFloat(txnAmt) > parseFloat(data.maxValue)) {
                    flag = false;
                    BootboxExt.alert("卡面金额必须为0-" + data.maxValue + "的正数,精确到分");
                    return;
                }
                if (!(data.acqTag > 0)) {
                    flag = false;
                    BootboxExt.alert("当前用户所属机构没有受理权限");
                    return;
                }
                if (data.result == false) {
                    flag = false;
                    BootboxExt.alert("当前用户所属机构与所选发卡机构没有受理关系");
                    return;
                }
            }
        });


        if (flag) {
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/sell-card/card-socket/add", $("#addForm").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    if (data === true) {
                        BootboxExt.alert("开卡已受理成功，请稍后到《售卡管理》的'开卡管理'功能进行查询", function (res) {
                            location.href = "/sell-card/batch-open-card/search";
                        });
                    } else {
                        BootboxExt.alert("开卡已受理失败", function (res) {
                        });
                    }
                });
        }
        {
        }
    });
})

$("#productType").change(function () {
    var productType = $("#productType").val();
    $("#txnAmt").removeAttr("readonly");
    $.post("/sell-card/card-socket/getProductType", {productType: productType},
        function (data) {
            $("#maxValue").val(data.pt.balanceHwm);
        }, "json");
    $.post("/sell-card/card-socket/getAccType", {productType: productType},
        function (data) {
            $("#accType").removeAttr("disabled");
            $("#accType").empty();
            $("#accType").append("<option value=''>请选择账户类型</option>");
            for (var i = 0; i < data.accTypes.length; i++) {
                var accType = data.accTypes[i].accType;
                var accName = data.accTypes[i].accName;
                $("#accType").append("<option value='" + accType + "'>" + accName + "</option>");
            }
        }, "json");
    // $.post("/sell-card/card-socket/getIssuId", {productType: productType},
    //     function (data) {
    //         $("#issuId").removeAttr("disabled");
    //         $("#issuId").empty();
    //         //$("#issuId").append("<option value=''>请选择发卡机构</option>");
    //         // for (var i = 0; i < data.minsts.length; i++) {
    //         //     var issuId = data.minsts[i].issuId;
    //         //     var issuName = data.minsts[i].instName;
    //         var issuId = data.minst.instId;
    //         var issuName = data.minst.instName;
    //         $("#issuId").append("<option value='" + issuId + "'>" +issuId +'-'+issuName + "</option>");
    //         //}
    //     }, "json");
});

function cleanCardQuery() {
    history.go(0);
}


function selectProductType() {
    var productType = $('#productType').val();
    if (productType == null || productType == '') {
        BootboxExt.alert("请先选择产品类型");
        $('#issuId').val('');
        return;
    }
}

$("#issuId").change(function () {
    var parProductType = $("#parProductType").val();
    var issuId = $("#issuId").val();
    $("#custNo").val("");
    $("#cliName").val("");
    if((parProductType != null && parProductType != '')&&(issuId != null && issuId != '')){
        $.post("/sell-card/card-socket/getIssuId", { issuId: issuId, parProductType: parProductType },
            function (data) {
                $("#productType").removeAttr("disabled");
                $("#productType").empty();
                $("#productType").append("<option value=''>请选择产品子类型</option>");
                for (var i = 0; i < data.productTypes.length; i++) {
                    var productType = data.productTypes[i].productType;
                    var productName = data.productTypes[i].productName;
                    $("#productType").append("<option value='" + productType + "'>" +productName + "</option>");
                }
            }, "json");
    }else{
        $("#productType").empty();
        $("#productType").append("<option value=''>请选择产品子类型</option>");
        $("#productType").attr("disabled","disabled");
    }
});

$("#parProductType").change(function(){
    var parProductType = $("#parProductType").val();
    var issuId = $("#issuId").val();
    if((parProductType != null && parProductType != '')&&(issuId != null && issuId != '')){
        $.post("/sell-card/card-socket/getIssuId", { issuId: issuId, parProductType: parProductType },
            function (data) {
                $("#productType").removeAttr("disabled");
                $("#productType").empty();
                $("#productType").append("<option value=''>请选择产品子类型</option>");
                for (var i = 0; i < data.productTypes.length; i++) {
                    var productType = data.productTypes[i].productType;
                    var productName = data.productTypes[i].productName;
                    $("#productType").append("<option value='" + productType + "'>" +productName + "</option>");
                }
            }, "json");
    }else{
        $("#productType").empty();
        $("#productType").append("<option value=''>请选择产品子类型</option>");
        $("#productType").attr("disabled","disabled");
    }
});

/**
 * 初始化表格数据。
 */
function initMcustTables() {
    var issuId = $("#issuId").val();
    if (issuId == null || issuId == "") {
        BootboxExt.alert("请先选择对应的发卡机构");
        return;
    } else {
        $('#mcustModal').modal('show');
        $("#custNoParam").empty();
        $("#cliNameParam").empty();
        $("#certNo").empty();
        $("#teller").empty();

        //先销毁表格
        $('#mcust_tables').bootstrapTable('destroy');
        //初始化表格,动态从服务器加载数据
        $("#mcust_tables").bootstrapTable({
            method: "GET",  //使用get请求到服务器获取数据
            url: '/mcustInfo/search-mcustInfo-list', //获取数据的Servlet地址
            striped: true,  //表格显示条纹
            showRefresh: true,  //显示刷新按钮
            pagination: true,                   //是否显示分页（*）
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            queryParamsType: '',
            queryParams: queryMcustParams,
            singleSelect: true,
            uniqueId: "custNo",
            columns: [
                {
                    field: 'checked',
                    checkbox: true
                },
                {
                    field: 'custNo',
                    title: '客户号'
                }, {
                    field: 'cliName',
                    title: '客户名称'
                },{
                    field: 'cliAddr',
                    title: '客户地址'
                },{
                    field: 'certNo',
                    title: '身份证号码'
                },
                {
                    field: 'cliCaller',
                    title: '联系人'
                }, {
                    field: 'cliPhone1',
                    title: '联系电话1'
                }, {
                    field: 'cliPhone2',
                    title: '联系电话2'
                }, {
                    field: 'ywyId',
                    title: '业务员'
                }, {
                    field: 'issuInstName',
                    title: '所属发卡机构'
                }, {
                    field: 'orgCode',
                    title: '所属部门代码'
                }, {
                    field: 'sec',
                    title: '所属片区'
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


}

function queryMcustParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        custNoParam: $("#custNoParam").val(),
        cliNameParam: $("#cliNameParam").val(),
        certNo: $("#certNo").val(),
        teller: $("#teller").val(),
        custNo:$("#custNo").val(),
        issuId:$("#issuId").val()
    };
    return temp;
}

$("#mcustBtn").click(function () {
    var selectInfo = $("#mcust_tables").bootstrapTable('getSelections')[0];
    if(selectInfo == null ||  selectInfo.length < 1) {
        BootboxExt.alert("请选择客户信息");
        return;
    }
    $('#mcustModal').modal('hide');
    $("#custNo").val(selectInfo == undefined ? "" : selectInfo.custNo);
    $("#cliName").val(selectInfo == undefined ? "" : selectInfo.cliName);
});

//重置客户号查询的信息
function cleanMcustQueary(){
    $("#custNoParam").val("");
    $("#cliNameParam").val("");
    $("#custNo").val("");
    $("#teller").val("");
    $("#certNo").val("");
    initMcustTables();
}

