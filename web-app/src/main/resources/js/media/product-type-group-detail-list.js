function deleteParProductTypeDetail(parProductType,productAttrArgs){
    BootboxExt.confirm("确认删除吗?",function(res){
        if(res){
            $.get("/media/product/group/delete-product-group-detail", {parProductType: parProductType,productAttrArgs:productAttrArgs}, function (data) {
                if(data.result == true){
                    BootboxExt.alert("删除成功",function(res){
                        location.href = "/media/product/group/to-detail?productTypeGroup="+parProductType;
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
        window.location.href = "/media/product/group/search";
    });
});
