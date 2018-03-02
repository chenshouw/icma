var productInfo = new Object();

function setSearchParam() {
    productInfo.userId = $("#userId").val();
    productInfo.productId = $("#productId").val();
    productInfo.ProductType = $("#productType").val();
    productInfo.productTypeGroup = $("#productTypeGroup").val();
    productInfo.account = $("#account").val();
    productInfo.currBal = $("#currBal").val();
    productInfo.issuId =$("#issuId").val();
    productInfo.subIssu = $("#subIssu").val();
    productInfo.issuOrgCode = $("#issuOrgCode").val();
    productInfo.openDateBegin = $("#openDateBegin").val();
    productInfo.openDateEnd = $("#openDateEnd").val();
    productInfo.expDateBegin = $("#expDateBegin").val();
    productInfo.expDateEnd = $("#expDateEnd").val();

    productInfo.custNo = $("#custNo").val();
    productInfo.empName = $("#empName").val();
    productInfo.phone = $("#phone").val();
}

jQuery(document).ready(function () {
    setSearchParam();

    $("#openDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#openDateEnd").datetimepicker("setStartDate", $("#openDateBegin").val());
        $("#openDateBegin").datetimepicker("hide");
    });

    $("#openDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#openDateBegin").datetimepicker("setStartDate", $("#openDateEnd").val());
        $("#openDateEnd").datetimepicker("hide");
    });

    $("#expDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#expDateEnd").datetimepicker("setStartDate", $("#expDateBegin").val());
        $("#expDateBegin").datetimepicker("hide");
    });

    $("#expDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#expDateBegin").datetimepicker("setStartDate", $("#expDateEnd").val());
        $("#expDateEnd").datetimepicker("hide");
    });

    /**
     * 开卡开始时间清空事件
     */
    $("#openDateBeginClear").click(function () {
        $("#openDateBegin").val("");
    });
    /**
     * 开卡结束时间清空事件
     */
    $("#openDateEndClear").click(function () {
        $("#openDateEnd").val("");
    });

    /**
     * 有效开始时间清空事件
     */
    $("#expDateBeginClear").click(function () {
        $("#expDateBegin").val("");
    });
    /**
     * 有效结束时间清空事件
     */
    $("#expDateEndClear").click(function () {
        $("#expDateEnd").val("");
    });
});

/**
 * 查询导出excel。
 */
$("#export").click(function () {
    setSearchParam();

    $('#export').addClass('disabled');
    var el = $("#listBody");
    // productInfo.ProductType=$("#ProductTypeValue").val();
    console.log("productType:"+productInfo.ProductType);
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: productInfo,
        url: "/account/product-info/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            // console.log(data);
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/account/product-info/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
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


// 查询
function serach() {
    setSearchParam();
    if($("#minstName").val()==''){
        $("#issuId").val('')
    }
    if($("#subIssuName").val()==''){
        $("#subIssu").val('')
    }
    if($("#issuOrgName").val()==''){
        $("#issuOrgCode").val('')
    }
    document.getElementById("productInfoForm").submit();
    // $("forms[0]").commit();
}

var instName;
$("#instName").blur(function () {
    instName = $("#instName").val();
});

var instId;
$("#instId").blur(function () {
    instId = $("#instId").val();
});

var status;
function getSelectStatus() {
    status = $('#status option:selected').val();//选中的值
}

//清空弹窗搜索值
function restModleSerach() {
    $("#instName").val('');
    $("#instId").val('');
    $("#status").val('');
    instName='';
    instId='';
    status='';
}

//选择机构弹框的相关操作   END


