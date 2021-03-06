var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        issuId: {
            required: true
        },
        status: {
            required: true
        },
        cid: {
            stringMaxLength: 20
        },
        ruleDesc: {
            stringMaxLength: 100
        }
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
    $("#btnSave").click(function () {
        if (addForm.valid()) { //验证通过
            var cidTypeLength = $('input[name=cidType]').length;
            var cidFlag = "fail";
            var sidTypeLength = $('input[name=sidType]').length;
            var sidFlag = "fail";
            for (var i = 1; i <= cidTypeLength; i++) {
                var id = 'cid'+i;
                if (null != $('#'+id).val() && "" != $('#'+id).val()) {
                    cidFlag = "success";
                    if ($('#'+id).val().length > 20) {
                        BootboxExt.alert("消费方式字段长度请低于20");
                        return;
                    }
                }
            }
            for (var i = 1; i <= sidTypeLength; i++) {
                var id = 'sid'+i;
                if (null != $('#'+id).val() && "" != $('#'+id).val()) {
                    sidFlag = "success";
                    if ($('#'+id).val().length > 20) {
                        BootboxExt.alert("消费场所字段长度请低于20");
                        return;
                    }
                }
            }

            if (cidFlag != "success") {
                BootboxExt.alert("卡判别方式未填写");
                return;
            }

            if (sidFlag != "success") {
                BootboxExt.alert("商户判别方式未填写");
                return;
            }

            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/mchallow/add",
                $("#addForm").serialize(),
                function(data){
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    if(data.result == "success"){
                        BootboxExt.alert("新增成功",function(res){
                            location.href="/mchallow/search";
                        });
                    } else if (data.result == "isHas"){
                        BootboxExt.alert("存在相同数据【即发卡机构，卡判别方式和CID，商户判别方式和商户类型相同】",function(res){

                        });
                    } else if (data.result == "noExists"){
                        BootboxExt.alert("该卡号不存在或者该卡号不属于该发卡机构，请检查数据",function(res){

                        });
                    } else {
                        BootboxExt.alert("新增失败",function(res){

                        });
                    }
                })
        }
    });

    $("#btnUpdate").click(function () {
        if (addForm.valid()) { //验证通过
            var cidTypeLength = $('input[name=cidType]').length;
            var cidFlag = "fail";
            var sidTypeLength = $('input[name=sidType]').length;
            var sidFlag = "fail";
            for (var i = 1; i <= cidTypeLength; i++) {
                var id = 'cid'+i;
                if (null != $('#'+id).val() && "" != $('#'+id).val()) {
                    cidFlag = "success";
                    if ($('#'+id).val().length > 20) {
                        BootboxExt.alert("消费方式字段长度请低于20");
                        return;
                    }
                }
            }
            for (var i = 1; i <= sidTypeLength; i++) {
                var id = 'sid'+i;
                if (null != $('#'+id).val() && "" != $('#'+id).val()) {
                    sidFlag = "success";
                    if ($('#'+id).val().length > 20) {
                        BootboxExt.alert("消费场所字段长度请低于20");
                        return;
                    }
                }
            }

            if (cidFlag != "success") {
                BootboxExt.alert("卡判别方式未填写");
                return;
            }

            if (sidFlag != "success") {
                BootboxExt.alert("商户判别方式未填写");
                return;
            }

            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/mchallow/update",
                $("#updateForm").serialize(),
                function(data){
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    if(data.result == "success"){
                        BootboxExt.alert("修改成功",function(res){
                            location.href="/mchallow/search";
                        });
                    } else if (data.result == "isHas"){
                        BootboxExt.alert("存在相同数据【即发卡机构，卡判别方式和CID，商户判别方式和商户类型相同】",function(res){

                        });
                    } else if (data.result == "noExists"){
                        BootboxExt.alert("该卡号不存在或者该卡号不属于该发卡机构，请检查数据",function(res){

                        });
                    } else {
                        BootboxExt.alert("修改失败",function(res){
                            window.location.reload();
                        });
                    }
                })
        }
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
        $('#'+id).val(cid);
        $('#'+id).attr("value",cid);

        var text = $('#'+id).find("option:selected").text();
        $('#'+id).parent().find('.select2-chosen').text(text);

    }

    var sidTypeval = $('input:radio[name=sidType]:checked').val();
    if(null != sidTypeval && '' != sidTypeval){
        //商户判别方式的 已选类型 通过id查找相应的消费场所
        var str1 = $('input:radio[name=sidType]:checked').attr('id');
        var j = str1.substr(str.length-1,1);
        //封装sid字段的 id值
        var sidid = 'sid' + j;

        //获取数据中存储的sid字段值
        var sid = $('#sid').val();

        //sid字段值显示
        $('#'+sidid).find("option").eq('').attr("selected",false);
        $('#'+sidid).val(sid);
        $('#'+sidid).attr("value",sid);

        var text = $('#'+sidid).find("option:selected").text();
        $('#'+sidid).parent().find('.select2-chosen').text(text);


    }
});

function valid() {
    var cidTypeLength = $('input[name=cidType]').length;
    var cidFlag = "fail";
    var sidTypeLength = $('input[name=sidType]').length;
    var sidFlag = "fail";
    for (var i = 1; i <= cidTypeLength; i++) {
        var id = 'cid'+i;
        if (null != $('#'+id).val() && "" != $('#'+id).val()) {
            cidFlag = "success";
        }
    }
    for (var i = 1; i <= sidTypeLength; i++) {
        var id = 'sid'+i;
        if (null != $('#'+id).val() && "" != $('#'+id).val()) {
            sidFlag = "success";
        }
    }

    if (cidFlag != "success") {
        BootboxExt.alert("请选择消费对象");
        return;
    }

    if (sidFlag != "success") {
        BootboxExt.alert("请选择消费场所");
        return;
    }
}
$(function () {
    //卡类别  修改事件
    $('input[name=cidType]').click(function() {
        var issuId = $("#issuId").val();
        if(issuId == null || issuId == ''){
            BootboxExt.alert("请先选择发卡机构");
            var id = 'cid'+$(this).data('id');
            var cidType = 'cidType'+$(this).data('id');
            $('#'+id).attr('disabled',true);
            $('#'+cidType).parent().removeClass('checked', false);

            var cidTypeLength = $('input[name=cidType]').length;
            for (var i = 1; i <= cidTypeLength; i++) {
                var id = 'cid'+i;
                var cidType = 'cidType' +i;
                $('#'+id).val('');
                $('#'+id).find("option").eq('').attr("selected","selected");
                $('#'+id).attr('disabled',true);
                $('#'+cidType).parent().removeClass('checked', false);
                $('#'+id).parent().find('.select2-chosen').text('');
            }
            return;
        }
        var cidTypeLength = $('input[name=cidType]').length;
        for (var i = 1; i <= cidTypeLength; i++) {
            var id = 'cid'+i;
            $('#'+id).val('');
            $('#'+id).find("option").eq('').attr("selected","selected");
            $('#'+id).attr('disabled',true);
            $('#'+'s2id_'+id).find('.select2-chosen').text('');
        }
       var id = 'cid'+$(this).data('id');
       $('#'+id).attr('disabled',false);
    });

    $('input[type=radio][name=sidType]').change(function() {
        var sidTypeLength = $('input[name=sidType]').length;
        for (var i = 1; i <= sidTypeLength; i++) {
            var id = 'sid'+i;
            $('#'+id).val('');
            $('#'+id).find("option").eq('').attr("selected","selected");
            $('#'+id).attr('disabled',true);
            $('#'+id).parent().find('.select2-chosen').text('');
            var grp = 'grp' + i;
            $('#' + grp).val('');
            $('#' + grp).attr('disabled',true);
            $('#cName').val('');
            $('#grpName').val('');

            var mid = 'mid' + i;
            $('#' + mid).val('');
            $('#' + mid).attr('disabled',true);
            $('#sid3').val('');
            $('#sidName').val('');
        }
        var id = 'sid'+$(this).data('id');
        $('#'+id).attr('disabled',false);
        var grp = 'grp' + $(this).data('id');
        $('#' + grp).attr('disabled',false);
        var mid = 'mid' + $(this).data('id');
        $('#' + mid).attr('disabled',false);
    });

    $("#issuId").change(function () {
        var issuId = $("#issuId").val();
        if(issuId != null && issuId != ''){
            $.post("/sell-card/batch-open-card/getIssuId", { issuId: issuId},
                function (data) {
                    $("#cid1").empty();
                    $("#cid1").append("<option value=''></option>");
                    for (var i = 0; i < data.productTypes.length; i++) {
                        var productType = data.productTypes[i].productType;
                        var productName = data.productTypes[i].productName;
                        $("#cid1").append("<option value='" + productType + "'>"+ productType + '-' +productName + "</option>");
                    }
                }, "json");
            var cidTypeLength = $('input[name=cidType]').length;
            for (var i = 1; i <= cidTypeLength; i++) {
                var id = 'cid'+i;
                var idType = 'cidType' + i;
                $('#'+id).val('');
                $('#'+id).find("option").eq('').attr("selected","selected");
                $('#'+id).attr('disabled',true);
                $('#'+idType).parent().removeClass('checked', false);
                $('#'+id).parent().find('.select2-chosen').text('');
            }

        }else{
            $("#cid1").empty();
            $("#cid1").append("<option value=''></option>");
            $("#cid1").attr("disabled","disabled");

            //清空卡判别方式已选数据
            var cidTypeLength = $('input[name=cidType]').length;
            for (var i = 1; i <= cidTypeLength; i++) {
                var id = 'cid' + i;
                var idType = 'cidType' + i;
                $('#' + id).val('');
                $('#' + id).find("option").eq('').attr("selected", "selected");
                $('#' + id).attr('disabled', true);
                $('#' + idType).parent().removeClass('checked', false);
                $('#' + id).parent().find('.select2-chosen').text('');
            }
        }
    });



});



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
        shopId:$("#sid5").val()
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
    $("#sid5").val(selectInfo == undefined ? "" : selectInfo.shopId);
    $("#cName").val(selectInfo == undefined ? "" : selectInfo.cname);
});

//初始化门店分组表格信息
/**
 * 初始化表格数据。
 */
function initShopGrpTables() {
    $("#shopGrpId").empty();
    $("#shopGrpName").empty();
    //先销毁表格
    $('#shop_grp_tables').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#shop_grp_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/shop/shopGrpDef/search-shopGrp-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        queryParams: queryShopGrpParams,
        singleSelect: true,
        uniqueId: "shopGrp",
        columns: [
            {
                field: 'checked',
                checkbox: true
            },
            {
                field: 'shopGrp',
                title: '门店分组代码'
            }, {
                field: 'grpName',
                title: '门店分组名称'
            }, {
                field: 'acqName',
                title: '门店分组所属受理机构'
            }
        ],
        onLoadError: function () {  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
        }
    });
}

function queryShopGrpParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        shopGrpId: $("#shopGrpId").val(),
        shopGrpName: $("#shopGrpName").val(),
        shopGrp:$("#sid6").val()
    };
    return temp;
}

$("#shopGrpBtn").click(function () {
    var selectInfo = $("#shop_grp_tables").bootstrapTable('getSelections')[0];
    if(selectInfo == null ||  selectInfo.length < 1) {
        BootboxExt.alert("请选择门店分组信息");
        return;
    }
    $('#shopGrpModal').modal('hide');
    $("#sid6").val(selectInfo == undefined ? "" : selectInfo.shopGrp);
    $("#grpName").val(selectInfo == undefined ? "" : selectInfo.grpName);
});

/**
 * 初始化表格数据。
 */
function initMchTables() {
    $("#mid").empty();
    $("#midName").empty();
    //先销毁表格
    $('#mch_tables').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#mch_tables").bootstrapTable({
        method: "GET",  //使用get请求到服务器获取数据
        url: '/mch/info/search-Mchlist', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true,                   //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        queryParams: queryMchParams,
        singleSelect: true,
        uniqueId: "mid",
        columns: [
            {
                field: 'checked',
                checkbox: true
            },
            {
                field: 'mid',
                title: '商户号'
            }, {
                field: 'midName',
                title: '商户名称'
            }, {
                field: 'mchGrp',
                title: '商户组'
            },{
                field: 'acqId',
                title: '机构编号'
            }
        ],
        onLoadError: function () {  //加载失败时执行
            BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
        }
    });
}

function queryMchParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        mid: $("#mid").val(),
        midName: $("#midName").val(),
        midChecked: $("#sid3").val()
    };
    return temp;
}

function cleanMchQuery(){
    $("#mid").val('');
    $("#midName").val('');
    initMchTables();
}

function cleanShopQuery(){
    $("#shopInfoId").val('');
    $("#shopName").val('');
    $("#ywyId").val('');
    initShopInfoTables();
}

function cleanShopGrpQuery(){
    $("#shopGrpId").val('');
    $("#shopGrpName").val('');
    initShopGrpTables();
}

$("#mchBtn").click(function () {
    var selectInfo = $("#mch_tables").bootstrapTable('getSelections')[0];
    if(selectInfo == null ||  selectInfo.length < 1) {
        BootboxExt.alert("请选择商户信息");
        return;
    }
    $('#mchModal').modal('hide');
    $("#sid3").val(selectInfo == undefined ? "" : selectInfo.mid);
    $("#sidName").val(selectInfo == undefined ? "" : selectInfo.midName);
});







