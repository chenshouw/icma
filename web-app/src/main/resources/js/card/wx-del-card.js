$(function () {
    var size = parseInt($("#pageSize").val());
    var num = parseInt($("#pageNum").val());
    if (num <= 0) {
        $("#previous").addClass("disabled");
    }
    if (num >= size) {
        $("#next").addClass("disabled");
    }
});

function getPreviousData() {
    var offset = parseInt($("#pageNum").val()) - 1;
    if (offset < 0) {
        return false;
    }
    $("#pageNum").val(offset);
    $("#delCard").submit();
}

function getNextData() {
    var pageSize = parseInt($("#pageSize").val());
    var offset = parseInt($("#pageNum").val()) + 1;
    if (offset > pageSize) {
        return false;
    }
    $("#pageNum").val(offset);
    $("#delCard").submit();
}

function deleteCard(cardId) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/card/del-card/del-card-delete", {"cardId": cardId}, function (data) {
                if (data.result == true) {
                    BootboxExt.confirm(data.msg, function () {
                        location.href = "/card/del-card/del-card-search";
                    });
                } else {
                    BootboxExt.confirm(data.msg, function () {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}
