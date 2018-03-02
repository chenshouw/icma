function deleteItemAndItemDetail(itemId) {
    $.get("/system-data/item/todelete-item-itemDetail", {id: itemId}, function (data) {
        if(data.result == true){
            BootboxExt.confirm("其下面有子数据，确定要删除吗？",function(res){
                if(res){
                    deleteItem(itemId);
                }else{
                    BootboxExt.alert("已取消删除!");
                }
            });
        }else{
            BootboxExt.confirm("确认删除吗?",function(res){
                if(res){
                    deleteItem(itemId);
                }
            });
        }
    })
}

function deleteItem(itemId){
    $.get("/system-data/item/delete-item-itemDetail", {id: itemId}, function (data) {
        if(data.result == true){
            BootboxExt.alert("删除成功",function(res){
                location.href = "/system-data/item/search";
            });
        }else{
            BootboxExt.alert("删除失败",function(res){
                window.location.reload();
            });
        }
    });
}
