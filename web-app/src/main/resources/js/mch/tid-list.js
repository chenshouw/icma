function reset(tid) {
    BootboxExt.confirm("激活重置将清空机器指纹、激活时间、最后登陆时间，状态回到待用，与该终端绑定的POS需要重新激活。你确定要激活重置吗？", function (res) {
        if (res) {
            $.post("/mch/tid/reset", {tid: tid}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("激活重置成功", function (res) {
                        location.href = "/mch/tid/search";
                    });
                } else {
                    BootboxExt.alert("激活重置失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

function deleteTidInfo(tid) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.post("/mch/tid/delete", {tid: tid}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/mch/tid/search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

var tidInfoVo = new Object();

function setSearchParam() {
    tidInfoVo.subMid = $("#subMid").val();
    tidInfoVo.tidName = $("#tidName").val();
    tidInfoVo.tid = $("#tid").val();
    tidInfoVo.flag = $("#flag").val();
    tidInfoVo.modifyTimeBegin = $("#modifyTimeBegin").val();
    tidInfoVo.modifyTimeEnd = $("#modifyTimeEnd").val();
}

jQuery(document).ready(function () {
    setSearchParam();
    $("#modifyTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modifyTimeEnd").datetimepicker("setStartDate", $("#modifyTimeBegin").val());
        $("#modifyTimeBegin").datetimepicker("hide");
    });
    $("#modifyTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        minView: "month",
        format: "yyyy-mm-dd",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modifyTimeBegin").datetimepicker("setEndDate", $("#modifyTimeEnd").val());
        $("#modifyTimeEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#modifyTimeBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#modifyTimeEnd").val("");
    });
});

function clearFile() {
    $("#batchFile").val('');
}

$(function () {
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
        xhr.open("POST", "/mch/tid/upload", true);
        //注册回调函数
        xhr.onreadystatechange = callback;
        xhr.onload = function () {
            BootboxExt.alert(response, function (res) {
                if (response == "上传成功") {
                    location.href = "/mch/tid/search";
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

    /**
     * 终端查询导出excel。
     */
    $("#export").click(function () {
        $("#export").attr('disabled', true);
        var el = $("#tidBody");
        Shade.blockUI(el);
        $.ajax({
            type: "POST",
            data: tidInfoVo,
            url: "/mch/tid/export",
            dataType: "json",
            success: function (data) {
                Shade.unblockUI(el);
                $("#export").attr('disabled', false);
                if (data.code == 1) {
                    var tempName = data.tempName;
                    var fileName = data.fileName;
                    var loadUrl = "/mch/tid/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
                    window.location.href = loadUrl;
                } else {
                    BootboxExt.alert(data.msg, function () {
                    });
                }
            },
            error: function () {
                BootboxExt.alert("网络异常，请联系维护人员", function () {
                });
            }
        });
    });
})

/**
 * 下载模板
 */
function down() {
    var fileName = "tid-info-template.xlsx";
    var loadUrl = "/mch/tid/down?fileName=终端批量导入-模板.xlsx&realFileAddr=" + fileName;
    window.location.href = loadUrl;
}



