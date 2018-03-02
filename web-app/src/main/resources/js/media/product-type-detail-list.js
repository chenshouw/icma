function deleteProductTypeDetail(productType,productAttrArgs){
    BootboxExt.confirm("确认删除吗?",function(res){
        if(res){
            $.get("/media/product/type/delete-productTypeDetail", {productType: productType,productAttrArgs:productAttrArgs}, function (data) {
                if(data.result == true){
                    BootboxExt.alert("删除成功",function(res){
                        location.href = "/media/product/type/detail?productType="+productType;
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
        window.location.href = "/media/product/type/search";
    });
});
