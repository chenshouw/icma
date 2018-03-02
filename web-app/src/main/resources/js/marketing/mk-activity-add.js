var selectionIds = [];  //保存选中ids
var selectionNames = [];  //保存选中ids

var selectionChannelIds = [];  //保存选中渠道ids
var selectionChannelNames = [];  //保存选中渠道names
var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        title: {
            required: true,
            stringMaxLength: 100
        },
        startTime: {
            required: true
        },
        endTime: {
            required: true
        },
        generalizeUrl: {
            required: true,
            stringMaxLength: 100
        },
        remark: {
            stringMaxLength: 1000
        }
    },
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    success: function (label) {
        label.closest('.form-group').removeClass('has-error');
    }
});

function editRowRestrict(oTable, nRow) {
    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    jqTds[0].innerHTML = '<input type="text" id="periodLimit" class="form-control input-small" value="' + aData[0] + '">';
    jqTds[1].innerHTML = '<select class="form-control select-small" id="period" class="form-control input-small" data-first="false" data-name="' + aData[1] + '" data-type="select" data-category="RESTRICT_PERIOD" style="width: 110px;"></select>';
    jqTds[2].innerHTML = '<input type="text" id="restrictTimes" class="form-control input-small" value="' + aData[2] + '">';
    jqTds[3].innerHTML = '<a class="edit" href="">保存</a>';
    jqTds[4].innerHTML = '<a class="cancel" href="">取消</a>';
    SelectItem.initTk(jqTds);
}

/**
 * 根据value获取内容
 * @param value
 * @returns {string}
 */
function getRestrictContent(value) {
    var con = "";
    if (value == 1) {
        con = "分钟";
    } else if (value == 2) {
        con = "小时";
    } else if (value == 3) {
        con = "天";
    } else if (value == 4) {
        con = "月";
    } else {
        con = "年";
    }
    return con;
}

function getRestrictValue(content) {
    var con = "";
    if (content == '分钟') {
        con = "1";
    } else if (content == '小时') {
        con = "2";
    } else if (content == '天') {
        con = "3";
    } else if (content == '月') {
        con = "4";
    } else if (content == '年') {
        con = "5";
    }
    return con;
}

function getTypeValue(content) {
    var con = "";
    if (content == '定期返还') {
        con = "0";
    }
    return con;
}

//编辑完成后保存
function saveRowRestrict(oTable, nRow) {
    var jqInputs = $('input', nRow);
    var jqSelects = $('select', nRow);
    oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
    oTable.fnUpdate(getRestrictContent(jqSelects[0].value), nRow, 1, false);
    oTable.fnUpdate(jqInputs[1].value, nRow, 2, false);
    oTable.fnUpdate('<a class="edit" href="">编辑</a>', nRow, 3, false);
    oTable.fnUpdate('<a class="delete" href="">删除</a>', nRow, 4, false);
    oTable.fnDraw();
    overContext();
}

/**
 * 根据value获取内容
 * @param value
 * @returns {string}
 */
function getIsMedContent(value) {
    var con = "";
    if (value == 0) {
        con = "否";
    } else if (value == 1) {
        con = "是";
    }
    return con;
}

function getIsMedValue(content) {
    var con = "";
    if (content == '否') {
        con = "0";
    } else if (content == '是') {
        con = "1";
    }
    return con;
}

function editRowInstalment(oTable, nRow) {
    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    jqTds[0].innerHTML = '<input type="text" id="periods" class="form-control input-small" value="' + aData[0] + '">';
    jqTds[1].innerHTML = '<input type="text" id="regularFixDate" class="form-control input-small" value="' + aData[1] + '">';
    jqTds[2].innerHTML = '<select class="form-control select-small" id="itype" class="form-control input-small" data-type="select" data-first="false" data-name="' + aData[2] + '"  data-category="INSTALMENT_TYPE" style="width: 110px;"></select>';
    jqTds[3].innerHTML = '<select class="form-control select-small" id="regularFixMonth" class="form-control input-small" data-type="select" data-first="false" data-name="' + aData[3] + '"  data-category="REGULAR_FIX_MONTH" style="width: 110px;"></select>';
    jqTds[4].innerHTML = '<select class="form-control select-small" id="isImmediateArrival" class="form-control input-small" data-type="select" data-first="false" data-name="' + aData[4] + '"  data-category="IS_IMMEDIATE_ARRIVAL" style="width: 110px;"></select>';
    jqTds[5].innerHTML = '<textarea rows = "2" id="simpleComment" class="form-control input-small">' + aData[5] + '</textarea>';
    jqTds[6].innerHTML = '<textarea rows = "2" id="detailComment" class="form-control input-small">' + aData[6] + '</textarea>';
    jqTds[7].innerHTML = '<a class="edit" href="">保存</a>';
    jqTds[8].innerHTML = '<a class="cancel" href="">取消</a>';
    SelectItem.initTk(jqTds);
}

//编辑完成后保存
function saveRowInstalment(instalmentTable, nRow) {
    var jqInputs = $('input', nRow);
    var jqSelects = $('select', nRow);
    var jqTextArea = $('textarea', nRow);
    instalmentTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
    instalmentTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
    instalmentTable.fnUpdate(jqSelects[0].textContent, nRow, 2, false);
    instalmentTable.fnUpdate(jqSelects[1].value, nRow, 3, false);
    instalmentTable.fnUpdate(getIsMedContent(jqSelects[2].value), nRow, 4, false);
    instalmentTable.fnUpdate(jqTextArea[0].value, nRow, 5, false);
    instalmentTable.fnUpdate(jqTextArea[1].value, nRow, 6, false);
    instalmentTable.fnUpdate('<a class="edit" href="">编辑</a>', nRow, 7, false);
    instalmentTable.fnUpdate('<a class="delete" href="">删除', nRow, 8, false);
    instalmentTable.fnDraw();
    overContext();
}

function editRowDiscount(discountTable, nRow, flag) {
    var aData = discountTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    jqTds[0].innerHTML = '<input type="text" id="discount" class="form-control input-small" value="' + aData[0] + '">';
    jqTds[1].innerHTML = '<select class="form-control select-small" id="discountType" class="form-control input-small" data-first="false" data-name="' + aData[1] + '"  data-type="select" data-category="DISCOUNT_STATUS" style="width: 110px;"></select>';
    jqTds[2].innerHTML = '<input type="text" id="minPaymentAmt" class="form-control input-small" value="' + aData[2] + '">';
    jqTds[3].innerHTML = '<input type="text" id="maxPaymentAmt" class="form-control input-small" value="' + aData[3] + '">';
    jqTds[4].innerHTML = '<input type="text" id="priority" class="form-control input-small" value="' + aData[4] + '">';
    jqTds[5].innerHTML = '<textarea rows = "2" id="disSimpleComment" class="form-control input-small">' + aData[5] + '</textarea>';
    jqTds[6].innerHTML = '<textarea rows = "2" id="disDetailComment" class="form-control input-small">' + aData[6] + '</textarea>';
    jqTds[7].innerHTML = '<a id="saveDiscount" class="edit" href="">保存</a>';
    jqTds[8].innerHTML = '<a class="cancel" href="">取消</a>';
    SelectItem.initTk(jqTds);
}

/**
 * 根据value获取内容
 * @param value
 * @returns {string}
 */
function getDiscountContent(value) {
    var con = "";
    if (value == 0) {
        con = "阶梯折扣";
    } else if (value == 1) {
        con = "固定折扣";
    }
    return con;
}

function getDiscountValue(content) {
    var value = "";
    if (content == '阶梯折扣') {
        value = "0";
    } else if (content == '固定折扣') {
        value = "1";
    }
    return value;
}

//编辑完成后保存
function saveRowDiscount(discountTable, nRow) {
    var jqInputs = $('input', nRow);
    var jqSelects = $('select', nRow);
    var jqTextArea = $('textarea', nRow);
    discountTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
    discountTable.fnUpdate(getDiscountContent(jqSelects[0].value), nRow, 1, false);
    discountTable.fnUpdate(jqInputs[1].value, nRow, 2, false);
    discountTable.fnUpdate(jqInputs[2].value, nRow, 3, false);
    discountTable.fnUpdate(jqInputs[3].value, nRow, 4, false);
    discountTable.fnUpdate(jqTextArea[0].value, nRow, 5, false);
    discountTable.fnUpdate(jqTextArea[1].value, nRow, 6, false);
    discountTable.fnUpdate('<a class="edit" href="">编辑</a>', nRow, 7, false);
    discountTable.fnUpdate('<a class="delete" href="">删除</a>', nRow, 8, false);
    discountTable.fnDraw();
    overContext();
}

/**
 * 鼠标悬浮在表格上时显示文本
 */
function overContext() {
    var tds = $("td");
    for (var i = 0; i < tds.length; i++) {
        tds[i].onmouseover = function () {
            this.title = this.innerText;
        }
    }
}

function restoreRow(oTable, nRow) {
    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
        oTable.fnUpdate(aData[i], nRow, i, false);
    }
    oTable.fnDraw();
}

var periodsResult = true;
var regularFixDateResult = true;
var itypeResult = true;
var isImmediateArrivalResult = true;
var regularFixMonthResult = true;
var simpleCommentResult = true;
var detailCommentResult = true;
function validDataInstalment() {
    var periods = $("#periods").val();
    var regularFixDate = $("#regularFixDate").val();
    var itype = $("#itype").val();
    var isImmediateArrival = $("#isImmediateArrival").val();
    var regularFixMonth = $("#regularFixMonth").val();
    var simpleComment = $("#simpleComment").val();
    var detailComment = $("#detailComment").val();
    var periodsRegex = /^(?:[1-9][0-9]?)$/;
    if (periods == null || periods == '') {
        BootboxExt.alert("请输入分期数");
        periodsResult = false;
        return;
    } else {
        if (periodsRegex.test(periods) == false) {
            BootboxExt.alert("分期数请输入1-99的正整数");
            periodsResult = false;
            return;
        } else {
            periodsResult = true;
        }
    }
    var fixRegex = /^(([0-9])|((1|2)[0-9])|30|31)$/;
    if (regularFixDate == null || regularFixDate == '') {
        BootboxExt.alert("请输入定期还款日");
        regularFixDateResult = false;
        return;
    } else {
        if (fixRegex.test(regularFixDate) == false) {
            BootboxExt.alert("定期还款日请输入0-31的整数");
            regularFixDateResult = false;
            return;
        } else {
            regularFixDateResult = true;
        }
    }
    if (itype == null || itype == '') {
        BootboxExt.alert("请选择类型");
        itypeResult = false;
        return;
    } else {
        itypeResult = true;
    }
    if (isImmediateArrival == null || isImmediateArrival == '') {
        BootboxExt.alert("请选择首期是否立即到账");
        isImmediateArrivalResult = false;
        return;
    } else {
        isImmediateArrivalResult = true;
    }
    if (regularFixMonth == null || regularFixMonth == '') {
        BootboxExt.alert("请选择还款间隔月");
        regularFixMonthResult = false;
        return;
    } else {
        regularFixMonthResult = true;
    }
    var simpleCommentLength = simpleComment.length;
    for (var i = 0; i < simpleComment.length; i++) {
        if (simpleComment.charCodeAt(i) > 127) {
            simpleCommentLength++;
        }
    }
    if (simpleCommentLength > 200) {
        BootboxExt.alert("长度不能大于200个字节(一个中文字算2个字节)");
        simpleCommentResult = false;
        return;
    } else {
        simpleCommentResult = true;
    }
    var detailCommentLength = detailComment.length;
    for (var i = 0; i < detailComment.length; i++) {
        if (detailComment.charCodeAt(i) > 127) {
            detailCommentLength++;
        }
    }
    if (detailCommentLength > 200) {
        BootboxExt.alert("长度不能大于200个字节(一个中文字算2个字节)");
        detailCommentResult = false;
        return;
    } else {
        detailCommentResult = true;
    }
}

var checkResult = true;
var periodResult = true;
var restrictTimesResult = true;
var periodLimitResult = true;
function validDataRestrict(obj) {
    var restrictTimes = $("#restrictTimes").val();
    var period = $("#period").val();
    var periodLimit = $("#periodLimit").val();
    var regex = /^[0-9]*$/;
    var rows = $("#restrict_editable tr").length;
    var currRow = obj.parentNode.parentNode.rowIndex;

    if (rows > 2) {
        var period1;
        var period2;
        var oTable = $("#restrict_editable")[0];
        for (var i = 1; i < rows; i++) {
            if (i == currRow) {
                var selected = $("#restrict_editable").find("tr").eq(i).find("td").eq(1).find("select").val();
                period1 = getRestrictContent(selected);
            }
        }
        for (var i = 1; i < rows; i++) {
            if (i != currRow) {
                period2 = oTable.rows[i].cells[1].innerHTML;
                if (period2 == period1) {
                    BootboxExt.alert("已存在周期单位为" + period2 + "的配置,请重新选择");
                    checkResult = false;
                    return;
                } else {
                    checkResult = true;
                }
            }
        }
    }

    if (restrictTimes == null || restrictTimes == '') {
        BootboxExt.alert("请输入个人参与活动次数");
        restrictTimesResult = false;
        return;
    } else {
        if (regex.test(restrictTimes) == false) {
            BootboxExt.alert("个人参与活动次数只能输入数字");
            restrictTimesResult = false;
            return;
        } else {
            if (restrictTimes.length > 8) {
                BootboxExt.alert("个人参与活动次数长度不能大于8位");
                restrictTimesResult = false;
                return;
            } else {
                restrictTimesResult = true;
            }
        }
    }
    if (period == null || period == '') {
        BootboxExt.alert("请选择周期");
        periodResult = false;
        return;
    } else {
        periodResult = true;
    }
    if (periodLimit == null || periodLimit == '') {
        BootboxExt.alert("请输入周期限定");
        periodLimitResult = false;
        return;
    } else {
        if (regex.test(periodLimit) == false) {
            BootboxExt.alert("周期限定只能输入数字");
            periodLimitResult = false;
            return;
        } else {
            if (periodLimit.length > 4) {
                BootboxExt.alert("周期限定长度不能大于4位");
                periodLimitResult = false;
                return;
            } else {
                periodLimitResult = true;
            }
        }
    }
}

var typeResult = true;
var stResult = true;
var etResult = true;
var compareResult = true;
var moneyResult = true;
var checkResult = true;
var minPaymentAmtResult = true;
var maxPaymentAmtResult = true;
var discountTypeResult = true;
var discountResult = true;
var priorityResult = true;
var disSimpleCommentResult = true;
var disDetailCommentResult = true;
function validDataDiscount(obj) {
    var minPaymentAmt = $("#minPaymentAmt").val();
    var maxPaymentAmt = $("#maxPaymentAmt").val();
    var discountType = $("#discountType").val();
    var discount = $("#discount").val();
    var priority = $("#priority").val();
    var disSimpleComment = $("#disSimpleComment").val();
    var disDetailComment = $("#disDetailComment").val();
    var regex = /^(?:[1-9][0-9]?|100)$/;
    var priReg = /^([1-9]\d|\d)$/;
    var amtReg = /^\d{1,8}(\.\d{1,2})?$/;
    var type = $("#type").val();
    var startTimeStr = $("#startTimeStr").val();
    var endTimeStr = $("#endTimeStr").val();
    var id = $("#id").val();

    var currRow = obj.parentNode.parentNode.rowIndex;

    checkResult = true;
    moneyResult = true;
    compareResult = true;
    var rows = $("#discount_editable tr").length;

    if (type == null || type == '') {
        BootboxExt.alert("请先选择活动类型");
        typeResult = false;
        return;
    } else {
        typeResult = true;
    }

    if (startTimeStr == null || startTimeStr == '') {
        BootboxExt.alert("请先选择活动开始时间");
        stResult = false;
        return;
    } else {
        stResult = true;
    }

    if (endTimeStr == null || endTimeStr == '') {
        BootboxExt.alert("请先选择活动结束时间");
        etResult = false;
        return;
    } else {
        etResult = true;
    }

    if (parseInt(maxPaymentAmt) < parseInt(minPaymentAmt)) {
        BootboxExt.alert("最大支付金额不能小于最小支付金额");
        moneyResult = false;
        return;
    } else {
        moneyResult = true;
    }

    if (operator == 'add' && rows > 2) {
        var min1;
        var max1;
        var min2;
        var max2;
        var oTable = $("#discount_editable")[0];
        for (var i = 1; i < rows; i++) {
            if (i == currRow) {
                min1 = $("#discount_editable").find("tr").eq(i).find("td").eq(2).find("input").val();
                max1 = $("#discount_editable").find("tr").eq(i).find("td").eq(3).find("input").val();
            }
        }
        for (var i = 1; i < rows; i++) {
            if (i != currRow) {
                min2 = oTable.rows[i].cells[2].innerHTML;
                max2 = oTable.rows[i].cells[3].innerHTML;
                if ((min1 >= min2 && min1 <= max2) ||
                    (max1 >= min2 && max1 <= max2) ||
                    (min2 >= min1 && min2 <= max1) ||
                    (max2 >= min1 && max2 <= max1)) {
                    BootboxExt.alert("当前活动中已存在" + min2 + "元到" + max2 + "元的金额折扣范围,请修改金额范围,以免活动金额重叠");
                    compareResult = false;
                    return;
                } else {
                    compareResult = true;
                }
            }
        }
    }

    if (discount == null || discount == '') {
        BootboxExt.alert("请输入折扣比例");
        discountResult = false;
        return;
    } else {
        if (regex.test(discount) == false) {
            BootboxExt.alert("折扣比例请输入1-100整数");
            discountResult = false;
            return;
        } else {
            discountResult = true;
        }
    }
    if (minPaymentAmt == null || minPaymentAmt == '') {
        BootboxExt.alert("请输入最小支付金额");
        minPaymentAmtResult = false;
        return;
    } else {
        if (amtReg.test(minPaymentAmt) == false) {
            BootboxExt.alert("最小支付金额请输入0-99999999.99的正数，精确到分");
            minPaymentAmtResult = false;
            return;
        } else {
            minPaymentAmtResult = true;
        }
    }

    if (maxPaymentAmt == null || maxPaymentAmt == '') {
        BootboxExt.alert("请输入最大支付金额");
        maxPaymentAmtResult = false;
        return;
    } else {
        if (amtReg.test(maxPaymentAmt) == false) {
            BootboxExt.alert("最大支付金额请输入0-99999999.99的正数，精确到分");
            maxPaymentAmtResult = false;
            return;
        } else {
            maxPaymentAmtResult = true;
        }
    }

    if (discountType == null || discountType == '') {
        BootboxExt.alert("请选择折扣类型");
        discountTypeResult = false;
        return;
    } else {
        discountTypeResult = true;
    }
    if (priority == null || priority == '') {
        BootboxExt.alert("请输入权重");
        priorityResult = false;
        return;
    } else {
        if (priReg.test(priority) == false) {
            BootboxExt.alert("输入权重只能是小于100的整数");
            priorityResult = false;
            return;
        } else {
            priorityResult = true;
        }
    }
    var disSimpleCommentLength = disSimpleComment.length;
    for (var i = 0; i < disSimpleComment.length; i++) {
        if (disSimpleComment.charCodeAt(i) > 127) {
            disSimpleCommentLength++;
        }
    }
    if (disSimpleCommentLength > 200) {
        BootboxExt.alert("简要说明长度不能大于200个字节(一个中文字算2个字节)");
        disSimpleCommentResult = false;
        return;
    } else {
        disSimpleCommentResult = true;
    }
    var disDetailCommentLength = disDetailComment.length;
    for (var i = 0; i < disDetailComment.length; i++) {
        if (disDetailComment.charCodeAt(i) > 127) {
            disDetailCommentLength++;
        }
    }
    if (disDetailCommentLength > 200) {
        BootboxExt.alert("详细说明长度不能大于200个字节(一个中文字算2个字节)");
        disDetailCommentResult = false;
        return;
    } else {
        disDetailCommentResult = true;
    }

    if (operator == 'add' || rows > 2) {
        $.ajax({
            async: false,
            type: "post",
            url: "/marketing/activity/checkDiscount",
            data: {
                minPaymentAmt: minPaymentAmt,
                maxPaymentAmt: maxPaymentAmt,
                startTimeStr: startTimeStr,
                endTimeStr: endTimeStr,
                type: type,
                id: id,
                rows: rows
            },
            dataType: "json",
            success: function (data) {
                if (data.result) {
                    checkResult = false;
                    BootboxExt.alert(data.st + "到" + data.et + "<span style='color: red;'>" + data.status + "</span>的《" + data.title + "》活动中已存在" + data.min + "元到" + data.max + "元的金额折扣范围,请修改金额范围,以免活动金额重叠");
                    return;
                } else {
                    checkResult = true;
                }
            }
        });
    }
}

$(function () {
    /*$('#faceValue_multi_select').multiSelect({
        selectableHeader: "<br><p>可选面值</p><input type='text' class='form-control search-input' autocomplete='off' placeholder='search...'>",
        selectionHeader: "<br><p>已选面值</p><input type='text' class='form-control search-input' autocomplete='off' placeholder='search...'>",
        afterInit: function (ms) {
            var that = this,
                $selectableSearch = that.$selectableUl.prev(),
                $selectionSearch = that.$selectionUl.prev(),
                selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

            that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                .on('keydown', function (e) {
                    if (e.which === 40) {
                        that.$selectableUl.focus();
                        return false;
                    }
                });

            that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                .on('keydown', function (e) {
                    if (e.which == 40) {
                        that.$selectionUl.focus();
                        return false;
                    }
                });
        },
        afterSelect: function () {
            this.qs1.cache();
            this.qs2.cache();
        },
        afterDeselect: function () {
            this.qs1.cache();
            this.qs2.cache();
        }
    });*/

    var oTable = $('#restrict_editable').dataTable({
        "scrollX": true,
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

    var instalmentTable = $('#instalment_editable').dataTable({
        "scrollX": true,
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

    var discountTable = $('#discount_editable').dataTable({
        "scrollX": true,
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

    var nEditing = null;
    var tIndex = 0; //0：最多只能新增一条
    var isEdit = 0; //0未修改1在修改
    $('#restrict_editable_new').click(function (e) {
        e.preventDefault();
        if (!instalmentE) {
            BootboxExt.alert("请先保存分期规则");
            return;
        }
        if (!discountE) {
            BootboxExt.alert("请先保存折扣规则");
            return;
        }
        //新增时可以查看一下tIndex
        if (tIndex == 0) {
            var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRowRestrict(oTable, nRow);
            nEditing = nRow;
            tIndex = 1;  //第一次新增数据验证通过之后取消需要用
            selectExitId = 0;
            restrictE = false;
        } else {
            BootboxExt.alert("请完成当前的添加操作");
        }
    });

    var iIndex = 0;//0：最多只能新增一条
    var instalmentEdit = 0;
    $('#instalment_editable_new').click(function (e) {
        e.preventDefault();
        var instalmentLength = $("#instalment_editable")[0].rows[1].innerText;
        if ('没有数据' != instalmentLength) {
            iIndex = 1;
        }
        if (!restrictE) {
            BootboxExt.alert("请先保存活动配置");
            return;
        }
        if (!discountE) {
            BootboxExt.alert("请先保存折扣规则");
            return;
        }
        //新增时可以查看一下tIndex
        if (iIndex == 0) {
            var aiNew = instalmentTable.fnAddData(['', '', '', '', '', '', '', '', '', '']);
            var nRow = instalmentTable.fnGetNodes(aiNew[0]);
            editRowInstalment(instalmentTable, nRow);
            nEditing = nRow;
            iIndex = 1;  //第一次新增数据验证通过之后取消需要用
            instalmentE = false;
        } else {
            BootboxExt.alert("只能新增一条分期规则");
        }
    });

    var dIndex = 0;//0：初始化为0第一次能新增一行，表示能新增，2：正在执行新增操作，此动作必须完成后才能完成第n次新增,1：表示无操作，3：表示点击编辑之后点击取消，然后再新增的操作！
    var discountEdit = 0;
    $('#discount_editable_new').click(function (e) {
        e.preventDefault();
        if (!restrictE) {
            BootboxExt.alert("请先保存活动配置");
            return;
        }
        if (!instalmentE) {
            BootboxExt.alert("请先保存分期规则");
            return;
        }
        //新增时可以查看一下dIndex
        if (dIndex == 0) {
            var aiNew = discountTable.fnAddData(['', '', '', '', '', '', '', '', '', '']);
            var nRow = discountTable.fnGetNodes(aiNew[0]);
            editRowDiscount(discountTable, nRow, 0);
            nEditing = nRow;
            dIndex = 1;  //第一次新增数据验证通过之后取消需要用
            discountE = false;
        } else {
            BootboxExt.alert("请完成当前的添加操作");
        }
    });

    $('#restrict_editable a.delete').live('click', function (e) {
        e.preventDefault();
        restrictE = true;
        var nRow = $(this).parents('tr')[0];
        BootboxExt.confirm("该操作不可逆，确认删除此行数据?", function (res) {
            if (res) {
                oTable.fnDeleteRow(nRow);
                tIndex = 0;
            }
        })
    });

    $('#restrict_editable a.cancel').live('click', function (e) {
        e.preventDefault();
        var nRow = $(this).parents('tr')[0];
        restrictE = true;
        if (isEdit == 0) {
            oTable.fnDeleteRow(nRow);
            tIndex = 0;
        } else {
            var trComHtml = nRow.innerHTML.replace("restrictTimes", "restrictTimes1").replace("period", "period1")
                .replace("periodLimit", "periodLimit1");
            $("#hiddenDiv").empty();
            $("#hiddenDiv").append(trComHtml.toString());
            var restrictTimes1 = $("#restrictTimes1").val();
            var periodLimit1 = $("#periodLimit1").val();
            var period1 = $("#period1").attr("data-name");
            $("#restrictTimes").val(restrictTimes1);
            $("#periodLimit").val(periodLimit1);
            $("#period").val(getRestrictValue(period1.trim()));
            saveRowRestrict(oTable, $(this).parents('tr')[0]);
        }
    });

    $('#restrict_editable a.edit').live('click', function (e) {
        e.preventDefault();
        if (!instalmentE) {
            BootboxExt.alert("请先保存分期规则");
            return;
        }
        if (!discountE) {
            BootboxExt.alert("请先保存折扣规则");
            return;
        }
        var nRow = $(this).parents('tr')[0];
        if (nEditing !== null && nEditing != nRow) {
            isEdit = 1;
            restoreRow(oTable, nEditing);
            editRowRestrict(oTable, nRow);
            nEditing = nRow;
            restrictE = false;
        } else if (nEditing == nRow && this.innerHTML == "保存") {
            validDataRestrict(this);
            if (checkResult && restrictTimesResult && periodResult && periodLimitResult) {
                tIndex = 0;
                saveRowRestrict(oTable, nEditing);
                nEditing = null;
                isEdit = 0;
                restrictE = true;
            }
        } else {
            isEdit = 1;
            editRowRestrict(oTable, nRow);
            nEditing = nRow;
            restrictE = false;
        }
    });

    $('#instalment_editable a.delete').live('click', function (e) {
        e.preventDefault();
        instalmentE = true;
        var nRow = $(this).parents('tr')[0];
        BootboxExt.confirm("该操作不可逆，确认删除此行数据?", function (res) {
            if (res) {
                instalmentTable.fnDeleteRow(nRow);
                iIndex = 0;
            }
        })
    });

    $('#instalment_editable a.cancel').live('click', function (e) {
        e.preventDefault();
        instalmentE = true;
        var nRow = $(this).parents('tr')[0];
        if (instalmentEdit == 0) {
            instalmentTable.fnDeleteRow(nRow);
            iIndex = 0;
            nEditing = null;
        } else {
            var trHtml = nRow.innerHTML.replace("periods", "periods1").replace("regularFixDate", "regularFixDate1").replace("type", "type1").replace("regularFixMonth", "regularFixMonth1").replace("isImmediateArrival", "isImmediateArrival1")
                .replace("simpleComment", "simpleComment1").replace("detailComment", "detailComment1");
            $("#instalmentDiv").empty();
            $("#instalmentDiv").append(trHtml.toString());
            var periods1 = $("#periods1").val();
            var regularFixDate1 = $("#regularFixDate1").val();
            var type1 = $("#type1").val();
            var regularFixMonth1 = $("#regularFixMonth1").attr("data-name");
            var isImmediateArrival1 = $("#isImmediateArrival1").attr("data-name");
            var simpleComment1 = $("#simpleComment1").val();
            var detailComment1 = $("#detailComment1").val();
            $("#type").val(type1);
            $("#regularFixDate").val(regularFixDate1);
            $("#periods").val(periods1);
            $("#regularFixMonth").val(regularFixMonth1);
            $("#isImmediateArriva").val(getIsMedValue(isImmediateArrival1.trim()));
            $("#simpleComment").val(simpleComment1);
            $("#detailComment").val(detailComment1);
            saveRowInstalment(instalmentTable, $(this).parents('tr')[0]);
            instalmentEdit = 0;
        }

    });

    $('#instalment_editable a.edit').live('click', function (e) {
        e.preventDefault();
        if (!restrictE) {
            BootboxExt.alert("请先保存活动配置");
            return;
        }
        if (!discountE) {
            BootboxExt.alert("请先保存折扣规则");
            return;
        }
        var nRow = $(this).parents('tr')[0];
        if (nEditing !== null && nEditing != nRow) {
            instalmentEdit = 1;
            restoreRow(instalmentTable, nEditing);
            editRowInstalment(instalmentTable, nRow);
            nEditing = nRow;
            instalmentE = false;
        } else if (nEditing == nRow && this.innerHTML == "保存") {
            validDataInstalment();
            if (periodsResult && itypeResult && regularFixDateResult && regularFixMonthResult && isImmediateArrivalResult
                && simpleCommentResult && detailCommentResult) {
                saveRowInstalment(instalmentTable, nEditing);
                nEditing = null;
                instalmentE = true;
            }
        } else {
            instalmentEdit = 1;
            editRowInstalment(instalmentTable, nRow);
            nEditing = nRow;
            instalmentE = false;
        }
    });

    $('#discount_editable a.delete').live('click', function (e) {
        e.preventDefault();
        discountE = true;
        var nRow = $(this).parents('tr')[0];
        BootboxExt.confirm("该操作不可逆，确认删除此行数据?", function (res) {
            if (res) {
                discountTable.fnDeleteRow(nRow);
                dIndex = 0;
            }
        })
    });

    $('#discount_editable a.cancel').live('click', function (e) {
        e.preventDefault();
        discountE = true;
        var nRow = $(this).parents('tr')[0];
        if (discountEdit == 0) {
            discountTable.fnDeleteRow(nRow);
            dIndex = 0;
            nEditing = null;
        } else {
            var trHtml = nRow.innerHTML.replace("minPaymentAmt", "minPaymentAmt1").replace("maxPaymentAmt", "maxPaymentAmt1").replace("discountType", "discountType1")
                .replace("disSimpleComment", "disSimpleComment1").replace("disDetailComment", "disDetailComment1");
            $("#discountDiv").empty();
            $("#discountDiv").append(trHtml.toString());
            var minPaymentAmt1 = $("#minPaymentAmt1").val();
            var maxPaymentAmt1 = $("#maxPaymentAmt1").val();
            var discountType1 = $("#discountType1").attr("data-name");
            var disSimpleComment1 = $("#disSimpleComment1").val();
            var disDetailComment1 = $("#disDetailComment1").val();
            $("#minPaymentAmt").val(minPaymentAmt1);
            $("#maxPaymentAmt").val(maxPaymentAmt1);
            $("#discountType").val(getDiscountValue(discountType1.trim()));
            $("#disSimpleComment").val(disSimpleComment1);
            $("#disDetailComment").val(disDetailComment1);
            saveRowDiscount(discountTable, $(this).parents('tr')[0]);
            discountEdit = 0;
        }
    });

    $('#discount_editable a.edit').live('click', function (e) {
        e.preventDefault();
        if (!restrictE) {
            BootboxExt.alert("请先保存活动配置");
            return;
        }
        if (!instalmentE) {
            BootboxExt.alert("请先保存分期规则");
            return;
        }
        var nRow = $(this).parents('tr')[0];
        if (nEditing !== null && nEditing != nRow) {
            discountEdit = 1;
            restoreRow(discountTable, nEditing);
            editRowDiscount(discountTable, nRow, 1);
            nEditing = nRow;
            discountE = false;
        } else if (nEditing == nRow && this.innerHTML == "保存") {
            validDataDiscount(this);
            if (typeResult && stResult && etResult && compareResult && moneyResult && checkResult && minPaymentAmtResult && maxPaymentAmtResult && discountTypeResult && discountResult
                && priorityResult && disSimpleCommentResult && disDetailCommentResult) {
                saveRowDiscount(discountTable, nEditing);
                dIndex = 0;
                nEditing = null;
                discountEdit = 0;
                discountE = true;
            }
        } else {
            discountEdit = 1;
            editRowDiscount(discountTable, nRow, 1);
            nEditing = nRow;
            discountE = false;
        }
    });

    $("#btnSave").click(function () {
        /*var faceValueIds = "";
        var faceValues = "";
        //封装数据
        $(".ms-selection ul").each(function () {
            $(this).find("li").each(function (i) {
                if ($(this).css("display") != "none") {
                    faceValueIds += $(this).attr('id').split('-')[0] + ",";
                    faceValues += $(this)[0].innerText + ","
                }
            });
        });
        $("#faceValueIds").val(faceValueIds.substring(0, faceValueIds.length - 1));
        $("#faceValues").val(faceValues.substring(0, faceValues.length - 1));*/
        var restrictsItem = JSON.stringify(optRestrictsJsonArry());
        var instalmentItem = JSON.stringify(optInstalmentJsonArry());
        var discountItem = JSON.stringify(optDiscountJsonArry());
        var aForm = $("#addForm").serialize();
        var data = aForm + "&restrictsItem=" + restrictsItem + "&instalmentItem=" + instalmentItem + "&discountItem=" + discountItem;
        if (addForm.valid() && validOther()) { //验证通过
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/marketing/activity/add",
                data,
                function (data) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/marketing/activity/search";
                        });
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });

    $("#btnUpdate").click(function () {
        /*var faceValueIds = "";
        var faceValues = "";
        //封装数据
        $(".ms-selection ul").each(function () {
            $(this).find("li").each(function (i) {
                if ($(this).css("display") != "none") {
                    faceValueIds += $(this).attr('id').split('-')[0] + ",";
                    faceValues += $(this)[0].innerText + ","
                }
            });
        });
        $("#faceValueIds").val(faceValueIds.substring(0, faceValueIds.length - 1));
        $("#faceValues").val(faceValues.substring(0, faceValues.length - 1));*/
        var restrictsItem = JSON.stringify(optRestrictsJsonArry());
        var instalmentItem = JSON.stringify(optInstalmentJsonArry());
        var discountItem = JSON.stringify(optDiscountJsonArry());
        var uForm = $("#updateForm").serialize();
        var data = uForm + "&restrictsItem=" + restrictsItem + "&instalmentItem=" + instalmentItem + "&discountItem=" + discountItem;
        if (addForm.valid() && validOther()) { //验证通
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#updateBody"));
            $.post("/marketing/activity/update",
                data,
                function (data) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("#updateBody"));
                    if (data.result == true) {
                        BootboxExt.alert("修改成功", function (res) {
                            location.href = "/marketing/activity/search";
                        });
                    } else {
                        BootboxExt.alert("修改失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });

    $("#channelBtn").click(function () {
        if (selectionChannelIds.length <= 0) {
            BootboxExt.alert("请选择适用渠道")
            return;
        }
        $('#channelModal').modal('hide');
        var ids = "";
        var texts = "";
        for(var i = 0;i <selectionChannelIds.length ; i++){
            ids += selectionChannelIds[i] + ",";
            texts += selectionChannelNames[i] + ",";
        }

        $("#channelIds").val(ids.substring(0, ids.length - 1));
        $("#channelNames").val(texts.substring(0, texts.length - 1));
    });

    $("#productBtn").click(function () {
        if (selectionIds.length <= 0) {
            BootboxExt.alert("请选择产品信息")
            return;
        }
        $('#productModal').modal('hide');
        var ids = "";
        var texts = "";
       for(var i = 0;i <selectionIds.length ; i++){
            ids += selectionIds[i] + ",";
            texts += selectionNames[i] + ",";
        }
        $("#productTypes").val(ids.substring(0, ids.length - 1));
        $("#productNames").val(texts.substring(0, texts.length - 1));
    });

    $("#instBtn").click(function () {
        $("#instBtn").attr("disabled", true);
        $("#instIds").val('');
        var nodes = $("#instTree").jstree("get_checked");
        if (nodes.length < 1) {
            BootboxExt.alert("请选择适用机构")
            $("#instBtn").attr("disabled", false);
            return;
        }
        $('#instModal').modal('hide');
        var ids = "";
        var texts = "";
        for (var i = 0, checkedLength = nodes.length; i < checkedLength; i++) {
            if (i > 0) {
                texts += ",";
                ids += ",";
            }
            var currentNode = $('#instTree').jstree("get_node", nodes[i]);
            var text = currentNode.text;
            texts += text;
            ids += nodes[i];

        }
        $("#instIds").val(ids);
        $("#instNames").val(texts);
        $("#instBtn").attr("disabled", false);
    });

    $("#mchBtn").click(function () {
        $("#mchBtn").attr("disabled", true);
        $("#mids").val('');
        var mids = new Array();
        var differents = new Array();
        var mNames = new Array();
        var nodes = $("#mchTree").jstree("get_checked");
        if (nodes.length < 1) {
            BootboxExt.alert("请选择适用商户")
            $("#mchBtn").attr("disabled", false);
            return;
        }
        for (var i = 0, checkedLength = nodes.length; i < checkedLength; i++) {
            var currentNode = $('#mchTree').jstree("get_node", nodes[i]);
            var mName = currentNode.text;
            var difference = currentNode.li_attr.difference;
            mids.push(nodes[i].split('_')[1]);
            differents.push(difference);
            mNames.push(mName);
        }
        $('#mchModal').modal('hide');
        var mchInfoIdArr = "";  //拼接商户和子商户的id
        var mchInfoFlagArr = ""; //拼接区分商户和子商户的标识
        var mNamesArr = "";  //拼接商户和子商户的名称
        for (var i = 0; i < mids.length; i++) {
            if (i > 0) {
                mchInfoIdArr += ",";
            }
            mchInfoIdArr += mids[i];
        }
        for (var i = 0; i < differents.length; i++) {
            if (i > 0) {
                mchInfoFlagArr += ",";
            }
            mchInfoFlagArr += differents[i];
        }
        for (var i = 0; i < mNames.length; i++) {
            if (i > 0) {
                mNamesArr += ",";
            }
            mNamesArr += mNames[i];
        }
        $("#mids").val(mchInfoIdArr);
        $("#differents").val(mchInfoFlagArr);
        $("#midNames").val(mNamesArr);
        $("#mchBtn").attr("disabled", false);
    });

    $("#checkAll").click(function () {
        if ($("#checkAll").attr("checked")) {
            $("#mchTree").find("li").each(function () {
                $("#mchTree").jstree("check_node", $(this));
            });
        } else {
            $("#mchTree").jstree("uncheck_all", $(this));
        }
    });
});

/**
 * 验证弹框的参数。
 */
var restrictE = true;
var instalmentE = true;
var discountE = true;
function validOther() {
    var type = $("#type").val();
    var startTimeStr = $("#startTimeStr").val();
    var endTimeStr = $("#endTimeStr").val();
    var startTimeDate = new Date(startTimeStr).getTime();
    var endTimeDate = new Date(endTimeStr).getTime();
    var instNames = $("#instNames").val();
    var productNames = $("#productNames").val();
    var channelNames = $("#channelNames").val();
    var faceValueIds = $("#faceValueIds").val();
    if (type == null || type == '') {
        BootboxExt.alert("请选择活动类型")
        return false;
    }
    if (startTimeDate >= endTimeDate) {
        BootboxExt.alert("活动开始时间不能大于活动结束时间")
        return false;
    }
    if (channelNames == null || channelNames == '') {
        BootboxExt.alert("请选择适用渠道")
        return false;
    }
    if (instNames == null || instNames == '') {
        BootboxExt.alert("请选择适用机构")
        return false;
    }
    if (productNames == null || productNames == '') {
        BootboxExt.alert("请选择适用产品")
        return false;
    }
    /*if (type == 1) {
        if (faceValueIds == null || faceValueIds == '') {
            BootboxExt.alert("请选择适用面值")
            return false;
        }
    }*/
    var restrictsLength = $("#restrict_editable")[0].rows[1].innerText;
    if ('没有数据' == restrictsLength) {
        BootboxExt.alert("请新增活动配置")
        return false;
    }

    var instalmentLength = $("#instalment_editable")[0].rows[1].innerText;
    var discountLength = $("#discount_editable")[0].rows[1].innerText;
    if (type == 2) {
        if ('没有数据' == discountLength) {
            BootboxExt.alert("请新增折扣规则")
            return false;
        }
    } else {
        if ('没有数据' == instalmentLength && '没有数据' == discountLength) {
            BootboxExt.alert("请新增分期规则或者折扣规则")
            return false;
        }
    }
    if (!restrictE) {
        BootboxExt.alert("请先保存活动配置")
        return false;
    }
    if (!instalmentE) {
        BootboxExt.alert("请先保存分期规则")
        return false;
    }
    if (!discountE) {
        BootboxExt.alert("请先保存折扣规则")
        return false;
    }
    return true;
}

function optRestrictsJsonArry() {
    var myRows = [];
    var oTable = $("#restrict_editable")[0];
    //行数:oTable.rows.length,列数：oTable.rows[0].cells.length
    for (var i = 1; i < oTable.rows.length; i++) {
        var row = {}
        for (var j = 0; j < oTable.rows[i].cells.length; j++) {
            if (j == 0) {
                row.periodLimit = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 1) {
                row.period = getRestrictValue(oTable.rows[i].cells[j].innerHTML);
            } else if (j == 2) {
                row.restricts = oTable.rows[i].cells[j].innerHTML;
            }
        }
        myRows[i - 1] = row;
    }
    return myRows;
}

function optInstalmentJsonArry() {
    var myRows = [];
    var oTable = $("#instalment_editable")[0];
    //行数:oTable.rows.length,列数：oTable.rows[0].cells.length
    for (var i = 1; i < oTable.rows.length; i++) {
        var row = {}
        for (var j = 0; j < oTable.rows[i].cells.length; j++) {
            if (j == 0) {
                row.periods = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 1) {
                row.regularFixDate = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 2) {
                row.type = getTypeValue(oTable.rows[i].cells[j].innerHTML);
            } else if (j == 3) {
                row.regularFixMonth = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 4) {
                row.isImmediateArrival = getIsMedValue(oTable.rows[i].cells[j].innerHTML);
            } else if (j == 5) {
                row.simpleComment = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 6) {
                row.detailComment = oTable.rows[i].cells[j].innerHTML;
            }
        }
        myRows[i - 1] = row;
    }
    return myRows;
}

function optDiscountJsonArry() {
    var myRows = [];
    var oTable = $("#discount_editable")[0];
    //行数:oTable.rows.length,列数：oTable.rows[0].cells.length
    for (var i = 1; i < oTable.rows.length; i++) {
        var row = {}
        for (var j = 0; j < oTable.rows[i].cells.length; j++) {
            if (j == 0) {
                row.discount = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 1) {
                row.discountType = getDiscountValue(oTable.rows[i].cells[j].innerHTML);
            } else if (j == 2) {
                row.minPaymentAmt = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 3) {
                row.maxPaymentAmt = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 4) {
                row.priority = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 5) {
                row.disSimpleComment = oTable.rows[i].cells[j].innerHTML;
            } else if (j == 6) {
                row.disDetailComment = oTable.rows[i].cells[j].innerHTML;
            }
        }
        myRows[i - 1] = row;
    }
    return myRows;
}

/**
 * 初始化表格渠道号数据。
 */
function initChannelTable() {
    $("#channelId").empty();
    $("#channelName").empty();

    var channelIds = $("#channelIds").val();
    var channelNames = $("#channelNames").val();
    if (channelNames != null && channelNames != ''){
        selectionChannelIds = channelIds.split(",");
        selectionChannelNames = channelNames.split(",");
    }

    //先销毁表格
    $('#channel_table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    var table = $("#channel_table").bootstrapTable({
        method: "get",  //使用post请求到服务器获取数据
        url: '/marketing/activity/search-channel-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true, //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: "",
        queryParams: queryChannelParams,
        clickToSelect:true,
        uniqueId: "channelId",
        responseHandler:responseChannelHandler,
        columns: [
            {
                field: 'checked',
                checkbox: true
            },
            {
                field: 'channelId',
                title: '渠道编号'
            }, {
                field: 'channelName',
                title: '渠道名称'
            }],
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        },
        formatNoMatches: function () {  //没有匹配的结果
            return '无符合条件的记录';
        },
        onLoadError: function (data) {
            $('#channel_table').bootstrapTable('removeAll');
        },
    });

    //选中事件操作数组
    var union = function(array,ids){
        $.each(ids, function (i, id) {
            if($.inArray(id,array)==-1){
                array[array.length] = id;
            }
        });
        return array;
    };
    //取消选中事件操作数组
    var difference = function(array,ids){
        $.each(ids, function (i, id) {
            var index = $.inArray(id,array);
            if(index!=-1){
                array.splice(index, 1);
            }
        });
        return array;
    };
    var _ = {"union":union,"difference":difference};
    //绑定选中事件、取消事件、全部选中、全部取消
    table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
        var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return row.channelId;
        });
        var texts = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return (row.channelId +'_'+ row.channelName);
        });
        func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
        selectionChannelIds = _[func](selectionChannelIds, ids);
        selectionChannelNames = _[func](selectionChannelNames, texts);
    });
}

//表格分页之前处理多选框数据
function responseChannelHandler(res) {
    $.each(res.rows, function (i, row) {
        row.checkStatus = $.inArray(row.id, selectionChannelIds) != -1;  //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });
    return res;
}

function queryChannelParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        channelId: $("#channelId").val(),
        channelName: $("#channelName").val(),
        activityId: $("#id").val(),
        channelIds: $("#channelIds").val()
    };
    return temp;
}

/**
 * 初始化表格机构数据。
 */
function initInstTable() {
    $("#instModal").on("hidden.bs.modal", function (e) {
        $(this).removeData();
        $("#instTree").jstree("destroy");
    });
    var instIds = $("#instIds").val();
    var instTree = $("#instTree").bind("loaded.jstree", function (e, data) {
        $("#instTree").jstree("open_all");
        $("#instTree").find("li").each(function () {
            if (instIds == null || instIds == '') {
            } else {
                var dataArr = instIds.split(",");
                for (var i = 0; i < dataArr.length; i++) {
                    var currentNode = $('#instTree').jstree("get_node", dataArr[i]);
                    if (jQuery(this).attr("id") == dataArr[i] && $('#instTree').jstree("is_leaf", currentNode)) {
                        jQuery("#instTree").jstree("check_node", jQuery(this));
                    }
                }
            }
        });
    }).jstree({
        "core": {
            "data": {
                "url": '/marketing/activity/search-inst-list',
                "dataType": "json",
                "cache": false
            },
            "attr": {
                "class": "jstree-checked"
            }
        },
        "types": {
            "default": {
                "icon": "glyphicon glyphicon-flash"
            },
            "file": {
                "icon": "glyphicon glyphicon-ok"
            }
        },
        "checkbox": {
            "keep_selected_style": false,
            "real_checkboxes": true,
            "tie_selection": true,
        },
        "plugins": ["dnd", "search",
            "types", "wholerow", "checkbox"
        ]
    }).bind("loaded.jstree", function (e, data) {
        var inst = data.instance;
        var nchIds = $("#instIds").val();
        var dataArr = nchIds.split(",");
        for (var j = 0; j < dataArr.length; j++) {
            var nodeId = inst.get_node(dataArr[j]);
            $("#instTree").jstree("check_node", nodeId);
        }
    });
}

/**
 * 初始化产品信息表格数据。
 */

function initProductTable() {
    $("#productType").empty();
    $("#productName").empty();
    var productTypes = $("#productTypes").val();
    var productNames = $("#productNames").val();
    if (productTypes != null && productTypes != ''){
        selectionIds = productTypes.split(",");
        selectionNames = productNames.split(",");
    }
    //先销毁表格
    $('#product_table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    var table = $("#product_table").bootstrapTable({
        method: "get",  //使用post请求到服务器获取数据
        url: '/marketing/activity/search-product-list', //获取数据的Servlet地址
        striped: true,  //表格显示条纹
        showRefresh: true,  //显示刷新按钮
        pagination: true, //是否显示分页（*）
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        queryParamsType: '',
        queryParams: queryParams,
        clickToSelect:true,
        uniqueId: "productType",
        responseHandler:responseHandler,
        columns: [
            {
                field: 'checked',
                checkbox: true
            }, {
                field: 'productType',
                title: '产品类型'
            }, {
                field: 'productName',
                title: '产品名称'
            }],
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        },
        formatNoMatches: function () {  //没有匹配的结果
            return '无符合条件的记录';
        },
        onLoadError: function (data) {
            $('#product_table').bootstrapTable('removeAll');
        },
    });

    //选中事件操作数组
    var union = function(array,ids){
        $.each(ids, function (i, id) {
            if($.inArray(id,array)==-1){
                array[array.length] = id;
            }
        });
        return array;
    };
    //取消选中事件操作数组
    var difference = function(array,ids){
        $.each(ids, function (i, id) {
            var index = $.inArray(id,array);
            if(index!=-1){
                array.splice(index, 1);
            }
        });
        return array;
    };
    var _ = {"union":union,"difference":difference};
    //绑定选中事件、取消事件、全部选中、全部取消
    table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
        var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return row.productType;
        });
        var texts = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return (row.productType +'_'+ row.productName);
        });
        func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
        selectionIds = _[func](selectionIds, ids);
        selectionNames = _[func](selectionNames, texts);
    });
}

//表格分页之前处理多选框数据
function responseHandler(res) {
    $.each(res.rows, function (i, row) {
        row.checkStatus = $.inArray(row.id, selectionIds) != -1;  //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });
    return res;
}

function queryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber,  //页码
        productType: $("#productType").val(),
        productName: $("#productName").val(),
        activityId: $("#id").val(),
        productTypes: $("#productTypes").val()
    };
    return temp;
}

jQuery(document).ready(function () {
    //选择所有面值的单击事件
    /*$("#addAll").click(function () {
        $('#faceValue_multi_select').multiSelect('select_all', $(".ms-selection ul"));
    });*/

    //不选择所有面值的单击事件
    /*$("#noAddAll").click(function () {
        $('#faceValue_multi_select').multiSelect('deselect_all', $(".ms-selection ul"));
    });*/
    $("#startTimeStr").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd hh:mm:ss",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#endTimeStr").datetimepicker("setStartDate", $("#startTimeStr").val());
        $("#startTimeStr").datetimepicker("hide");
    });
    $("#endTimeStr").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd hh:mm:ss",
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#startTimeStr").datetimepicker("setEndDate", $("#endTimeStr").val());
        $("#endTimeStr").datetimepicker("hide");
    });

    /**
     * 活动开始清空事件
     */
    $("#startTimeClear").click(function () {
        $("#startTimeStr").val("");
    });
    /**
     * 活动开始结束时间清空事件
     */
    $("#endTimeClear").click(function () {
        $("#endTimeStr").val("");
    });
});

$("#type").change(function () {
    var type = $(this).val();
    if (type == 1) {
        $("#faceValue").show();
        $("#instalment").show();
    } else if (type == 2) {
        $("#faceValue").css("display", "none");
        $("#instalment").css("display", "none");
    }
});

var operator = $("#operator").val();

$("#type").change(function () {
    $("#minPaymentAmt").val('');
    $("#maxPaymentAmt").val('');
});



