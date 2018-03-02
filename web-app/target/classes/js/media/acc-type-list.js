function deleteAccType(accType) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/media/acc/type/delete", { accType: accType}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/media/acc/type/search";
                    });
                }else{
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

var accType = new Object();
function setSearchParam() {
    accType.expFlag = $("#expFlag").val();
    accType.accType = $("#accType").val();
}

jQuery(document).ready(function () {
    setSearchParam();
});