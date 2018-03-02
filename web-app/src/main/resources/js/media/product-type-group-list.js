function deleteproductTypeGroup(parProductType) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/media/product/group/delete", { parProductType: parProductType}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/media/product/group/search";
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
var productTypeGroup = new Object();
function setSearchParam() {
    productTypeGroup.parProductType = $("#parProductType").val();
    productTypeGroup.productName = $("#productGroupName").val();
    productTypeGroup.status = $("#status").val();
}
jQuery(document).ready(function () {
    setSearchParam();
});



