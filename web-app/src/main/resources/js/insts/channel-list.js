function deleteChannelId(channelId) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/trans/deal-manage/channel/delete", { channelId: channelId}, function (data)
            {
                if(data.result == true){
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/trans/deal-manage/channel/search";
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

