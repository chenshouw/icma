$(function () {
    setSearchParam();
});

var shopGrpDefVo = new Object();
function setSearchParam() {
    shopGrpDefVo.shopGrp = $("#shopGrp").val();
    shopGrpDefVo.groupName = $("#groupName").val();
    shopGrpDefVo.shopGrpDefShopId = $("#shopGrpDefShopId").val();
    shopGrpDefVo.cName = $("#cName").val();
    shopGrpDefVo.acqId = $("#acqId").val();
}

function deleteShopGrpDef(shopGrp,shopId) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/shop/shopGrpDef/delete", {shopGrp: shopGrp,shopId:shopId}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function () {
                        location.href = "/shop/shopGrpDef/search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function () {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

/**
 * 下载模板
 */
function down(){
    var fileName = "shop-grp-def-template.xlsx";
    var loadUrl = "/shop/shopGrpDef/down?fileName=" + fileName;
    window.location.href = loadUrl;
}

function clearFile() {
    $("#batchFile").val('');
}

$(function() {
    // 批量导入按钮
    $("#batchImportBtn").click(function () {
        $('#batchImportModal').modal('show');

        var fileValue = $("#batchFile").val();
        if (fileValue == null || fileValue == "") {
            BootboxExt.alert("请先选择文件");
            return;
        }
        var obj = $("#batchFile");
        var photoExt = obj.val().substr(obj.val().lastIndexOf(".")).toLowerCase();//获得文件后缀名
        if (photoExt != ".xls" && photoExt != ".xlsx") {
            BootboxExt.alert("请选择xls或是xlsx格式的文件，不支持其他格式文件");
            return false;
        }
        var fileSize = 0;
        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        if (isIE && !obj.files) {
            var filePath = obj.val();
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            var file = fileSystem.GetFile(filePath);
            fileSize = file.Size;
        } else {
            fileSize = obj.get(0).files[0].size;
        }
        fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
        if (fileSize > 5000) {
            BootboxExt.alert("文件不能大于5M");
            return false;
        }
        // 上传按钮
        $("#batchImportBtn").attr('disabled', true);
        // 上传文件按钮点击的时候
        // $("#batchImportBtn").click(function() {
        // 进度条归零
        $("#progressBar").width("0%");
        // 上传按钮禁用
        $(this).attr('disabled', true);
        // 进度条显示
        $("#progressBar").parent().show();
        $("#progressBar").parent().addClass("active");
        // 上传文件
        UpladFile();
        // })
    })


    // 文件修改时
    $("#batchFile").change(function () {
        $("#batchImportBtn").val("上传");
        $("#progressBar").width("0%");
        var file = $(this).prop('files');
        if (file.length != 0) {
            $("#batchImportBtn").attr('disabled', false);
        }

    });
    var xhr = new XMLHttpRequest();

    function UpladFile() {
        var fileObj = $("#batchFile").get(0).files[0]; // js 获取文件对象
        // FormData 对象
        var form = new FormData();
        form.append("enctype", "multipart/form-data");
        // form.append("author", "hooyes"); // 可以增加表单数据
        form.append("file", fileObj); // 文件对象
        // XMLHttpRequest 对象
        xhr.open("POST", "/shop/shopGrpDef/upload", true);
        //注册回调函数
        xhr.onreadystatechange = callback;
        xhr.onload = function () {
            BootboxExt.alert(response, function (res) {
                if (response == "上传成功") {
                    location.href = "/shop/shopGrpDef/search";
                }
            });
            $("#batchImportBtn").attr('disabled', false);
            $("#batchImportBtn").val("上传");
            $("#progressBar").parent().removeClass("active");
            $("#progressBar").parent().hide();
            $('#batchImportBtn').modal('hide');
        };
        xhr.upload.addEventListener("progress", progressFunction, false);
        xhr.send(form);
    }

    var response = "";

    function callback() {
        //接收响应数据
        //判断对象状态是否交互完成，如果为4则交互完成
        if (xhr.readyState == 4) {
            //判断对象状态是否交互成功,如果成功则为200
            if (xhr.status == 200) {
                //接收数据,得到服务器输出的纯文本数据
                response = xhr.responseText;
            }
        }
    }

    function progressFunction(evt) {
        var progressBar = $("#progressBar");
        if (evt.lengthComputable) {
            var completePercent = Math.round(evt.loaded / evt.total * 100) + "%";
            progressBar.width(completePercent);
            $("#batchImportBtn").val("正在上传 " + completePercent);
        }
    };
});