function reSetValue() {
    $("#batchNo").val("");
    $("#name").val("");
    $("#memo").val("");
    $('#select2_sample2').empty();
    $("#sGroup").val("");
    document.getElementById("choiceCards").innerHTML = "";
    document.getElementById("cardNums").innerHTML = "0".toString();
    document.getElementById("phoneGroupNums").innerHTML = "0".toString();
     selectCardBoxs = new Array();
     cancelCardBox = new Array();
     selectGroupBoxs = new Array();
     cancelGroupBox = new Array();
     sendGroupIds = "";
    sendCardIds = "";
}

$("#btnBatchNo").click(function () {
    $.get("find-card-present-batchNo", {}, function (data) {
        $("#batchNo").val(data.batchNo);
    }, "json");
});

//选择卡号弹框的相关操作   BEGAIN
/**
 * 卡号复选框实现全选和反选
 */
$("#cardSelectAll").click(function () {
    if ($("#cardSelectAll").attr("checked")) {
        $(":checkbox").attr("checked", true);
    } else {
        $(":checkbox").attr("checked", false);
    }
});


/**
 * 查询卡号列表并动态形成表格
 * @param userId 保存在隐藏域
 */
function queryCardList() {
    var productType = $("#productType").val();
    //$("#hiddenUserId").val(userId);
    Shade.blockUI($("#modal-dialog"));
    $.ajax({
        type: "post",
        url: "/account-manage/card-present/find-productInfo",
        data: {productIds: productIds, status: status, productType:productType},
        dataType: "json",
        success: function (Json) {
            Shade.unblockUI($("#modal-dialog"));
            var tbody = document.getElementById('tbCard');
            $("#cardTable tbody tr").empty();
            if (Json != null && Json != "") {
                $("#cardTable tbody tr").attr("display", true);

                for (var i = 0; i < Json.length; i++) {
                    var trow = getCardDataRow(Json[i]); //定义一个方法,返回tr数据
                    tbody.appendChild(trow);
                }
                /*for (var i = 0; i < Json.length; i++) {
                    alert("type: "+Json[i].productType+"   Name: "+Json[i].pt.productName);
                    $("#productType").append("<option value='"+Json[i].pt.productType+"'>"+Json[i].pt.productName+"</option>");
                }*/
                $.ajax({
                    type: "get",
                    url: "/account-manage/card-present/find-productType",
                    dataType: "json",
                    success: function(data){
                        $("#productType").empty();
                        $("#productType").append("<option value=''>请选择</option>");
                        for (var i = 0; i < data.list.length; i++) {
                            if(data.list[i].productType == productType){
                                $("#productType").append("<option value='"+data.list[i].productType+"' selected='selected'>"+data.list[i].productName+"</option>");
                            }else {
                                $("#productType").append("<option value='" + data.list[i].productType + "'>" + data.list[i].productName + "</option>");
                            }
                        }
                    }
                });
                reCheckBox(selectCardBoxs);
                selectCardBoxs = new Array();
            }
        }, error: function () {
            BootboxExt.alert("加载失败");
        }
    });
}

/**
 * 动态组装选择卡号表格
 * @param h
 * @returns {Element}
 */
function getCardDataRow(card) {
    var row = document.createElement('tr'); //创建行
    var checkBoxCell = document.createElement('td');//创建第二列
    checkBoxCell.innerHTML = "<input type='checkbox' value='" + card["productId"] + "' name='productId'>";
    row.appendChild(checkBoxCell);
    var productIdCell = document.createElement('td');//创建第三列name,名称
    productIdCell.innerHTML = card["productId"];
    row.appendChild(productIdCell);
    var accountCell = document.createElement('td');//创建第三列name,名称
    accountCell.innerHTML = card["account"];
    row.appendChild(accountCell);
    var currBalCell = document.createElement('td');//创建第四列description，描述
    currBalCell.innerHTML = card["currBal"];
    row.appendChild(currBalCell);
    var openDateCell = document.createElement('td');//创建第五列teller，操作员
    openDateCell.innerHTML = card["openDate"];
    row.appendChild(openDateCell);
    var nameCell = document.createElement('td');//创建第六列createTime
    nameCell.innerHTML = card.pt.productName;
    row.appendChild(nameCell);
    var statusCell = document.createElement('td');//创建第六列createTime
    statusCell.innerHTML = card["statusName"];
    row.appendChild(statusCell);
    return row; //返回tr数据
}

/**
 * 选卡号弹框的取消按钮单击事件。
 */
function closeAndCheckCard() {
    for (var i = 0; i < cancelCardBox.length; i++) {
        selectCardBoxs.push(cancelCardBox[i]);
    }
    $('#card-modal').modal('hide');
}

/**
 * 获取多选的卡号的ID
 */
var selectCardBoxs = new Array();
var cancelCardBox = new Array();
var sendCardIds;
$("#card-btnSave").click(function () {
    $("#btnSave").attr("disabled",false);
    var arrs = new Array();
    $("input[name='productId']:checkbox").each(function () {
        if ($(this).attr("checked")) {
            arrs.push($(this).val());
            selectCardBoxs.push($(this).val());
            cancelCardBox.push($(this).val());
        }
    });
    if (arrs.length == 0) {
        BootboxExt.alert('请选择数据');
        return;
    } else {
        var cardIds = "";
        for (var i = 0; i < arrs.length; i++) {
            if (i > 0) {
                cardIds += ',';
            }
            cardIds += arrs[i];
        }
        sendCardIds = cardIds;
        assembleCardIds(cardIds);
    }
});


/**
 * 动态向赠卡页面展示用户选择的卡号信息。
 * @param roleIds
 */
function assembleCardIds(cardIds) {
    //var userId = $("#hiddenUserId").val();
    $.post("/account-manage/card-present/show-cards", {cardIds: cardIds}, function (data) {
        $('#card-modal').modal('hide');
        var cardCount = 0;
        var buildHtml = "";
        if (null != data && "" != data) {
            for (var i = 0, len = data.length; i < len; i++) {
                $('#choiceCards').empty();
                var productId = data[i]["productId"];
                if (i === len - 1) {
                    buildHtml += productId;
                } else {
                    buildHtml += productId + "、";
                }
                cardCount++;
            }
            choiceCardTotal = cardCount;
            document.getElementById("cardNums").innerHTML = cardCount.toString();
            document.getElementById("choiceCards").innerHTML = buildHtml;
        } else {
            BootboxExt.alert("显示选中的卡号数据错误");
        }
    }, "json");
}

var productIds;
$("#productIds").blur(function () {
    productIds = $("#productIds").val();
});

var status;
function getSelectStatus() {
    status = $('#status option:selected').val();//选中的值
}

//选择卡号弹框的相关操作   END

//手机组弹框的相关操作   BEGAIN

/**
 * 手机组复选框实现全选和反选
 */
$("#PhoneGroupSelectAll").click(function () {
    var PhoneGroupSelectAll = $("#PhoneGroupSelectAll").attr("checked");
    if ($("#PhoneGroupSelectAll").attr("checked")) {
        $(":checkbox").attr("checked", true);
    } else {
        $(":checkbox").attr("checked", false);
    }
});

function closeAndCheck() {
    for (var i = 0; i < cancelGroupBox.length; i++) {
        selectGroupBoxs.push(cancelGroupBox[i]);
    }
    $('#group-modal').modal('hide');
}


/**
 * 查询手机号列表并动态形成表格
 * @param userId 保存在隐藏域
 */
function queryPhoneGroupList() {
    //$("#hiddenUserId").val(userId);
    $.ajax({
        type: "post",
        url: "/account-manage/card-present/find-phoneGroup",
        data: {name: names, teller: tellers},
        dataType: "json",
        success: function (Json) {
            //var obj = eval(Json.list);
            var tbody = document.getElementById('tbPhoneGroup');
            $("#phoneGroupTable tbody tr").empty();
            if (Json != null && Json != "") {
                $("#phoneGroupTable tbody tr").attr("display", true);
                for (var i = 0; i < Json.length; i++) {
                    var trow = getDataRow(Json[i]); //定义一个方法,返回tr数据
                    tbody.appendChild(trow);
                }

                //让弹出框默认选中上一次选中的
                reCheckBox(selectGroupBoxs);
                selectGroupBoxs = new Array();
            }

        }, error: function () {
            BootboxExt.alert("加载失败");
        }
    })
}

/**
 * 让弹出框默认选中上一次选中的
 * @param arrBoxs
 */
function reCheckBox(arrBoxs) {
    $("input[type=checkbox]").each(function () { //由于复选框一般选中的是多个,所以可以循环输出
        var checkId = $(this).val();
        for (var i = 0; i < arrBoxs.length; i++) {
            if (arrBoxs[i] == checkId) {
                $(this).attr("checked", true);
            }
        }
    });
}

/**
 * 动态组装选择手机组表格
 * @param h
 * @returns {Element}
 */
function getDataRow(phoneGroup) {
    var row = document.createElement('tr'); //创建行
    var checkBoxCell = document.createElement('td');//创建第二列
    var id = phoneGroup["id"];
    checkBoxCell.innerHTML = "<input type='checkbox' value='" + id + "' name='groupId'>";
    row.appendChild(checkBoxCell);
    var nameCell = document.createElement('td');//创建第三列name,名称
    nameCell.innerHTML = phoneGroup["name"];
    row.appendChild(nameCell);
    var descriptionCell = document.createElement('td');//创建第四列description，描述
    descriptionCell.innerHTML = phoneGroup["description"];
    row.appendChild(descriptionCell);
    var tellerCell = document.createElement('td');//创建第五列teller，操作员
    tellerCell.innerHTML = phoneGroup["teller"];
    row.appendChild(tellerCell);
    var createTimeCell = document.createElement('td');//创建第六列createTime
    createTimeCell.innerHTML = new Date(phoneGroup["createTimeBegin"]).format("yyyy-MM-dd HH:mm:ss");
    row.appendChild(createTimeCell);

    return row; //返回tr数据
}


/**
 * 获取多选的手机组的ID
 */
var selectGroupBoxs = new Array();
var cancelGroupBox = new Array();
var sendGroupIds;
$("#phoneGroup-btnSave").click(function () {
    $("#btnSave").attr("disabled",false);
    var arrs = new Array();
    $("input[name='groupId']:checkbox").each(function () {
        if ($(this).attr("checked")) {
            arrs.push($(this).val());
            selectGroupBoxs.push($(this).val());
            cancelGroupBox.push($(this).val());
        }
    });
    if (arrs.length == 0) {
        BootboxExt.alert('请选择数据');
        return;
    } else {
        var groupIds = "";
        for (var i = 0; i < arrs.length; i++) {
            if (i > 0) {
                groupIds += ',';
            }
            groupIds += arrs[i];
        }
        sendGroupIds = groupIds;
        assembleGroupIds(groupIds);
    }
});


/**
 * 显示选择的手机组中的手机信息
 * @param roleIds
 */
function assembleGroupIds(groupIds) {
    $.get("/account-manage/card-present/show-phoneGroup", {groupIds: groupIds}, function (data) {
        $('#group-modal').modal('hide');
        var phoneCount = 0;
        var buildHtml = "";
        if (null != data && "" != data) {
            for (var i = 0, len = data.length; i < len; i++) {
                $('#select2_sample2').empty();
                var name = data[i]["name"];
                buildHtml += '<optgroup label="' + name + '">';
                var mobilePhone = data[i]["mobilePhoneVos"];
                if (mobilePhone.length > 0) {
                    //手机集合信息
                    for (var j = 0, phoneLength = mobilePhone.length; j < phoneLength; j++) {
                        var phoneName = mobilePhone[j]["name"];
                        var phoneNum = mobilePhone[j]["phoneNum"];
                        var assembleNameAndNum = phoneName + "(" + phoneNum + ")";
                        buildHtml += '<option>' + assembleNameAndNum + '</option>';
                        phoneCount++;
                    }
                    //手机集合信息
                }
                buildHtml += '</optgroup>';
                //}
                choicePhoneUser = phoneCount;
                document.getElementById("phoneGroupNums").innerHTML = phoneCount.toString();
                $('#select2_sample2').append(buildHtml);
            }

        } else {
            BootboxExt.alert("显示选中手机组数据错误");
        }

    }, "json");
}

var names;
var tellers;
$("#names").blur(function () {
    names = $("#names").val();
});

$("#tellers").blur(function () {
    tellers = $("#tellers").val();
});

//手机组弹框的相关操作   END



var cardPresentForm = $('#cardPresentForm');
cardPresentForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        /*batchNo: {
            required: true
        },*/
        name: {
            required: true,
            stringMaxLength:100
        },
        memo: {
            stringMaxLength:1024
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

var choiceCardTotal = 0;
var choicePhoneUser = 0;
$("#btnSave").click(function () {
    var batchNo = $("#batchNo").val();
    if (batchNo == null || batchNo == "") {
        BootboxExt.alert("请取批次号");
        return;
    }

    var cardTotal = document.getElementById("cardNums").innerHTML;
    var phoneTotal = document.getElementById("phoneGroupNums").innerHTML;
    var batchNo = $("#batchNo").val();
    var name = $("#name").val();
    var memo = $("#memo").val();
    if (cardPresentForm.valid()) {
        if (parseInt(cardTotal) == 0){
            BootboxExt.alert("请选择卡号");
            return;
        }
        if (parseInt(phoneTotal) == 0){
            BootboxExt.alert("请选择手机组");
            return;
        }
        if (parseInt(cardTotal) !=0 && parseInt(phoneTotal)!=0 && parseInt(cardTotal) < parseInt(phoneTotal)) {
            BootboxExt.alert("赠卡数不能小于人数");
            return;
        }
        if (parseInt(cardTotal) !=0 && parseInt(phoneTotal)!=0 && parseInt(cardTotal) >= parseInt(phoneTotal)) {
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#addBody"));
            $.post("/account-manage/card-present/send-card-present", {
                cardIds: sendCardIds,
                groupIds: sendGroupIds,
                cardTotal: cardTotal,
                phoneTotal: phoneTotal,
                batchNo: batchNo,
                name: name,
                memo: memo
            }, function (data) {
                $("#btnSave").attr("disabled",false);
                Shade.unblockUI($("#addBody"));
                if (data.result == true) {
                    BootboxExt.alert("赠卡成功", function () {
                        window.location.href = "/account-manage/card-present/gain-to-cardDetail/" + data.batchNo;
                    });
                } else {
                    BootboxExt.alert("赠卡失败");
                }
            });
        }
    }
});

$(function () {
    $("#goBack").click(function () {
        window.location.href = '/account-manage/card-present/search';
    });
});