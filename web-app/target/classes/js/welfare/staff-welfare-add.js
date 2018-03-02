var el = $("#addBody");

batchFileChange = function () {
    Shade.blockUI(el);
    //禁止方法福利确定按钮
    $('#btnSave').addClass('disabled');
    $('#file').addClass('disabled');
    $("#excelSub").attr("disabled", false);
    //发送请求
    var issuId = $("#issuId").val();
    var productType = $("#productType").val();
    var welfareForm = new FormData($("#welfareForm")[0]);
    $.ajax({
        async: false,
        url: "/welfare/staff-welfare/excel-analysis",
        type: 'POST',
        data: welfareForm,
        processData: false,
        contentType: false,
        success: function (results) {
            Shade.unblockUI(el);

            var data = results.result;
            if (results.openCardStatus == false) {
                BootboxExt.alert(results.openCardMsg);
                return;
            }
            if (!data.status) {
                BootboxExt.alert(data.msg);
                $("#file").replaceWith('<input type="file" id="file" name="file" onchange="batchFileChange()"/>');
            } else {
                var tbExcel = document.getElementById('tbExcel');
                $("#tbExcel tr").empty();
                //全局数据异常标识
                var subFlag = true;
                for (var i = 0; i < data.result.length; i++) {
                    //行数据异常标识
                    var flag = true;
                    var row = document.createElement('tr');
                    row.style = "cursor: pointer;";
                    var welfareRecordVo = data.result[i];
                    var empNo = document.createElement('td');
                    empNo.innerHTML = welfareRecordVo.empNo;
                    var empNoIsNull = welfareRecordVo.empNo == "员工编号不可为空";
                    var objEmpNoFlag = welfareRecordVo.objEmpNo == "员工编号不可重复";
                    if (empNoIsNull || objEmpNoFlag || (!objEmpNoFlag && welfareRecordVo.objEmpNo != null)) {
                        empNo.setAttribute("style", "color:red;");
                        flag = false;
                    }

                    row.appendChild(empNo);
                    var empName = document.createElement('td');
                    empName.innerHTML = welfareRecordVo.empName;
                    var empNameIsNull = welfareRecordVo.empName == "员工姓名不可为空";
                    if (empNameIsNull) {
                        empName.setAttribute("style", "color:red;");
                        flag = false;
                    }

                    row.appendChild(empName);
                    var phone = document.createElement('td');
                    phone.innerHTML = welfareRecordVo.phone;
                    var phoneIsNull = welfareRecordVo.phone == "手机号码不可为空";
                    var objPhoneFlag = welfareRecordVo.objPhone == "手机号码不可重复";
                    if (phoneIsNull || objPhoneFlag || !welfareRecordVo.objPhone) {
                        phone.setAttribute("style", "color:red;");
                        flag = false;
                    }

                    row.appendChild(phone);
                    var amt = document.createElement('td');
                    amt.innerHTML = welfareRecordVo.amt;
                    var amtOut;
                    if (welfareRecordVo.objRechargeAmt == false) {
                        amt.setAttribute("style", "color:red;");
                        flag = false;
                    } else {
                        amtOut = welfareRecordVo.objRechargeAmt != true && (welfareRecordVo.objRechargeAmt.startsWith("福利卡单次充值上限为") || welfareRecordVo.objRechargeAmt.startsWith("福利卡余额上限为"));
                        if (amtOut) {
                            amt.setAttribute("style", "color:red;");
                            flag = false;
                        }
                    }

                    row.appendChild(amt);
                    var emailFlag = true;
                    var email = document.createElement('td');
                    email.innerHTML = welfareRecordVo.email;
                    if (!welfareRecordVo.objEmail) {
                        email.setAttribute("style", "color:red;");
                        flag = false;
                        emailFlag = false;
                    }

                    row.appendChild(email);
                    var status = document.createElement('td');
                    if (flag) {
                        status.innerHTML = "正常";
                    } else {
                        subFlag = false;
                        var statusMsg = "";

                        if (objEmpNoFlag) {
                            statusMsg += "员工编号重复，";
                        } else if (!empNoIsNull && !objEmpNoFlag && welfareRecordVo.objEmpNo != null) {
                            statusMsg += "该员工福利卡异常：" + welfareRecordVo.objEmpNo + "，";
                        }

                        if (objPhoneFlag) {
                            statusMsg += "手机号码重复，";
                        } else if (!phoneIsNull && !welfareRecordVo.objPhone) {
                            statusMsg += "手机号码格式错误，";
                        }

                        /*if (welfareRecordVo.amt != "充值金额不可为空" && !welfareRecordVo.objRechargeAmt) {
                            statusMsg += "充值金额必须为0-1000的正数，" + welfareRecordVo.objRechargeAmt;
                        }*/

                        if (amtOut) {
                            statusMsg += welfareRecordVo.objRechargeAmt + "，";
                        }
                        if (!emailFlag) {
                            statusMsg += "邮箱格式错误，";
                        }

                        if (statusMsg.length > 0) {
                            statusMsg = statusMsg.substring(0, statusMsg.length - 1);
                        } else {
                            if (empNoIsNull || empNameIsNull || phoneIsNull || welfareRecordVo.amt == "充值金额不可为空") {
                                statusMsg += "异常，";
                            }
                        }
                        if (statusMsg != "") {
                            status.innerHTML = statusMsg.split("，")[0];
                        } else {
                            status.innerHTML = statusMsg;
                        }
                        status.setAttribute("style", "color:red;");
                    }
                    row.appendChild(status);
                    tbExcel.appendChild(row);
                }

                if (!subFlag) {
                    //禁止提交
                    $("#excelSub").attr("disabled", true);
                    //重置change事件
                    $("#file").replaceWith('<input type="file" id="file" name="file" onchange="batchFileChange()"/>');
                } else {
                    if (null != data.bal && -1 != data.bal) {
                        var balTr = document.createElement('tr');
                        balTr.style = "cursor: pointer;";
                        var balTd = document.createElement('td');
                        balTd.innerHTML = "金额总计：" + data.bal;
                        balTr.appendChild(balTd);
                        tbExcel.appendChild(balTr);
                    }
                }

                $("#excelTable").modal('show');
            }
        },
        error: function (result) {
            BootboxExt.alert("文件解析失败");
        }
    });
    $('#btnSave').removeClass('disabled');
    $('#file').removeClass('disabled');
}

closeExcelTable = function () {
    //重置change事件
    $("#file").replaceWith('<input type="file" id="file" name="file" onchange="batchFileChange()"/>');
}

subExcel = function () {
    $("#excelTable").modal('hide');
}


function checkFile() {
    var fileValue = $("#file").val();
    if (fileValue == null || fileValue == "") {
        BootboxExt.alert("请先选择文件");
        return false;
    }
    var obj = $("#file");
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
    return true;
}

function changeIssuId() {
    $("#file").replaceWith('<input type="file" id="file" name="file" onchange="batchFileChange()"/>');
}

$(function () {
    /**
     * 福利发放时间
     */
    $("#month").datetimepicker({
        language: 'ja',
        timePicker: false,
        startView: "year",
        minView: "year",
        format: "yyyy-mm",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        // $("#txnTimeEnd").datetimepicker("setStartDate", $("#txnTimeBegin").val());
        $("#month").datetimepicker("hide");
    });

    /**
     * 福利发放时间清空事件
     */
    $("#monthClear").click(function () {
        $("#month").val("");
    });

    //监听文件框的值
    document.getElementById("file").addEventListener('click', function () {
        this.value = '';
    }, false);

    $(function () {

        $("#file").click(function () {
            var issuId = $("#issuId").val();
            if (issuId == null || issuId == "") {
                BootboxExt.alert("请选择发卡机构");
                return false;
            }

            var custNo = $("#custNo").val();
            if (custNo == null || custNo == "") {
                BootboxExt.alert("请选择客户号");
                return false;
            }

            var productType = $("#productType").val();
            if (productType == null || productType == "") {
                BootboxExt.alert("请选择产品子类型");
                return false;
            }

            var month = $("#month").val();
            if (month == null || month == "") {
                BootboxExt.alert("请选择发放月份");
                return false;
            }
        })

        // 上传按钮
        // $("#btnSave").attr('disabled', true);
        // 上传文件按钮点击的时候
        $("#btnSave").click(function () {
            var issuId = $("#issuId").val();
            if (null == issuId || '' == issuId) {
                BootboxExt.alert("发卡机构不可为空");
                return;
            }

            var custNo = $("#custNo").val();
            if (custNo == null || custNo == "") {
                BootboxExt.alert("请选择客户号");
                return false;
            }

            var fileValue = $("#file").val();
            if (fileValue == null || fileValue == "") {
                BootboxExt.alert("请先选择文件");
                return false;
            }
            var month = $("#month").val();
            if (month != null && month != '') {
                Shade.blockUI($("#addBody"));
                // 上传文件
                UpladFile();
            } else {
                BootboxExt.alert("请选择发放月份");
            }

        })


        var xhr = new XMLHttpRequest();

        function UpladFile() {
            var fileObj = $("#file").get(0).files[0]; // js 获取文件对象
            // FormData 对象
            var form = new FormData();
            form.append("enctype", "multipart/form-data");
            form.append("month", $("#month").val()); // 可以增加表单数据
            form.append("productType", $("#productType").val()); // 可以增加表单数据
            form.append("parProductType", $("#parProductType").val());
            form.append("issuId", $("#issuId").val());
            form.append("custNo", $("#custNo").val());
            form.append("file", fileObj); // 文件对象
            // XMLHttpRequest 对象
            xhr.open("POST", "/welfare/staff-welfare/export-welfare", true);
            //注册回调函数
            xhr.onreadystatechange = callback;
            xhr.onload = function () {
                BootboxExt.alert(response, function (res) {
                    location.href = "/welfare/staff-welfare/search";
                });
            };
            xhr.upload.addEventListener("progress", progressFunction, false);
            xhr.send(form);
        }

        var response = "";

        function callback() {
            Shade.unblockUI($("#addBody"));
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
    })

})

$("#issuId").change(function () {
    var issuId = $("#issuId").val();
    $("#custNo").val("");
    $("#cliName").val("");
    $.post("/welfare/staff-welfare/getIssuId", { issuId: issuId },
        function (data) {
            $("#productType").removeAttr("disabled");
            $("#productType").empty();
            $("#productType").append("<option value=''>请选择产品子类型</option>");
            for (var i = 0; i < data.productTypes.length; i++) {
                var productType = data.productTypes[i].productType;
                var productName = data.productTypes[i].productName;
                $("#productType").append("<option value='" + productType + "'>" +productName + "</option>");
            }
        }, "json");
});

/**
 * 初始化表格数据。
 */
function initMcustTables() {
    var issuId = $("#issuId").val();
    if (issuId == null || issuId == "") {
        BootboxExt.alert("请先选择对应的发卡机构");
        return;
    } else {
        $('#mcustModal').modal('show');
        $("#custNoParam").empty();
        $("#cliNameParam").empty();
        $("#certNo").empty();
        $("#teller").empty();

        //先销毁表格
        $('#mcust_tables').bootstrapTable('destroy');
        //初始化表格,动态从服务器加载数据
        $("#mcust_tables").bootstrapTable({
            method: "GET",  //使用get请求到服务器获取数据
            url: '/mcustInfo/search-mcustInfo-list', //获取数据的Servlet地址
            striped: true,  //表格显示条纹
            showRefresh: true,  //显示刷新按钮
            pagination: true,                   //是否显示分页（*）
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            queryParamsType: '',
            queryParams: queryMcustParams,
            singleSelect: true,
            uniqueId: "custNo",
            columns: [
                {
                    field: 'checked',
                    checkbox: true
                },
                {
                    field: 'custNo',
                    title: '客户号'
                }, {
                    field: 'cliName',
                    title: '客户名称'
                },{
                    field: 'cliAddr',
                    title: '客户地址'
                },{
                    field: 'certNo',
                    title: '身份证号码'
                },
                {
                    field: 'cliCaller',
                    title: '联系人'
                }, {
                    field: 'cliPhone1',
                    title: '联系电话1'
                }, {
                    field: 'cliPhone2',
                    title: '联系电话2'
                }, {
                    field: 'ywyId',
                    title: '业务员'
                }, {
                    field: 'issuInstName',
                    title: '所属发卡机构'
                }, {
                    field: 'orgCode',
                    title: '所属部门代码'
                }, {
                    field: 'sec',
                    title: '所属片区'
                }, {
                    field: 'teller',
                    title: '操作员'
                }
            ],
            onLoadError: function () {  //加载失败时执行
                BootboxExt.alert("加载数据失败", {time: 1500, icon: 2});
            }
        });
    }


}

function queryMcustParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        custNoParam: $("#custNoParam").val(),
        cliNameParam: $("#cliNameParam").val(),
        certNo: $("#certNo").val(),
        teller: $("#teller").val(),
        custNo:$("#custNo").val(),
        issuId:$("#issuId").val()
    };
    return temp;
}

$("#mcustBtn").click(function () {
    var selectInfo = $("#mcust_tables").bootstrapTable('getSelections')[0];
    if(selectInfo == null ||  selectInfo.length < 1) {
        BootboxExt.alert("请选择客户信息");
        return;
    }
    $('#mcustModal').modal('hide');
    $("#custNo").val(selectInfo == undefined ? "" : selectInfo.custNo);
    $("#cliName").val(selectInfo == undefined ? "" : selectInfo.cliName);
});

//重置客户号查询的信息
function cleanMcustQueary(){
    $("#custNoParam").val("");
    $("#cliNameParam").val("");
    $("#custNo").val("");
    $("#teller").val("");
    $("#certNo").val("");
    initMcustTables();
}