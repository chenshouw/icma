$("#tree_cl").jstree({
    "core": {
        "themes": {
            "stripes": true,
        },
        "animation": 0,
        'data': {
            'url': function (node) {
                return '/insts/getInstTree/0';
            }
        }
    },
    "types": {
        "default": {
            "icon": "glyphicon glyphicon-flash"
        },
        "demo": {
            "icon": "glyphicon glyphicon-ok"
        }
    },
    "plugins": ["contextmenu", "types"],
    "contextmenu": {items: contextMenus}
}).on('change.jstree', function (e, data) {
}).bind("loaded.jstree", function (e, data) {
    var inst = data.instance;
    var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
    inst.select_node(obj);
    data.instance.open_all();
});

function contextMenus(node) {
    var temp = {
        "childAdd": {
            "label": "新建子目录",
            "value":"childAdd",
            "action": function (data) {
                var inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                $("#form_detail").css("display", "none");
                $("#form_cl").show();
                $("#buttonId").show();
                $("#instDiv").show();
                disabledFalse();
                $("#form_cl :input").val("");
                $("#form_cl select").val("");
                $("#parentInstId").val(obj.id);
                $("#instOperatorType").val("create");
                //return {add: this.(data) };
            }
        },
        "update": {
            "label": "修改目录",
            "value":"update",
            "action": function (data) {
                var inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                $("#form_detail").css("display", "none");
                $("#form_cl").show();
                $("#buttonId").show();
                disabledFalse();
                $("#form_cl :input").val("");
                $("#form_cl select").val("");
                $("#instOperatorType").val("update");
                getInfo(obj.id);
                $("#instDiv").hide();
            }
        },
        "delete": {
            "label": "删除目录",
            "value":"delete",
            "action": function (data) {
                var inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                deleteInst(obj.id);
            }
        },
        "detail": {
            "label": "查看详情",
            "value":"detail",
            "action": function (data) {
                var inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                $("#form_cl").css("display", "none");
                $("#form_detail").show();
                $("#d_instDiv").show();
                getInfoDetail(obj.id);
            }
        }
    }
    removeNoRightMenu(temp);
    return temp;
}

function getSelect(){
    var areaData = "<option value=''>请选择地区编码</option>";
    $.ajax({
        type : 'GET',
        url : '/insts/getAreaCode',
        dateType : 'json',
        success: function(msg){
            $.each(msg,function(i,n){
                areaData += "<option value='"+n.areaCode+"'>"+n.areaName+"</option>";
            });
            $("#areaCode").append(areaData);
        }
    })
}

//获取value对比是否有权限
function removeNoRightMenu(temp) {
    if ($("#optChildAdd").val() != temp.childAdd.value) {
        delete temp.childAdd;
    }

    if ($("#optUpdate").val() != temp.update.value) {
        delete temp.update;
    }

    if ($("#optDelete").val() != temp.delete.value) {
        delete temp.delete;
    }

    if ($("#optDetail").val() != temp.detail.value) {
        delete temp.detail;
    }
}

function iteratorSelectArea(areaCode) {
    //var items = document.getElementsByName("#areaCode");
    //var items = $("#areaCode").val();
    //alert(items);
    var strCode = $("#areaCode option").map(function(){return $(this).val();}).get();
    var strName = $("#areaCode option").map(function(){return $(this).text();}).get();
    alert("11:" + areaCode);
    alert(strCode[1]);
    for (var i =0 ; i < strCode.length; i ++) {
        if (strCode[i] == areaCode) {
            //$("#areaCode").val(strCode[i]);
            $("#areaCode option").eq(i).attr("selected","selected");
            //$("#areaCode option").eq(i).innerHTML = strName[i];
           // $("#areaCode option[text=strName[i]]").attr("selected", "selected");
            break;
        }
    }
}


/**
 * 根据组织机构ID查询组织机构详细信息
 * @param instId
 */
function getInfo(instId) {
    $.get("/insts/get", {instId: instId}, function (data) {
        if (data.result != null) {
            $("#instId").val(instId);
            $("#instName").val(data.result.instName);
            $("#shortName").val(data.result.shortName);
            //iteratorSelectArea(data.result.areaCode);
            $("#areaCode").val(data.result.areaCode);
            $("#parentInstId").val(data.result.parentInstId == null ? '' : data.result.parentInstId);
            $("#instLevel").val(data.result.instLevel == null ? '' : data.result.instLevel);
            $("#linkMan").val(data.result.linkMan == null ? '' : data.result.linkMan);
            $("#phone").val(data.result.phone == null ? '' : data.result.phone);
            $("#settleBank").val(data.result.settleBank == null ? '' : data.result.settleBank);
            $("#settleAcc").val(data.result.settleAcc == null ? '' : data.result.settleAcc);
            $("#accName").val(data.result.accName == null ? '' : data.result.accName);
            $("#status").val(data.result.status == null ? '' : data.result.status);
            $("#linkMan").val(data.result.linkMan == null ? '' : data.result.linkMan);
            $("#localFlag").val(data.result.localFlag == null ? '' : data.result.localFlag);
            $("#quotaFlag").val(data.result.quotaFlag == null ? '' : data.result.quotaFlag);
            $("#mngTag").val(data.result.mngTag == null ? '' : data.result.mngTag);
            $("#issuTag").val(data.result.issuTag == null ? '' : data.result.issuTag);
            $("#acqTag").val(data.result.acqTag == null ? '' : data.result.acqTag);
            $("#fwdTag").val(data.result.fwdTag == null ? '' : data.result.fwdTag);
            $("#memo").val(data.result.memo == null ? '' : data.result.memo);

        } else {
            BootboxExt.confirm("查询需修改的对象失败", function (res) {
                window.location.reload();
            });
        }
    }, "json");
}

function getAreaName(areaCode){
    var strCode = $("#areaCode option").map(function(){return $(this).val();}).get();
    var strName = $("#areaCode option").map(function(){return $(this).text();}).get();
    for (var i =0 ; i < strCode.length; i ++) {
        if (strCode[i] == areaCode) {
            $("#areaCode option").eq(i).attr("selected","selected");
            $("#d_areaCode").text(strName[i]);
            break;
        }
    }
}

/**
 * 根据组织机构ID查询组织机构详细信息
 * @param instId
 */
function getInfoDetail(instId) {
    $.get("/insts/get", {instId: instId}, function (data) {
        if (data.result != null) {
            $("#d_instId").text(instId);
            $("#d_instName").text(data.result.instName);
            $("#d_shortName").text(data.result.shortName);
            getAreaName(data.result.areaCode);
            //$("#d_areaCode").text(data.result.areaCode);
            $("#d_parentInstId").text(data.result.parentInstId == "" ? '' : data.result.parentInstId);
            $("#d_instLevel").text(data.result.instLevel == "" ? '' : data.result.instLevel);
            $("#d_linkMan").text(data.result.linkMan == "" ? '' : data.result.linkMan);
            $("#d_phone").text(data.result.phone == "" ? '' : data.result.phone);
            $("#d_settleBank").text(data.result.settleBank == "" ? '' : data.result.settleBank);
            $("#d_settleAcc").text(data.result.settleAcc == "" ? '' : data.result.settleAcc);
            $("#d_accName").text(data.result.accName == "" ? '' : data.result.accName);
            $("#d_status").text(data.result.status == "" ? '' : (data.result.status == 1 ? '有效' : '无效'));
            $("#d_linkMan").text(data.result.linkMan == "" ? '' : data.result.linkMan);
            $("#d_localFlag").text(data.result.localFlag == "" ? '' : (data.result.localFlag == 1 ? '是' : '否'));
            $("#d_quotaFlag").text(data.result.quotaFlag == "" ? '' : (data.result.quotaFlag == 1 ? '是' : '否'));
            $("#d_mngTag").text(data.result.mngTag == "" ? '' : (data.result.mngTag == 1 ? '是' : '否'));
            $("#d_issuTag").text(data.result.issuTag == "" ? '' : (data.result.issuTag == 1 ? '是' : '否'));
            $("#d_acqTag").text(data.result.acqTag == "" ? '' : (data.result.acqTag == 1 ? '是' : '否'));
            $("#d_fwdTag").text(data.result.fwdTag == "" ? '' : (data.result.fwdTag == 1 ? '是' : '否'));
            $("#d_memo").text(data.result.memo == "" ? '' : data.result.memo);

        } else {
            BootboxExt.confirm("查询需修改的对象失败", function (res) {
                window.location.reload();
            });
        }
    }, "json");
}

/**
 * 必填项校验。
 */
/*
 function validForm() {
 var instId = $("#instId").val();
 var instName = $("#instName").val();
 var areaCode = $("#areaCode").val();
 if(instId == null || instId == ""){
 BootboxExt.alert("请输入机构编码");
 return ;
 }
 if(instName == null || instName == ""){
 BootboxExt.alert("请输入机构名称");
 return ;
 }
 if(areaCode == null || areaCode == ""){
 BootboxExt.alert("请输入所属区域");
 return ;
 }

 }
 */

/**
 * 保存新增的子组织机构或修改的组织机构信息
 */
function save() {
    var instId = $("#instId").val();
    var instName = $("#instName").val();
    var shortName = $("#shortName").val();
    var areaCode = $("#areaCode").val();
    var phone = $("#phone").val();
    var instLevel = $("#instLevel").val();
    var status = $("#status").val();
    if (instId == null || instId == "") {
        BootboxExt.alert("请输入机构编码");
        return;
    } else {
        if (!(/^[a-zA-Z0-9]+$/.test(instId))) {
            BootboxExt.alert("机构编码只能输入数字跟英文字母");
            return;
        }
    }
    if (instName == null || instName == "") {
        BootboxExt.alert("请输入机构名称");
        return;
    }
    if (shortName == null || shortName == "") {
        BootboxExt.alert("请输入机构简称");
        return;
    }
    if (areaCode == null || areaCode == "") {
        BootboxExt.alert("请输入所属地区");
        return;
    } else {
        if (!(/^[A-Za-z0-9]+$/.test(areaCode))) {
            BootboxExt.alert("所属地区只能输入数字或者字母");
            return;
        }
    }
    if (instLevel == null || instLevel == '') {
        BootboxExt.alert("请输入机构等级");
        return;
    } else {
        if (!(/^[0-9]+$/.test(instLevel))) {
            BootboxExt.alert("机构等级只能输入数字");
            return;
        } else {
            if(instLevel == 99){
                BootboxExt.alert("机构等级只能填不等于99的数字");
                return;
            }
        }
    }
    if (phone != "") {
        var tel = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(phone);
        if (tel == false) {
            BootboxExt.alert("手机号码或电话号码格式不正确");
            return;
        }
    }
    if (status == null || status == '') {
        BootboxExt.alert("请选择状态");
        return;
    }
    Shade.blockUI($("#instBody"))
    $.post("/insts/saveInst",
        $("#form_cl").serialize(),
        function (data) {
            Shade.unblockUI($("#instBody"))
            if (data.result == 'success') {
                BootboxExt.alert("保存成功", function (res) {
                    location.href = "/insts/search";
                });
            } else if (data.result == 'isHas') {
                BootboxExt.alert("机构编号已存在", function (res) {
                    return;
                });
            } else {
                BootboxExt.alert("保存失败", function (res) {
                    window.location.reload();
                });
            }
        })
}

/**
 * 删除组织机构。
 * @param instId 组织机构编号
 */
function deleteInst(instId) {
    BootboxExt.confirm("其下面的子目录会一起删除，确认删除吗？", function (res) {
        if (res) {
            $.get("/insts/delete", {instId: instId}, function (data) {
                if (data.result == true) {
                    BootboxExt.alert("删除成功", function (res) {
                        location.href = "/insts/search";
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

/**
 * 新增组织机构一级目录
 */
function addNew() {
    $("#form_detail").css("display", "none");
    $("#form_cl").show();
    disabledFalse();
    $("#form_cl :input").val("");
    $("#form_cl select").val("");
    $("#parentInstId").val("");
    $("#instOperatorType").val("create");
}

function disabledTrue() {
    $("#instId").attr("disabled", true);
    $("#instName").attr("disabled", true);
    $("#areaCode").attr("disabled", true);
    $("#parentInstId").attr("disabled", true);
    $("#instLevel").attr("disabled", true);
    $("#linkMan").attr("disabled", true);
    $("#phone").attr("disabled", true);
    $("#settleBank").attr("disabled", true);
    $("#settleAcc").attr("disabled", true);
    $("#accName").attr("disabled", true);
    $("#status").attr("disabled", true);
    $("#linkMan").attr("disabled", true);
    $("#localFlag").attr("disabled", true);
    $("#quotaFlag").attr("disabled", true);
    $("#mngTag").attr("disabled", true);
    $("#issuTag").attr("disabled", true);
    $("#acqTag").attr("disabled", true);
    $("#fwdTag").attr("disabled", true);
    $("#memo").attr("disabled", true);
}

function disabledFalse() {
    $("#instId").attr("disabled", false);
    $("#instName").attr("disabled", false);
    $("#areaCode").attr("disabled", false);
    $("#parentInstId").attr("disabled", false);
    $("#instLevel").attr("disabled", false);
    $("#linkMan").attr("disabled", false);
    $("#phone").attr("disabled", false);
    $("#settleBank").attr("disabled", false);
    $("#settleAcc").attr("disabled", false);
    $("#accName").attr("disabled", false);
    $("#status").attr("disabled", false);
    $("#linkMan").attr("disabled", false);
    $("#localFlag").attr("disabled", false);
    $("#quotaFlag").attr("disabled", false);
    $("#mngTag").attr("disabled", false);
    $("#issuTag").attr("disabled", false);
    $("#acqTag").attr("disabled", false);
    $("#fwdTag").attr("disabled", false);
    $("#memo").attr("disabled", false);

}