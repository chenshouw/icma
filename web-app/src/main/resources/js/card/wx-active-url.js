jQuery(document).ready(function () {
    $("#createTimeBegin").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function () {
        $("#createTimeEnd").datetimepicker("setStartDate", $("#createTimeBegin").val());
        $("#createTimeBegin").datetimepicker("hide");
    });
    $("#createTimeEnd").datetimepicker({
        language: 'zh-CN',
        timePicker: false,
        format: "yyyy-mm-dd",
        minView:'month',
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function () {
        $("#createTimeBegin").datetimepicker("setEndDate", $("#createTimeEnd").val());
        $("#createTimeEnd").datetimepicker("hide");
    });
    /**
     * 创建开始时间清空事件
     */
    $("#createTimeBeginClear").click(function () {
        $("#createTimeBegin").val("");
    });
    /**
     * 创建结束时间清空事件
     */
    $("#createTimeEndClear").click(function () {
        $("#createTimeEnd").val("");
    });

});

function activeUrlDel(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/card/active-url/active-url-remove", {id: id}, function (data) {
                if (data.result == true) {
                    BootboxExt.confirm("删除成功", function (res) {
                        location.href = "/card/active-url/active-url-search";
                    });
                } else {
                    BootboxExt.confirm("删除失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }
    });
}

function removeLink(removeIndex) {
    if ($(".entranceDiv .editor_section").length > 1) {
        if (removeIndex == 2 && $(".entranceDiv .editor_section").length == 3) {
            $("#customCellUrl").val($("#promotionUrl").val());
            $("#customCellName").val($("#promotionUrlName").val());
            $("#customCellTips").val($("#promotionUrlSubTitle").val());

            $("#customCellName").trigger("change");
            $("#customCellTips").trigger("change");
        }
        $(".entranceDiv .editor_section").last().remove();
        $("#js_custom_url_preview .msg_card_section").last().remove();

        $("#js_add_config_url").attr("disabled", false);
    } else {
        BootboxExt.alert("至少填写一个入口");
    }
}

function showMsg(index, className, obj){
    $("#js_custom_url_preview ." + className).eq(index).text($(obj).val());
    $(obj).parent("span").next("span").find("span").text(getLen($(obj).val()));
}

$(function () {
    //添加入口
    $("#js_add_config_url").on("click", function () {
        if ($(".entranceDiv .editor_section").length < 3) {
            //入口表单信息
            var entranceThirdHtml = '<div class="editor_section"><h3 class="title"><p><span class="js_appmsg_url_intro">入口三</span><a class="right-link" href="javascript:removeLink(3);">删除</a></p></h3><div class="frm_control_group frm_card_extend"><label class="frm_label"><font color="#FF0000">*</font><strong class="title">入口三跳转链接</strong></label><span class="frm_input_box with_counter counter_in append"><input name="promotionUrl" id="promotionUrl" required class="frm_input js_can_preview js_maxlength valid" type="text" placeholder="" value=""></span></div><div class="frm_control_group frm_card_extend"><label class="frm_label"><font color="#FF0000">*</font><strong class="title">入口三名称</strong></label><span class="frm_input_box with_counter counter_in append"><input name="promotionUrlName" id="promotionUrlName" required cnMaxLength="5" onchange="showMsg(2, \'js_custom_url_name_pre\', this)"   class="frm_input js_can_preview js_maxlength valid" type="text" placeholder="" value=""></span><span class="tips"><span class="js_url_title_3">0</span>/5</span></div><div class="frm_control_group frm_card_extend"><label class="frm_label"><font color="#FF0000">*</font><strong class="title">入口三右侧提示语</strong></label><span class="frm_input_box with_counter counter_in append"><input name="promotionUrlSubTitle" id="promotionUrlSubTitle" required cnMaxLength="6" onchange="showMsg(2, \'js_custom_url_tips_pre\', this)" class="frm_input js_can_preview js_maxlength valid" type="text" placeholder="" value=""></span><span class="tips"><span class="js_url_title_3">0</span>/6</span></div></div>';
            var entranceSecondHtml = '<div class="editor_section"><h3 class="title"><p><span class="js_appmsg_url_intro">入口二</span><a class="right-link" href="javascript:removeLink(2);">删除</a></p></h3><div class="frm_control_group frm_card_extend"><label class="frm_label"><font color="#FF0000">*</font><strong class="title">入口二跳转链接</strong></label><span class="frm_input_box with_counter counter_in append"><input name="customCellUrl" id="customCellUrl" required class="frm_input js_can_preview js_maxlength valid" type="text" placeholder="" value=""></span></div><div class="frm_control_group frm_card_extend"><label class="frm_label"><font color="#FF0000">*</font><strong class="title">入口二名称</strong></label><span class="frm_input_box with_counter counter_in append"><input name="customCellName" id="customCellName" required cnMaxLength="5" onchange="showMsg(1, \'js_custom_url_name_pre\', this)"  class="frm_input js_can_preview js_maxlength valid" type="text" placeholder="" value=""></span><span class="tips"><span class="js_url_title_3">0</span>/5</span></div><div class="frm_control_group frm_card_extend"><label class="frm_label"><font color="#FF0000">*</font><strong class="title">入口二右侧提示语</strong></label><span class="frm_input_box with_counter counter_in append"><input name="customCellTips" id="customCellTips" required cnMaxLength="6" onchange="showMsg(1, \'js_custom_url_tips_pre\', this)"  class="frm_input js_can_preview js_maxlength valid" type="text" placeholder="" value=""></span><span class="tips"><span class="js_url_title_3">0</span>/6</span></div></div>';
            var msg = "";
            if ($(".entranceDiv .editor_section").length == 1) {
                $(".entranceDiv").append(entranceSecondHtml);
                msg = "入口二（选填)";
            }else {
                $(".entranceDiv").append(entranceThirdHtml);
                $("#js_add_config_url").attr("disabled", true);
                msg = "入口三（选填)";
            }
            //入口展示信息
            var showHtml = '<li class="msg_card_section"><div class="li_panel"><div class="li_content"><p><span class="supply_area"><span class="js_custom_url_tips_pre"></span><span class="ic ic_go"></span></span><span class="js_custom_url_name_pre">'+msg+'</span></p></div></div></li>';
            $("#js_custom_url_preview").append(showHtml);

        } else {
            BootboxExt.alert("最多填写三个入口");
        }
    });

    //顶部按钮名称修改
    $("#centerUrlName").on("change", function () {
        if ($(this).val() != "") {
            $(".quick_pay a").css("display", "").text($(this).val());
        } else {
            $(".quick_pay a").css("display", "none").text("");
        }
    });
    //顶部按钮下方提示修改
    $("#centerUrlSubTitle").on("change", function () {
        if ($(this).val() != "") {
            $(".quick_pay p").css("display", "").text($(this).val());
        } else {
            $(".quick_pay p").css("display", "none").text("");
        }
    });

    //文本修改，显示长度
    $("span.tips").prev("span").find("input").on("change", function () {
        $(this).parent("span").next("span").find("span").text(getLen($(this).val()));
    });

    //新增提交
    $("#btnSave").click(function () {
        if ($('form').valid()) {
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("body"));
            $.post("/card/active-url/active-url-add", $("form").serialize(), function (data) {
                if (data.result == true) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("body"));
                    BootboxExt.alert("新增成功", function () {
                        location.href = "/card/active-url/active-url-search";
                    });
                } else {
                    BootboxExt.alert("新增失败", function () {
                        window.location.reload();
                    });
                }
            });
        }
    });
    //取消
    $("#btnBack").click(function () {
        window.location.href = "/card/active-url/active-url-search";
    });

    //修改提交
    $("#btnUpdate").click(function () {
        if ($('form').valid()) {
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("body"));
            $.post("/card/active-url/active-url-update", $("form").serialize(), function (data) {
                if (data.result == true) {
                    $("#btnUpdate").attr("disabled", false);
                    Shade.unblockUI($("body"));
                    BootboxExt.alert(data.message, function () {
                        location.href = "/card/active-url/active-url-search";
                    });
                } else {
                    BootboxExt.alert(data.message, function () {
                        window.location.reload();
                    });
                }
            });
        }
    });

    //修改页面初始化顶部按钮
    $("#centerUrlName").trigger("change");
    $("#centerUrlSubTitle").trigger("change");
});
