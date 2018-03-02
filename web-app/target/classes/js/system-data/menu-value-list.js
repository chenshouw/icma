/*Begin --菜单查询页面的js*/
function deleteMenu(menuId) {
    $.get("/system-data/menu/todelete-left-menu", { id: menuId}, function (data)
    {
        var menu='';
        if(null != data && "" != data){
            for(var i = 0, len = data.length; i < len; i++){
                //获取当前的对象的属性值：data[i][item]
                for( var item in data[i] ){
                    if(item == "name"){
                        if(i==len-1){
                            menu+=data[i][item];
                            break;
                        }
                        menu+=data[i][item]+",";
                    }
                }
            }
        }
        var message = "确认删除吗？";
        if(menu != ''){
            message += '子菜单：'+menu+",及其下面的所有子菜单将一起全部被删除，请谨慎操作";
        }
        BootboxExt.confirm(message, function (res) {
            if (res) {
                $.get("/system-data/menu/delete-left-menu", { id: menuId}, function (data)
                {
                    if(data.result == true){
                        BootboxExt.alert("删除成功",function(res){
                            location.href="/system-data/menu/search";
                        });
                    }else{
                        BootboxExt.alert("删除失败", function (res) {
                            window.location.reload();
                        });
                    }
                }, "json");
            }else{
                BootboxExt.alert("已取消删除");
            }
        })
    }, "json");
}
/*End --菜单查询页面的js*/
