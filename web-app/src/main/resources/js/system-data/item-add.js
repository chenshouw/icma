var itemDetailTable;
var saveOrCancelFlag = false;
var saveOrNoChange = 0;//0表示未动表格数据，1表示已动表格数据
var TableEditable = function () {
    return {
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }
                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                //onblur="checkDCode()"  onblur="checkDName()"  onblur="checkDOrderId()"   onblur="checkDSupperCode()"
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" id="dCode" class="form-control input-small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" id="dName" class="form-control input-small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" id="dDescription" class="form-control input-small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<select class="form-control select-small" id="dStatus" style="width: 110px;"/><option value="有效">有效</option><option value="失效">失效</option>';
                if (selectStatus == 1) { //当点击已新增再编辑的数据时才需要去设定当前选定的值，否则默认值
                    $("#dStatus").val(cancelStatus);
                }
                jqTds[4].innerHTML = '<input type="text" id="dOrderId" class="form-control input-small" value="' + aData[4] + '">';
                jqTds[5].innerHTML = '<input type="text" id="dSupperCode" class="form-control input-small" value="' + aData[5] + '">';
                jqTds[6].innerHTML = '<a class="edit" href="">保存</a>';
                jqTds[7].innerHTML = '<a class="cancel" href="">取消</a>';
            }

            //编辑完成后保存
            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                var jqSelects = $('select', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqSelects[0].value, nRow, 3, false); //多加一列需要多加一行这个
                oTable.fnUpdate(jqInputs[3].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 5, false);
                oTable.fnUpdate('<a class="edit" href="">编辑<input type="hidden" value="' + selectExitId + '"></a>', nRow, 6, false);
                oTable.fnUpdate('<a class="delete" href="">删除<input type="hidden" value="' + selectExitId + '"></a>', nRow, 7, false);
                oTable.fnDraw();
            }

            //取消行的编辑
            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                var jqSelects = $('select', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqSelects[0].value, nRow, 3, false); //多加一列需要多加一行这个
                oTable.fnUpdate(jqInputs[2].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 5, false);
                oTable.fnUpdate('<a class="edit" href="">编辑<input type="hidden" value="' + selectExitId + '"></a>', nRow, 6, false);
                oTable.fnUpdate('<a class="delete" href="">删除<input type="hidden" value="' + selectExitId + '"></a>', nRow, 7, false);
                oTable.fnDraw();
            }

            var oTable = $('#sample_editable_1').dataTable({
                "bLengthChange": false, //关闭每页显示多少条数据
                "bPaginate": false, //翻页功能
                "bFilter": false, //过滤功能
                "bPaginate": false,//是否使用分页
                "bSort": true, //排序功能
                "bJQueryUI": false,
                "bInfo": false,//页脚信息
                "bAutoWidth": false,//自动宽度
                "bProcessing": false,//正在处理提示
                "oLanguage": {
                    "sEmptyTable": "没有数据"
                }
            });

            jQuery('#sample_editable_1_wrapper .dataTables_filter input').addClass("form-control input-medium"); // modify table search input
            jQuery('#sample_editable_1_wrapper .dataTables_length select').addClass("form-control input-small"); // modify table per page dropdown
            jQuery('#sample_editable_1_wrapper .dataTables_length select').select2({
                showSearchInput: false //hide search box with special css class
            }); // initialize select2 dropdown

            var nEditing = null;
            var tIndex = 0; //0：初始化为0第一次能新增一行，表示能新增，2：正在执行新增操作，此动作必须完成后才能完成第n次新增,1：表示无操作，3：表示点击编辑之后点击取消，然后再新增的操作！
            $('#sample_editable_1_new').click(function (e) {
                e.preventDefault();
                //新增时可以查看一下tIndex
                if (tIndex == 0) {
                    var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '']);
                    var nRow = oTable.fnGetNodes(aiNew[0]);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                    itemDetailTable = oTable;
                    $("#dStatus").val("有效");
                    tIndex = 1;  //第一次新增数据验证通过之后取消需要用
                    selectExitId = 0;
                    saveOrCancelFlag = false;
                    saveOrNoChange = 1;
                } else if (tIndex == 2) {
                    var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '']);
                    var nRow = oTable.fnGetNodes(aiNew[0]);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                    itemDetailTable = oTable;
                    $("#dStatus").val("有效");
                    // tIndex = 3;  //后面的第n次添加,第n次取消时需要用
                    tIndex = 1;
                    selectExitId = 0;
                    saveOrCancelFlag = false;
                    saveOrNoChange = 1;
                } else {
                    BootboxExt.alert("请完成当前的添加操作");
                    saveOrCancelFlag = false;
                    saveOrNoChange = 1;
                }
            });

            $('#sample_editable_1 a.delete').live('click', function (e) {
                e.preventDefault();
                var nRow = $(this).parents('tr')[0];
                //点击删除时nRow= $(this).parent("td")[0].innerHTML;
                //得到当前操作列的数据
                var nColumn = $(this).parent("td")[0].innerHTML;
                BootboxExt.confirm("该操作不可逆，确认删除此行数据?", function (res) {
                    if (res) {
                        oTable.fnDeleteRow(nRow);
                        //getSelectExitId(nColumn, 'value="', '></a>');
                        // 删除时selectEXITiD= selectExitId,得到删除当前对象的id;
                        BootboxExt.alert("删除成功");
                        saveOrCancelFlag = true;
                        saveOrNoChange = 1;
                    }
                })
            });

            var addIndexAndCancel = 0;
            var beginStatusIndex = 1; //代表第n次取消,不是第一次取消
            $('#sample_editable_1 a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {  //第一次新增一行数据，用户没有进行任何操作时将此行删除
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                    saveOrCancelFlag = true;
                    saveOrNoChange = 1;
                    //alert("未做任何操作并取消！");
                } else {
                    //alert("取消1-------dCodeFlag="+dCodeFlag+"---dNameFlag="+dNameFlag+"---dSupperCodeFlag="+dSupperCodeFlag+"---dOrderIdFlag="+dOrderIdFlag+"---dDescriptionFlag="+dDescriptionFlag);
                    validItemDetail1(0);
                    if (true == dCodeFlag && true == dNameFlag && true == dSupperCodeFlag && true == dOrderIdFlag && true == dDescriptionFlag) {
                        validItemDetail();
                        if (tIndex == 1) {  //当新增完一条数据后，用户直接点击了取消，我们需要保存它的合法数据
                            cancelStatus = document.getElementById("dStatus").value;  //第一次取消时，获得用户选择的数据，当用户第n次进行编辑然后取消时还原数据需要用
                            //alert("第一次取消！！！====cancelStatus="+cancelStatus);
                            saveRow(oTable, nEditing);
                            nEditing = null;
                            beginStatusIndex = 0;
                            //alert("1取消成功！");
                            BootboxExt.alert("取消成功");
                            saveOrCancelFlag = true;
                            saveOrNoChange = 1;
                            tIndex = 2;  //保存成功，允许新增一行
                            cancelCode = "";
                            cancelName = "";
                            cancelOrderId = "";
                            cancelSupperCode = "";
                            cancelDescription = "";
                            $("#dStatus").val("有效");
                        } else if (tIndex == 3) {
                            //'toStatus='+document.getElementById("dStatus").value+"----cancelStatus="+cancelStatus;
                            if (addIndexAndCancel == 1) {  //1.点击编辑后取消的，需要还原数据，0：未点击编辑取消，也就是新增完数据之后直接取消的
                                //alert("点击编辑后取消===cancelStatus="+cancelStatus);
                                $("#dCode").val(cancelCode);
                                $("#dName").val(cancelName);
                                $("#dOrderId").val(cancelOrderId);
                                $("#dSupperCode").val(cancelSupperCode);
                                $("#dDescription").val(cancelDescription);
                                $("#dStatus").val(cancelStatus);
                            }
                            saveRow(oTable, nEditing);
                            nEditing = null;
                            BootboxExt.alert("取消成功");
                            saveOrCancelFlag = true;
                            saveOrNoChange = 1;
                            dCodeFlag = false;
                            dNameFlag = false;
                            dSupperCodeFlag = false;
                            dOrderIdFlag = false;
                            tIndex = 2;  //保存成功，允许新增一行,然后将数据设置为初始值
                            cancelCode = "";
                            cancelName = "";
                            cancelOrderId = "";
                            cancelSupperCode = "";
                            cancelDescription = "";
                            cancelStatus = "有效";
                            //$("#dStatus").val("有效");
                        }
                    } else if (false == dCodeFlag && false == dNameFlag && false == dSupperCodeFlag && false == dOrderIdFlag) {
                        //alert("验证未通过删除");
                        var nRow = $(this).parents('tr')[0];
                        oTable.fnDeleteRow(nRow);
                        saveOrCancelFlag = true;
                        saveOrNoChange = 1;
                        tIndex = 0;
                    } else {
                        validItemDetail();
                        validItemDetail1(0);
                        if (true == dCodeFlag && true == dNameFlag && true == dSupperCodeFlag && true == dOrderIdFlag && true == dDescriptionFlag) {
                            restoreRow(oTable, nEditing);   //第一次取消时，
                            saveOrCancelFlag = true;
                            saveOrNoChange = 1;
                            nEditing = null;
                            cancelStatus = document.getElementById("dStatus").value;
                            beginStatusIndex = 0;
                        }



                    }
                }
            });

            var cancelCode;
            var cancelName;
            var cancelOrderId;
            var cancelSupperCode;
            var cancelDescription;
            var cancelStatus = "有效";
            var selectStatus = 0;
            $('#sample_editable_1 a.edit').live('click', function (e) {
                e.preventDefault();
                var nRow = $(this).parents('tr')[0];
                if (nEditing !== null && nEditing != nRow) {
                    //alert("编辑1");
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                    saveOrCancelFlag = true;
                    saveOrNoChange = 1;
                } else if (nEditing == nRow && this.innerHTML == "保存") {
                     //alert("编辑2"+"-----dCodeFlag="+dCodeFlag+"----dNameFlag="+dNameFlag+"----dSupperCodeFlag="+dSupperCodeFlag+"---dOrderIdFlag="+dOrderIdFlag);
                    validItemDetail();
                    validItemDetail1(0);
                    if (beginStatusIndex == 1) {  //不是第一次取消才去获取Status
                        cancelStatus = document.getElementById("dStatus").value;
                    }
                    if (true == dCodeFlag && true == dNameFlag && true == dSupperCodeFlag && true == dOrderIdFlag && true == dDescriptionFlag) {
                        saveRow(oTable, nEditing);
                        nEditing = null;
                        BootboxExt.alert("保存成功");
                        dCodeFlag = false;
                        dNameFlag = false;
                        dSupperCodeFlag = false;
                        dOrderIdFlag = false;
                        saveOrCancelFlag = true;
                        saveOrNoChange = 1;
                        tIndex = 2;
                        //保存成功后将状态恢复默认值
                        //$("#dStatus").val("无效");
                        //selectExitId = 0;
                    }
                } else {//点击了编辑后再取消的
                    selectStatus = 1;  //在编辑时让下拉框选中当前数据的值，1：表示需要获取当前数据的值并设置它
                    //得到当前操作列的数据
                    //alert("编辑3");
                    var nColumn = $(this).parent("td")[0].innerHTML;
                    var nRows = $(this).parents('tr')[0].innerHTML;
                    //alert("nRow="+ nRows);
                    getSelectDStatus(nRows);

                    getSelectExitId(nColumn, 'value="', '></a>');
                    editRow(oTable, nRow);
                    nEditing = nRow;
                    cancelCode = $("#dCode").val();
                    cancelName = $("#dName").val();
                    cancelOrderId = $("#dOrderId").val();
                    cancelSupperCode = $("#dSupperCode").val();
                    cancelDescription = $("#dDescription").val();
                    //alert("selectDStatus="+selectDStatus);
                    cancelStatus = selectDStatus;
                    $("#dStatus").val(selectDStatus);
                    addIndexAndCancel = 1;
                    tIndex = 3;
                    saveOrCancelFlag = false;
                    saveOrNoChange = 1;
                }
            });
        }
    };
}();

var selectDStatus = "有效";
function getSelectDStatus(nRow) {
    var strArray = new Array;
    strArray = nRow.split('<td class=');
    var currentStatu = strArray[4];
    //alert(currentStatu);
    var x = currentStatu.indexOf(">") + 1;
    var y = currentStatu.indexOf("</td>");
    selectDStatus = currentStatu.substring(x, y);
}


var selectExitId = 0;
//得到当前要操作对象的id
function getSelectExitId(nColumn, beginStr, endStr) {
    var x = nColumn.indexOf(beginStr) + 7;
    var y = nColumn.indexOf(endStr) - 1;
    selectExitId = nColumn.substring(x, y);
}


//传递到后台所需的每列对应的id
var ids;
function getColumnsId(row, col) {
    var x = 0;
    var y = 0;
    var colText = "";
    if (null != itemDetailTable) {
        //oTable经过了编辑等操作，已被初始化
        var nTrs = itemDetailTable.fnGetNodes();
        var t = itemDetailTable.fnGetData(nTrs[row]);
        colText = $(t[col]).find("input").val();
    } else {  //oTable没有初始化，得不到oTable,只有点击新增按钮时才会初始化，所以，需要用另外的方式获得当前的列的文本
        var text = $("#sample_editable_1").find("tr").eq(row + 1).find("td").eq(col).find("input").val();
        colText = text;
    }
    // x = colText.indexOf('value="') + 7;
    // y = colText.indexOf('></a>') - 1;
    // ids = colText.substring(x, y);
    ids = colText;
}

var itemForm = $('#itemForm');
itemForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        category: {
            blank: true,
            required: true,
            newNumberAndCharacter:true,
            stringMaxLength: 50
        },
        name: {
            blank: true,
            required: true,
            stringMaxLength: 100
        },
        description: {
            stringMaxLength: 500
        },
        orderId: {
            required: true,
            number: true,
            stringMaxLength: 5
        },
        status: {
            required: true
        },
        sample_editable_1: {
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

var dCodeFlag = false;
var dNameFlag = false;
var dSupperCodeFlag = false;
var dOrderIdFlag = false;
var dDescriptionFlag = false;
//数据字典详情的数据的验证
function validItemDetail() {
    var dCode = $("#dCode").val();
    var dName = $("#dName").val();
    var dOrderId = $("#dOrderId").val();
    var dSupperCode = $("#dSupperCode").val();
    var dDescription = $("#dDescription").val();
    if (null == dCode || "" == dCode) {
        BootboxExt.alert("编号不能为空");
        return;
    }
    if (/^[0-9A-Za-z_:\-]+$/.test(dCode) == false) {
        BootboxExt.alert("编号请输入数字、字母或者“-”，“:”，“_”符号");
        return;
    }
    validaLength(dCode);
    if (valueLength > 12) {
        BootboxExt.alert("编号长度不能大于12");
        return;
    }


    if (null == dName || "" == dName) {
        BootboxExt.alert("名称不能为空");
        return;
    }

    validaLength(dName);
    if (valueLength > 100) {
        BootboxExt.alert("名称长度不能大于100");
        return;
    }

    validaLength(dDescription);
    if (valueLength > 200) {
        BootboxExt.alert("描述长度不能大于200");
        return;
    }

    var regex = /^[0-9]*$/;
    if (null == dOrderId || "" == dOrderId) {
        BootboxExt.alert("序号不能为空");
        return;
    } else if (regex.test(dOrderId) == false) {
        BootboxExt.alert("序号只能输入数字");
        return;
    }

    validaLength(dOrderId);
    if (valueLength > 5) {
        BootboxExt.alert("序号长度不能大于5");
        return;
    }

    var supRegx = /^[0-9A-Za-z_\-]+$/;
    if (null == dSupperCode || "" == dSupperCode) {
        BootboxExt.alert("父级编号不能为空");
        return;
    } else if (!supRegx.test(dSupperCode)) {
        BootboxExt.alert("父级编号请输入数字、字母或者“-”，“_”符号");
        return;
    }

    validaLength(dSupperCode);
    if (valueLength > 12) {
        BootboxExt.alert("父级编号长度不能大于12");
        return;
    }
}

var valueLength = 0;
function validaLength(value) {
    var length = value.length;
    for (var i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) {
            length+=2;
        }
    }
    valueLength = length;
}

function validItemDetail1(num) {  //num=0表示正处于编辑状态并保存时，num=1表示提交表单时需要判断表格数据是否已保存！！但不获取数据长度
    checkDSCode(num);
    checkDSName(num);
    checkDescription(num);
    checkDSOrderId(num);
    checkDSSupperCode(num);
}

//每次保存时都需要验证数据的准确性
function checkDSCode(num) {
    var dCode = $("#dCode").val();
    if (null == dCode || "" == dCode) {
        dCodeFlag = false;
    } else if(/^[0-9A-Za-z_:\-]+$/.test(dCode) == false){
        dCodeFlag = false;
    } else {
        if (num == 0){
            validaLength(dCode);
            if (valueLength > 12) {
                dCodeFlag = false;
            } else {
                dCodeFlag = true;
            }
        }else{
            dCodeFlag = true;
        }


    }
}

function checkDSName(num) {
    var dName = $("#dName").val();
    if (null == dName || "" == dName) {
        dNameFlag = false;
    } else {
        if(num == 0){
            validaLength(dName);
            if (valueLength > 100) {
                dNameFlag = false;
            } else {
                dNameFlag = true;
            }
        }else{
            dNameFlag = true;
        }

    }
}

function checkDescription(num) {
    var dDescription = $("#dDescription").val();
    if(num == 0){
        validaLength(dDescription);
        if (valueLength > 200) {
            dDescriptionFlag = false;
        } else {
            dDescriptionFlag = true;
        }
    }else{
        dDescriptionFlag = true;
    }

}

function checkDSOrderId(num) {
    var dOrderId = $("#dOrderId").val();
    var regex = /^[0-9]*$/;
    if (null == dOrderId || "" == dOrderId) {
        dOrderIdFlag = false;
    } else if (regex.test(dOrderId) == false) {
        dOrderIdFlag = false;
    } else {
        if(num == 0){
            validaLength(dOrderId);
            if (valueLength > 5) {
                dOrderIdFlag = false;
            } else {
                dOrderIdFlag = true;
            }
        }else{
            dOrderIdFlag = true;
        }

    }
}

function checkDSSupperCode(num) {
    var dSupperCode = $("#dSupperCode").val();
    var regex = /^[0-9A-Za-z_\-]+$/;
    if (null == dSupperCode || "" == dSupperCode) {
        dSupperCodeFlag = false;
    }else if (!regex.test(dSupperCode)) {
        dSupperCodeFlag = false;
    }  else {
        if(num == 0){
            validaLength(dSupperCode);
            if (valueLength > 12) {
                dSupperCodeFlag = false;
            }  else {
                dSupperCodeFlag = true;
            }
        }

    }
}

var myRows = [];
function optJsonArry() {
    var oTable = document.getElementsByTagName('table')[0];
    //行数:oTable.rows.length,列数：oTable.rows[0].cells.length
    for (var i = 1; i < oTable.rows.length; i++) {
        var row = {}
        for (var j = 0; j < oTable.rows[i].cells.length; j++) {
            if (j == 0) {
                row.code = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 1) {
                row.name = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 2) {
                row.description = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 3) {
                var dStatus = oTable.rows[i].cells[j].innerHTML;
                row.status = dStatus;
            } else if (j == 4) {
                row.orderId = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 5) {
                row.supperCode = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 6) {
                var iId = i - 1;
                if (i == oTable.rows.length) {
                    iId = iId - 1;
                }
                getColumnsId(iId, j);
                row.otpEditId = ids;
                ids = 0;
            }
        }
        myRows[i - 1] = row;
    }
}

var statusFlag = false;
function checkStatus() {
    var status = document.getElementById("status").value;
    if ("" != status) {
        statusFlag = true;
    }
}

/*var categoryExitFlag = false;
 function checkCategoryExit(num){
 var category;
 if(num == 0){
 category = $("#category").val().trim();  //新增时获取的当前的值
 }else if(num == 1){
 category = $("#uCategory").val().trim(); //修改时获取
 }
 if("" != category && null != category){
 $.post("/system-data/item/valid-item-category",{category: category,num:Math.random()},
 function(data){
 if(data.result == true){
 categoryExitFlag = true;
 BootboxExt.alert("类型已存在！", function (res) {
 return;
 });

 }else if(data.result == false){
 categoryExitFlag = false;
 }
 });
 }else{
 BootboxExt.alert("请输入类型！");
 }

 }*/

/*
 function checkRCategoryExit(){
 var rCategory = $("#rCategory").val().trim();
 var category = $("#uCategory").val().trim();
 if("" != category && null != category){
 if(rCategory != category){ //比较是否是原来未修改的值
 checkCategoryExit(1);
 }else{
 categoryExitFlag = false;
 }
 }else{
 BootboxExt.alert("请输入类型！");
 }
 }*/


$(function () {
    $("#btnSave").click(function () {
        checkStatus();
        if (statusFlag == true) {
            statusFlag = false;
            if (itemForm.valid()) {
                $("#btnSave").attr("disabled",true);
                Shade.blockUI($("#itemBody"));
                var category = $("#category").val().trim();  //新增时获取的当前的值
                if ("" != category && null != category) {
                    $.post("/system-data/item/valid-item-category", {category: category, num: Math.random()},
                        function (data) {
                            $("#btnSave").attr("disabled",false);
                            Shade.unblockUI($("#itemBody"));
                            if (data.result == true) {
                                BootboxExt.alert("类型已存在");
                            } else if (data.result == false) {
                                addItemAndItemDetail();
                            }
                        });
                } else {
                    BootboxExt.alert("请输入类型");
                }
            }
        } else {
            BootboxExt.alert("请选择状态");
        }
    });

    $("#btnUpdate").click(function () {
        checkStatus();
        if (statusFlag == true) {
            statusFlag = false;
            if (itemForm.valid()) {
                $("#btnUpdate").attr("disabled",true);
                Shade.blockUI($("#itemBody"));
                var rCategory = $("#rCategory").val().trim();
                var category = $("#uCategory").val().trim();
                if ("" != category && null != category) {
                    if (rCategory != category) { //比较是否是原来未修改的值
                        $.post("/system-data/item/valid-item-category", {category: category, num: Math.random()},
                            function (data) {
                                $("#btnUpdate").attr("disabled",true);
                                Shade.unblockUI($("#itemBody"));
                                if (data.result == true) {
                                    BootboxExt.alert("类型已存在");
                                } else if (data.result == false) {
                                    updateItemAndItemDetail();
                                }
                            });
                    } else {
                        updateItemAndItemDetail();
                    }
                } else {
                    BootboxExt.alert("请输入类型");
                }
            }
        } else {
            BootboxExt.alert("请选择状态");
        }
    });
});

function addItemAndItemDetail() {
    validItemDetail1(1);
    $("#btnSave").attr("disabled",true);
    Shade.blockUI($("#itemBody"));
    if (saveOrNoChange == 1) {
        $("#btnSave").attr("disabled",false);
        Shade.unblockUI($("#itemBody"));
        if (false == dCodeFlag || false == dNameFlag || false == dSupperCodeFlag || false == dOrderIdFlag) {
            if (saveOrCancelFlag == false) {
                BootboxExt.alert("请先保存完整的表格数据");
                return;
            }
        }

        if (true == dCodeFlag && true == dNameFlag && true == dSupperCodeFlag && true == dOrderIdFlag) {
            if (saveOrCancelFlag == false) {
                BootboxExt.alert("请先保存表格的数据");
                return;
            }
        }
    }
    optJsonArry();
    var aForm = $("#itemForm").serialize();
    var fdata = aForm + "&itemDetailStr=" + JSON.stringify(myRows);
    $.post("/system-data/item/add-item",
        fdata,
        function(data){
            $("#btnSave").attr("disabled",false);
            Shade.unblockUI($("#itemBody"));
            if(data.result == true){
                BootboxExt.alert("新增成功",function(res){
                    location.href="/system-data/item/search";
                });
            }else{
                BootboxExt.alert("新增失败");
                window.location.reload();
            }
        });
}

function updateItemAndItemDetail() {
    validItemDetail1(1);
    $("#btnUpdate").attr("disabled",true);
    Shade.blockUI($("#itemBody"));
    if (saveOrNoChange == 1) {
        $("#btnUpdate").attr("disabled",false);
        Shade.unblockUI($("#itemBody"));
        if (false == dCodeFlag || false == dNameFlag || false == dSupperCodeFlag || false == dOrderIdFlag) {
            if (saveOrCancelFlag == false) {
                BootboxExt.alert("请先保存完整的表格数据");
                return;
            }
        }

        if (true == dCodeFlag && true == dNameFlag && true == dSupperCodeFlag && true == dOrderIdFlag) {
            if (saveOrCancelFlag == false) {
                BootboxExt.alert("请先保存表格的数据");
                return;
            }
        }
    }

    optJsonArry();
    var aForm = $("#itemForm").serialize();
    var fdata = aForm + "&itemDetailStr=" + JSON.stringify(myRows);
    $.post("/system-data/item/update-item",
        fdata,
        function(data){
            $("#btnUpdate").attr("disabled",false);
            Shade.unblockUI($("#itemBody"));
            if(data.result == true){
                BootboxExt.alert("修改成功",function(res){
                    location.href="/system-data/item/search";
                });
            }else{
                BootboxExt.alert("修改失败");
                window.location.reload();
            }
        });
}

