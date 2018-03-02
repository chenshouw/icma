var receiptVoucher = new Object();

function setSearchParam() {
    receiptVoucher.sksj = $("#sksj").val();
    receiptVoucher.custNo = $("#custNo").val();
    receiptVoucher.teller = $("#teller").val();
    receiptVoucher.payer = $("#payer").val();
    receiptVoucher.issuId = $("#issuId").val();

    receiptVoucher.modiTimeBegin = $("#modiTimeBegin").val();
    receiptVoucher.modiTimeEndClear = $("#modiTimeEndClear").val();

    receiptVoucher.popAmtBegin = $("#popAmtBegin").val();
    receiptVoucher.popAmtEnd = $("#popAmtEnd").val();
    receiptVoucher.ztzjAmtBegin = $("#ztzjAmtBegin").val();
    receiptVoucher.ztzjAmtEnd = $("#ztzjAmtEnd").val();
    receiptVoucher.usedAmtBegin = $("#usedAmtBegin").val();
    receiptVoucher.usedAmtEnd = $("#usedAmtEnd").val();
}
jQuery(document).ready(function () {
    setSearchParam();
    $("#modiTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modiTimeEnd").datetimepicker("setStartDate", $("#modiTimeBegin").val());
        $("#modiTimeBegin").datetimepicker("hide");
    });
    $("#modiTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#modiTimeBegin").datetimepicker("setEndDate", $("#modiTimeEnd").val());
        $("#modiTimeEnd").datetimepicker("hide");
    });
    /**
     * 交易开始时间清空事件
     */
    $("#modiTimeBeginClear").click(function () {
        $("#modiTimeBegin").val("");
    });
    /**
     * 交易结束时间清空事件
     */
    $("#modiTimeEndClear").click(function () {
        $("#modiTimeEnd").val("");
    });
});

var receiptVoucherForm = $('#receiptVoucherForm');
receiptVoucherForm.validate({
    focusInvalid: false,
    ignore: "",
    rules: {
    },
    highlight: function (element) {
        $(element)
            .closest('.form-group').addClass('has-error');
    },

    unhighlight: function (element) {
        $(element)
            .closest('.form-group').removeClass('has-error');
    },

    success: function (label) {
        label
            .closest('.form-group').removeClass('has-error');
    }
});
$(function () {
    $("#btnSearch").click(function () {
        if (receiptVoucherForm.valid()) { //验证通过
            $("#receiptVoucherForm").serialize();
            receiptVoucherForm.method = "post";
            receiptVoucherForm.action = "/sell-card/receipt-voucher/search";
            receiptVoucherForm.submit();
        }
    });
});

function deletereceiptVoucher(itemDetailId) {
    BootboxExt.confirm("确认删除吗?", function (res) {
        if (res) {
            $.get("/sell-card/receipt-voucher/todelete", {sksj: itemDetailId}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/sell-card/receipt-voucher/search";
                    });
                } else {
                    BootboxExt.alert("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            });
        }
    });
};

/**
 * 查询导出excel。
 */
$("#export").click(function () {
    $('#export').attr('disabled', true);
    var el = $("#listBody");
    Shade.blockUI(el);
    $.ajax({
        type: "POST",
        data: receiptVoucher,
        url: "/sell-card/receipt-voucher/export",
        dataType: "json",
        success: function (data) {
            Shade.unblockUI(el);
            $('#export').attr('disabled', false);
            if (data.code == 1) {
                var tempName = data.tempName;
                var fileName = data.fileName;
                var loadUrl = "/sell-card/receipt-voucher/down-excel-data?tempName=" + tempName + '&fileName=' + fileName;
                window.location.href = loadUrl;
            } else {
                BootboxExt.alert(data.msg, function () {
                });
            }
        },
        error: function () {
            Shade.unblockUI(el);
            BootboxExt.alert("网络异常，请联系维护人员", function () {
            });
        }
    });
});

function clearFile() {
    $("#batchFile").val('');
}

$(function () {
    // 批量导入按钮
    $("#batchImportBtn").click(function () {
        $('#batchImportModal').modal('show');
    })
    // 上传按钮
    $("#batchUploadBtn").attr('disabled', true);
    // 上传文件按钮点击的时候
    $("#batchUploadBtn").click(function () {
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

        // 进度条归零
        $("#progressBar").width("0%");
        // 上传按钮禁用
        $(this).attr('disabled', true);
        Shade.blockUI($("#listBody"));
        // 进度条显示
        $("#progressBar").parent().show();
        $("#progressBar").parent().addClass("active");
        // 上传文件
        UpladFile();
    })

    // 文件修改时
    $("#batchFile").change(function () {
        $("#batchUploadBtn").val("上传");
        $("#progressBar").width("0%");
        var file = $(this).prop('files');
        if (file.length != 0) {
            $("#batchUploadBtn").attr('disabled', false);
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
        xhr.open("POST", "/sell-card/receipt-voucher/upload", true);
        //注册回调函数
        xhr.onreadystatechange = callback;
        xhr.onload = function () {
            BootboxExt.alert(response, function (res) {
                if (response == "上传成功") {
                    location.href="/sell-card/receipt-voucher/search";
                }
            });
            $("#batchUploadBtn").attr('disabled', false);
            Shade.unblockUI($("#listBody"));
            $("#batchUploadBtn").val("上传");
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
            $("#batchUploadBtn").val("正在上传 " + completePercent);
        }
    };

});

/**
 * 下载模板
 */
function down() {
    Shade.blockUI($("#listBody"));
    var fileName = "receipt-voucher-template.xlsx";
    var loadUrl = "/sell-card/receipt-voucher/down?fileName=" + fileName;
    window.location.href = loadUrl;
    Shade.unblockUI($("#listBody"));
}


