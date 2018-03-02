function reSendCardPresent(phone) {
    var batchNo = $("#batchNo").val();
    $.post("/account-manage/card-present/reSend-prsent-card", {
        batchNo: batchNo,
        phoneNum: phone
    }, function (data) {
        if (data.result == true) {
            BootboxExt.alert("发送成功", function () {
                window.location.href = "/welfare/staff-welfare/to-cardDetail?batchNo=" + data.batchNo;
            });
        } else {
            BootboxExt.alert("发送失败");
        }
    });
}

/**
 * 重发充值短信通知。
 * @param cardId 卡号
 */
function reSendRecharge(cardNo) {
    var cardNo = trimString(cardNo, true);
    var batchNo = $("#batchNo").val();
    $.post("/welfare/staff-welfare/resend-recharge-welfare", {
        batchNo: batchNo,
        cardNo: cardNo
    }, function (data) {
        if (data.result == true) {
            BootboxExt.alert("发送成功", function () {
                window.location.href = "/welfare/staff-welfare/to-cardDetail?batchNo=" + data.batchNo;
            });
        } else {
            BootboxExt.alert("发送失败");
        }
    });

}

/**
 * 重新充值
 * @param cardId 卡号
 */
var batchNo = $("#batchNo").val();
function reRecharge(cardId) {
    var cardNo = trimString(cardId, true);
    $.post("/welfare/staff-welfare/welfare-reRecharge", {
        batchNo: batchNo,
        cardNo: cardNo
    }, function (data) {
        if (data.result == true) {
            BootboxExt.alert("充值成功", function () {
                window.location.href = "/welfare/staff-welfare/to-cardDetail?batchNo=" + data.batchNo;
            });
        } else {
            BootboxExt.alert("充值失败");
        }
    });
}

function reGrantWelfare(phone) {
    $.post("/welfare/staff-welfare/welfare-regrant", {
        batchNo: batchNo,
        phone: phone,
        productType: productType
    }, function (data) {
        if (data.result == true) {
            BootboxExt.alert("操作成功", function () {
                window.location.href = "/welfare/staff-welfare/to-cardDetail?batchNo=" + data.batchNo;
            });
        } else {
            BootboxExt.alert("操作失败");
        }
    });
}


/**
 * 查询导出excel。
 */
$("#export").click(function () {
    $('#export').addClass('disabled');
    var el = $("#welfareCardDetailForm");
    Shade.blockUI(el);
    var batchNo = $("#batchNo").val();
    var memo = $("#memo").val();
    $.ajax({
        type: "POST",
        data: {"batchNo": batchNo, "fileName": memo},
        url: "/welfare/staff-welfare/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').removeClass('disabled');
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/welfare/staff-welfare/down-excel-data?tempName=" + tempName + "&fileName=" + fileName;
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

/**
 * 去掉卡号的所有空格
 * @param str
 * @param is_global 是否需要去掉中间的空格
 * @returns 新的Str
 */
function trimString(str, is_global) {

    var result;

    result = str.replace(/(^\s+)|(\s+$)/g, "");

    if (is_global) {
        result = result.replace(/\s/g, "");
    }

    return result;

}