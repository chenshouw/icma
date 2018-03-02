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
    //商户类别  修改事件
    $('input[type=radio][name=sidType]').change(function() {
        var sidTypeLength = $('input[name=sidType]').length;
        for (var i = 1; i <= sidTypeLength; i++) {
            var id = 'sid'+i;
            $('#'+id).val('');
            $('#'+id).find("option").eq('').attr("selected","selected");
            $('#'+id).attr('disabled',true);
            $("#sid").val("");
            $("#sidType").val("");
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

});

/**
 * 下载模板
 */
function down(){
    var fileName = "cardNo-template.xlsx";
    var loadUrl = "/mchallow/down?fileName=" + fileName;
    window.location.href = loadUrl;
}


function clearFile() {
    $("#batchFile").val('');
}

$(function() {
    // 批量导入按钮
    $("#batchImportBtn").click(function(){
        if (addForm.valid()) { //验证通过
            var issuId = $("#issuId").val();
            if(issuId == null || issuId == ''){
                BootboxExt.alert("请先选择发卡机构");
                return;
            }

            var fileValue = $("#batchFile").val();
            if (fileValue == null || fileValue == "") {
                BootboxExt.alert("请先选择文件");
                return;
            }

            var sidTypeLength = $('input[name=sidType]').length;
            var sidFlag = "fail";
            var sidTypeFlag = "fail";
            for (var i = 1; i <= sidTypeLength; i++) {
                var id = 'sidType'+i;
                if (null != $('#'+id).val() && "" != $('#'+id).val()) {
                    sidTypeFlag = "success";
                }
                var id = 'sid'+i;
                if (null != $('#'+id).val() && "" != $('#'+id).val()) {
                    sidFlag = "success";
                    if ($('#'+id).val().length > 20) {
                        BootboxExt.alert("消费场所字段长度请低于20");
                        return;
                    }
                    var sidVal = $('#'+id).val();
                    $("#sid").val(sidVal);
                    var sidTypeVal = $('input[name=sidType]:checked').val();
                    $("#sidType").val(sidTypeVal);
                }
            }

            if (sidTypeFlag != "success") {
                BootboxExt.alert("请选择商户判别方式");
                return;
            }
            if (sidFlag != "success") {
                BootboxExt.alert("商户判别方式未填写");
                return;
            }

            var obj = $("#batchFile");
            var photoExt = obj.val().substr(obj.val().lastIndexOf(".")).toLowerCase();//获得文件后缀名
            if (photoExt != ".xls" && photoExt != ".xlsx") {
                BootboxExt.alert("请选择xls或是xlsx格式的文件，不支持其他格式文件");
                return false;
            }
            var fileSize = 0;
            var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
            if (isIE && !obj.files) {
                var filePath = obj.val();
                var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
                var file = fileSystem.GetFile(filePath);
                fileSize = file.Size;
            } else {
                fileSize = obj.get(0).files[0].size;
            }
            fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
            if (fileSize > 5000) {
                BootboxExt.alert("文件不能大于5M");
                return false;
            }

            //遮罩效果
            Shade.blockUI($("#addBody"));
            // 上传按钮
            $("#batchImportBtn").attr('disabled', true);
            // 上传文件按钮点击的时候
            // $("#batchImportBtn").click(function() {
            // 进度条归零
            $("#progressBar").width("0%");
            // 上传按钮禁用
            $(this).attr('disabled', true);
            // 进度条显示
            $("#progressBar").parent().show();
            $("#progressBar").parent().addClass("active");
            // 上传文件
            UpladFile();
            // })
        }

    });


    // 文件修改时
    $("#batchFile").change(function() {
        $("#batchImportBtn").val("上传");
        $("#progressBar").width("0%");
        var file = $(this).prop('files');
        if (file.length != 0) {
            $("#batchImportBtn").attr('disabled', false);
        }

    });
    var xhr = new XMLHttpRequest();
    function UpladFile() {
        var fileObj = $("#batchFile").get(0).files[0]; // js 获取文件对象
        var issuId = $("#issuId").val();
        var status = $("#status").val();
        var sid = $("#sid").val();
        var sidType = $("#sidType").val();
        var ruleDesc = $("#ruleDesc").val();
        // FormData 对象
        var form = new FormData();
        form.append("enctype","multipart/form-data");
        // form.append("author", "hooyes"); // 可以增加表单数据
        form.append("file", fileObj); // 文件对象
        form.append("issuId", issuId); // 文件对象
        form.append("status", status);
        form.append("sid", sid);
        form.append("sidType", sidType);
        form.append("ruleDesc", ruleDesc == "" ? "": ruleDesc);
        // XMLHttpRequest 对象
        xhr.open("POST", "/mchallow/upload", true);
        //注册回调函数
        xhr.onreadystatechange=callback;
        xhr.onload = function() {
            Shade.unblockUI($("#addBody"));
            BootboxExt.alert(response, function (res) {
                if (response == "批量新增成功") {
                     location.href="/mchallow/search";
                }
            });
            $("#batchImportBtn").attr('disabled', false);
            $("#batchImportBtn").val("上传");
            $("#progressBar").parent().removeClass("active");
            $("#progressBar").parent().hide();
            $('#batchImportBtn').modal('hide');
        };
        xhr.upload.addEventListener("progress", progressFunction, false);
        xhr.send(form);
    }

    var response = "";
    function callback() {
        //接收响应数据
        //判断对象状态是否交互完成，如果为4则交互完成
        if(xhr.readyState == 4) {
            //判断对象状态是否交互成功,如果成功则为200
            if(xhr.status == 200) {
                //接收数据,得到服务器输出的纯文本数据
                response = xhr.responseText;
            }
        }
    }

    function progressFunction(evt) {
        var progressBar = $("#progressBar");
        if (evt.lengthComputable) {
            var completePercent = Math.round(evt.loaded / evt.total * 100)+ "%";
            progressBar.width(completePercent);
            $("#batchImportBtn").val("正在上传 " + completePercent);
        }
    };


})



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



