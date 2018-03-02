//商户管理

var mid;
var midName;
var areaCode;
var mchGrp;
var modiDateBegin;
var modiDateEnd;

//弹窗获取数据
var isReady = false;
//搜索数据
var searchData;

function merchantSearch(data) {
    if (!isReady) {
        $("#mchInfo_mid").val(data.mid);
        $("#mchInfo_midName").val(data.midName);
        $("#mchInfo_areaCode").val(data.areaCode);
        $("#mchInfo_mchGrp").val(data.mchGrp);
        $("#mchInfo_modiDateBegin").val(data.modiDateBegin);
        $("#mchInfo_modiDateEnd").val(data.modiDateEnd);
        //查询获取数据
        isReady = true;
    }
    mid = $("#mchInfo_mid").val();
    midName = $("#mchInfo_midName").val();
    areaCode = $("#mchInfo_areaCode").val();
    mchGrp = $("#mchInfo_mchGrp").val();
    modiDateBegin = $("#mchInfo_modiDateBegin").val();
    modiDateEnd = $("#mchInfo_modiDateEnd").val();
    $.ajax({
        type: "post",
        data: {
            mid: mid,
            midName: midName,
            areaCode: areaCode,
            mchGrp: mchGrp,
            modiDateBegin: modiDateBegin,
            modiDateEnd: modiDateEnd,
        },
        url: "/mch/info/search-mchinfo",
        dataType: "json",
        success: function (json) {
            if (null != json && "" != json) {
                /**
                 * 下拉框数据 acqAccept
                 */
                var tbody = document.getElementById('tbMchInfo');
                $("div[name='merchantTable'] tbody tr").empty();
                if (null != json.result && "" != json.result) {
                    searchData = json.result;
                    $("#merchantTable tbody tr").attr("display", true);
                    for (var i = 0; i < json.result.length; i++) {
                        var trow = getMchInfoDataRow(json.result[i]); //定义一个方法,返回tr数据
                        tbody.appendChild(trow);
                    }
                }
            }
        },
        error: function () {
            BootboxExt.alert("加载失败");
        }
    });
}

function getMchInfoDataRow(mchInfo) {
    var row = document.createElement('tr');
    row.addEventListener('click', function () {
        $(this).find(":radio").attr("checked", true);
    }, false);
    row.style = "cursor: pointer;";
    var checkBoxCell = document.createElement('td');
    if (document.getElementById("mid").value.split("/")[0] == mchInfo.mid) {
        checkBoxCell.innerHTML = "<input type='radio' value='" + mchInfo.mid + "' name='mchInfo_mid' checked='checked'>";
    } else {
        checkBoxCell.innerHTML = "<input type='radio' value='" + mchInfo.mid + "' name='mchInfo_mid'>";
    }
    row.appendChild(checkBoxCell);
    var mid = document.createElement('td');
    mid.innerHTML = mchInfo.mid;
    row.appendChild(mid);
    var midName = document.createElement('td');
    midName.innerHTML = mchInfo.midName;
    row.appendChild(midName);
    var areaCode = document.createElement('td');
    areaCode.innerHTML = mchInfo.areaCode;
    row.appendChild(areaCode);
    var mchGrp = document.createElement('td');
    mchGrp.innerHTML = mchInfo.mchGrp;
    row.appendChild(mchGrp);
    var mchInfo_modiDateEnd = document.createElement('td');
    mchInfo_modiDateEnd.innerHTML = new Date(mchInfo.modiDate).format("yyyy-MM-dd HH:mm:ss");
    row.appendChild(mchInfo_modiDateEnd);
    var settleBank = document.createElement('td');
    settleBank.innerHTML = mchInfo.settleBank;
    row.appendChild(settleBank);
    var openDate = document.createElement('td');
    openDate.innerHTML = mchInfo.openDate;
    row.appendChild(openDate);
    var acqId = document.createElement('td');
    acqId.innerHTML = mchInfo.acqAccept == null ? mchInfo.acqId : mchInfo.acqAccept.acqName;
    row.appendChild(acqId);
    var flag = document.createElement('td');
    if (mchInfo.flag == 1) {
        flag.innerHTML = "已开通";
    } else {
        flag.innerHTML = "未开通";
    }
    row.appendChild(flag);
    var teller = document.createElement('td');
    teller.innerHTML = mchInfo.teller;
    row.appendChild(teller);
    return row;
}


var selectMid;
var selectData;

function merchantSave(callback) {

    if($("#mid").val()==null || $("#mid").val()==''){
        selectMid = null;
        selectData = null;
    }
    $("input[name='mchInfo_mid']:radio").each(function () {
        if ($(this).attr("checked")) {
            selectMid = $(this).val();
            for (var i = 0; i < searchData.length; i++) {
                if (searchData[i].mid == selectMid) {
                    selectData = searchData[i];
                    break;
                }
            }
        }
    });
    if (null == selectMid || '' == selectMid) {
        BootboxExt.alert('请选择数据!');
        return;
    } else {
        $("div[name='merchantTable']").modal('hide');
    }

    callback.call(this, selectData);
}

jQuery(document).ready(function () {
    /**
     * 到期时间
     */
    $("#mchInfo_modiDateBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#mchInfo_modiDateEnd").datetimepicker("setStartDate", $("#mchInfo_modiDateBegin").val());
        $("#mchInfo_modiDateBegin").datetimepicker("hide");
    });
    $("#mchInfo_modiDateEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView: 'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function (ev) {
        $("#mchInfo_modiDateBegin").datetimepicker("setEndDate", $("#mchInfo_modiDateEnd").val());
        $("#mchInfo_modiDateEnd").datetimepicker("hide");
    });
    /**
     * 交易日期开始时间清空事件
     */
    $("#mchInfo_modiDateBeginClear").click(function () {
        $("#mchInfo_modiDateBegin").val("");
    });
    /**
     * 交易日期结束时间清空事件
     */
    $("#mchInfo_modiDateEndClear").click(function () {
        $("#mchInfo_modiDateEnd").val("");
    });
});

