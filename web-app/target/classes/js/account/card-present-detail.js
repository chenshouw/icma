function reSendCardPresent(phone) {
    var batchNo = $("#batchNo").val();
    $.post("/account-manage/card-present/reSend-prsent-card", {
        batchNo: batchNo,
        phoneNum: phone
    }, function (data) {
        if (data.result == true) {
            BootboxExt.alert("发送成功", function () {
                window.location.href = "/account-manage/card-present/gain-to-cardDetail/" + data.batchNo;
            });
        } else {
            BootboxExt.alert("发送失败");
        }
    });
}

$(function () {
    $("#goBack").click(function () {
        window.location.href = '/account-manage/card-present/search';
    });
});