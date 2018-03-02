function updateCardInfo(id) {
    BootboxExt.confirm("确认更新吗？", function (res) {
        if (res) {
            Shade.blockUI($("body"));
            $.get("/card/wx-card/update-card-detail", {id: id}, function (data) {
                Shade.unblockUI($("body"));
                if (data.result == true) {
                    BootboxExt.confirm("更新成功", function (res) {
                        window.location.reload();
                    });
                } else {
                    BootboxExt.confirm("微信端未处理请求，更新失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

function deleteCardInfo(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            Shade.blockUI($("body"));
            $.ajax({
                data: {id: id},
                url: "/card/wx-card/delete-card-detail",
                dataType: 'json',
                method: 'GET',
                success: function (data) {
                    Shade.unblockUI($("body"));
                    if (data.code == 'success') {
                        BootboxExt.alert(data.msg,function () {
                            getWxStatus(id);
                        });

                    } else {
                        BootboxExt.alert(data.msg);
                    }
                },
                error: function () {
                    Shade.unblockUI($("body"));
                    BootboxExt.alert("系统异常");
                }
            });
        }
    });
}

function getWxStatus(id){
    Shade.blockUI($("body"));
    $.ajax({
        data: {id: id},
        url: "/card/wx-card/wx-detail-search",
        dataType: 'json',
        method: 'GET',
        success: function (data) {
            Shade.unblockUI($("body"));
            if (data) {
                $('#'+id).html(getWxStatusName(data.memberCard.baseInfo.status));
            }
        },
        error: function () {
            Shade.unblockUI($("body"));
            BootboxExt.alert("系统异常");
        }
    });
}

function getWxStatusName(status){
    if (status == 'CARD_STATUS_NOT_VERIFY') {
        return "待审核";
    } else if (status == 'CARD_STATUS_VERIFY_FAIL') {
        return "审核失败";
    } else if (status == 'CARD_STATUS_VERIFY_OK') {
        return "通过审核";
    } else if (status == 'CARD_STATUS_DELETE') {
        return "已删除";
    } else if (status == 'CARD_STATUS_DISPATCH') {
        return "在公众平台投放过的卡券";
    }
    return "";
}

$(function () {
    $("#backPage").click(function () {
       window.location.href = "/card/wx-card/wx-card-search";
    });
});