function deleteItemDetail(itemDetailId){
    var itemId = document.getElementById("itemId").value;
    BootboxExt.confirm("确认删除吗?",function(res){
        if(res){
            $.get("/system-data/item/delete-itemDetail", {id: itemDetailId}, function (data) {
                if(data.result == true){
                    BootboxExt.alert("删除成功",function(res){
                        location.href = "/system-data/item/detail?id="+itemId;
                    });
                }else{
                    BootboxExt.alert("删除失败",function(res){
                        window.location.reload();
                    });
                }
            });
        }
    });
}


$(function () {
    $("#goBack").click(function () {
        var itemId = document.getElementById("itemId").value;
        window.location.href = "/system-data/item/search";
    });
});
