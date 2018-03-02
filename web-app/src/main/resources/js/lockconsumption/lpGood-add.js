var addForm = $('form');
//非零数字或者-1
jQuery.validator.addMethod("onlynumbesidezero2", function (value, element) {
    return this.optional(element) || /^(\-1|[1-9]\d*)$/.test(value);
}, "只能包括-1和除0开头的数字");
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        issuId: {
            required: true
        },
        status: {
            required: true
        },
        qtyHwm: {
            required: true,
            onlynumbesidezero2: true,
            stringMaxLength: 12
        },
        ruleDesc: {
            stringMaxLength: 100
        },
        file: {
            required: true
        }
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

    //卡类别  修改事件
    $('input[name=cidType]').change(function () {
        var cidTypeLength = $('input[name=cidType]').length;
        for (var i = 1; i <= cidTypeLength; i++) {
            var id = 'cid' + i;
            $('#' + id).val('');
            $('#' + id).select2("val", "");
            $('#' + id).attr('disabled', true);
        }
        var id = 'cid' + $(this).data('id');
        $('#' + id).attr('disabled', false);
        /*var issuId = $("#issuId").val();
        if (issuId == null || issuId == '') {
            if (id == 'cid1') {
                BootboxExt.alert("请先选择发卡机构");
                return;
            }
        }*/
    });

    $("#issuId").change(function () {
        var issuId = $("#issuId").val();
        if ($('input[name=cidType]').length > 0) {
            $("#cid1").select2("val", "");
            $("#cid2").select2("val", "");
            if (issuId != null && issuId != '') {
                //产品子类型
                $.post("/sell-card/batch-open-card/getIssuId", {issuId: issuId},
                    function (data) {
                        $("#cid1").empty();
                        $("#cid1").append("<option value=''>请选择产品子类型</option>");
                        for (var i = 0; i < data.productTypes.length; i++) {
                            var productType = data.productTypes[i].productType;
                            var productName = data.productTypes[i].productName;
                            $("#cid1").append("<option value='" + productType + "'>" +productType+"-"+ productName + "</option>");
                        }
                        var id = $('input[name=cidType]:checked').data("id");
                        if (id==1) {
                            $("#cid1").attr("disabled", false);
                        }
                    }, "json");

                //客户号
                $.post("/mcustInfo/getByIssuId", {issuId: issuId},
                    function (data) {
                        $("#cid2").empty();
                        $("#cid2").append("<option value=''>请选择客户号</option>");
                        for (var i = 0; i < data.data.length; i++) {
                            var custNo = data.data[i].custNo;
                            var cliName = data.data[i].cliName;
                            $("#cid2").append("<option value='" + custNo + "'>" +custNo+"-"+ cliName + "</option>");
                        }
                        var id = $('input[name=cidType]:checked').data("id");
                        if (id==2) {
                            $("#cid2").attr("disabled", false);
                        }
                    }, "json");
            } else {
                //产品子类型

                $("#cid1").empty();
                $("#cid1").append("<option value=''>请选择产品子类型</option>");
                $("#cid1").attr("disabled", true);
                //客户号

                $("#cid2").empty();
                $("#cid2").append("<option value=''>请选择客户号</option>");
                $("#cid2").attr("disabled", true);
            }
        }
    });

    //新增
    $("#btnSave").click(function () {
        var f1 = addForm.valid();
        var f2 = valid();
        if (f1&&f2) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("body"));
            $.post("/lpGood/add",
                $("form").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("body"));
                    if (data.code == "success") {
                        BootboxExt.alert(data.msg, function (res) {
                            location.href = "/lpGood/search";
                        });
                    } else {
                        BootboxExt.alert(data.msg, function (res) {

                        });
                    }
                })
        }
    });

    //修改
    $("#btnUpdate").click(function () {
        var f1 = addForm.valid();
        var f2 = valid();
        if (f1&&f2) { //验证通过

            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("body"));
            $.post("/lpGood/update",
                $("form").serialize(),
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("body"));
                    if (data.code == "success") {
                        BootboxExt.alert(data.msg, function (res) {
                            location.href = "/lpGood/search";
                        });
                    } else {
                        BootboxExt.alert(data.msg, function (res) {
                            // window.location.reload();
                        });
                    }
                })
        }
    });
    $("#gDeny").change(gDenyChange);

    $("#gAllow").change(gAllowChange);

    $('[name=cid]').change(setRuleDesc);
});

function setRuleDesc() {
    var cid = "";
    if ($('input[name=cidType]').length > 0) {
        var id = $('input[name=cidType]:checked').data("id");
        if (id==1) {
            cid = '产品子类型：'+$("#cid"+id).find("option:selected").text();
        } else if (id==2) {
            cid = '客户号：'+$("#cid"+id).find("option:selected").text();
        }else if (id==3) {
            cid = '账号：'+$("#cid"+id).val();
        }else if (id==4) {
            cid = '卡号：'+$("#cid"+id).val();
        }
    }
    var gDeny = $("#gDeny").val() == null ? '' : '\n禁：' +$("#gDeny").val();
    var gAllow = $("#gAllow").val() == null ? '' : '\n准：' + $("#gAllow").val();
    $("#ruleDesc").val(cid+gDeny+gAllow);
}
function gDenyChange() {
    setRuleDesc();
    $("#gDeny").parent().siblings("span").remove();
    if ($("#gDeny").val()!=null && $("#gDeny").val().toString().length>600) {
        $("#gDeny").parent().after('<span for="gDeny" style="color: red;" class="help-block">长度不能大于600(一个中文字算3个字节)</span>');
        return false;
    }
    return true;
}

function gAllowChange() {
    setRuleDesc();
    $("#gAllow").parent().siblings("span").remove();
    if ($("#gAllow").val()!=null && $("#gAllow").val().toString().length>600) {
        $("#gAllow").parent().after('<span for="gAllow" style="color: red;" class="help-block">长度不能大于600(一个中文字算3个字节)</span>');
        return false;
    }
    return true;
}

function valid() {
    var flag = gDenyChange();
    var flag2 = gAllowChange();
    if (!flag || !flag2) {
        return false;
    }
    var cidTypeLength = $('input[name=cidType]').length;
    if (cidTypeLength>0) {
        var cidFlag = "fail";
        for (var i = 1; i <= cidTypeLength; i++) {
            var id = 'cid' + i;
            if (null != $('#' + id).val() && "" != $('#' + id).val()) {
                cidFlag = "success";
            }
        }
        if (cidFlag != "success") {
            BootboxExt.alert("请选择卡判别方式，并填写CID");
            return false;
        }
    }

    return true;
}


/**
 * 下载模板
 */
function down(){
    var fileName = "cardNo-template.xlsx";
    var loadUrl = "/lpGood/down?fileName=" + fileName;
    window.location.href = loadUrl;
}

$(function() {
    // 批量导入按钮
    $("#batchImportBtn").click(function(){
        var f1 = addForm.valid();
        var f2 = valid();
        if (f1&&f2) { //验证通过
            var obj = $("#batchFile");
            var photoExt = obj.val().substr(obj.val().lastIndexOf(".")).toLowerCase();//获得文件后缀名
            if (photoExt != ".xls" && photoExt != ".xlsx") {
                BootboxExt.alert("请选择xls或是xlsx格式的文件，不支持其他格式文件");
                return;
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
                return;
            }
            //模态框显示
            $("#uploadModal").modal("show");

            // 进度条归零
            $("#progressBar").width("0%");
            // 上传按钮禁用
            $(this).attr('disabled', true);
            Shade.blockUI($("body"));
            // 进度条显示
            $("#progressBar").parent().show();
            $("#progressBar").parent().addClass("active");
            // 上传文件
            UpladFile();
            // })
        }

    });


    // 文件修改时
    $("#batchFile").change(function() {
        $("#progressBar").width("0%");
        var file = $(this).prop('files');
        if (file.length != 0) {
            $("#batchImportBtn").attr('disabled', false);
        }

    });
    var xhr = new XMLHttpRequest();
    function UpladFile() {
        var fileObj = $("#batchFile").get(0).files[0]; // js 获取文件对象
        var issuId = $("#issuId").val();
        var gDeny = $("#gDeny").val()==null?'':$("#gDeny").val().toString();
        var gAllow = $("#gAllow").val()==null?'':$("#gAllow").val().toString();
        var qtyHwm = $("#qtyHwm").val();
        var status = $("#status").val();
        var ruleDesc = $("#ruleDesc").val();

        // FormData 对象
        var form = new FormData();
        form.append("enctype","multipart/form-data");
        // form.append("author", "hooyes"); // 可以增加表单数据
        form.append("file", fileObj); // 文件对象
        form.append("issuId", issuId);
        form.append("gDeny", gDeny);
        form.append("gAllow", gAllow);
        form.append("qtyHwm", qtyHwm);
        form.append("status", status);
        form.append("ruleDesc", ruleDesc);
        // XMLHttpRequest 对象
        xhr.open("POST", "/lpGood/upload", true);
        //注册回调函数
        xhr.onreadystatechange=callback;
        xhr.onload = function() {
            BootboxExt.alert(response, function (res) {
                if (response == "批量新增成功") {
                    location.href="/lpGood/search";
                }
            });

            $("#batchImportBtn").attr('disabled', false);
            Shade.unblockUI($("body"));
            $("#progressBar").parent().removeClass("active");
            $("#progressBar").parent().hide();
            $('#uploadModal').modal('hide');
        };
        xhr.upload.addEventListener("progress", progressFunction, false);
        xhr.send(form);
    }

    var response = "";
    function callback() {
        //接收响应数据
        //判断对象状态是否交互完成，如果为4则交互完成
        if(xhr.readyState == 4) {
            //判断对象状态是否交互成功,如果成功则为200
            if(xhr.status == 200) {
                //接收数据,得到服务器输出的纯文本数据
                response = xhr.responseText;
            }
        }
    }

    function progressFunction(evt) {
        var progressBar = $("#progressBar");
        if (evt.lengthComputable) {
            var completePercent = Math.round(evt.loaded / evt.total * 100)+ "%";
            progressBar.width(completePercent);
            $("#percentage").text(Math.round(evt.loaded / evt.total * 100)
                + "%");
            // $("#batchImportBtn").val("正在上传 " + completePercent);
        }
    };


})






