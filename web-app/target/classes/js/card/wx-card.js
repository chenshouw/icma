var colorName = "";
var colorValue = "";
var logoImgId = "";
var logoMapping = "";
var logoUri = "";
var bgImgId = "";
var bgMapping = "";
var bgUri = "";

$(function () {
    //期限类型改变事件
    $("input:radio[name='validDateStatus']").change(function () {
        var dateStatus = $("input[name='validDateStatus']:checked").val();
        if (dateStatus === "1") {
            $("#dateInput").hide();
            $("#dateSelect").hide();
            $("#effectiveDays").val("");
            $("#effDateBegin").val("");
            $("#effDateEnd").val("");
        } else if (dateStatus === "2") {
            $("#dateSelect").show();
            $("#dateInput").hide();
            $("#effectiveDays").val("");
        } else if (dateStatus === "3") {
            $("#dateInput").show();
            $("#dateSelect").hide();
            $("#effDateBegin").val("");
            $("#effDateEnd").val("");
        }
    });

    //日期区间开始日期选择
    $("#effDateBegin").datepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        timePicker: false,
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function () {
        $("#effDateEnd").datepicker("setStartDate", $("#effDateBegin").val());
        $("#effDateBegin").datepicker("hide");
    });
    //日期区间结束日期选择
    $("#effDateEnd").datepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        timePicker: false,
        autoClose: true,
        clearBtn: true,
        todayBtn: true
    }).on('changeDate', function () {
        $("#effDateBegin").datepicker("setEndDate", $("#effDateEnd").val());
        $("#effDateEnd").datepicker("hide");
    });
    //创建开始时间清空事件
    $("#createTimeBeginClear").click(function () {
        $("#effDateBegin").val("");
    });
    //创建结束时间清空事件
    $("#createTimeEndClear").click(function () {
        $("#effDateEnd").val("");
    });

    //选择颜色
    $("#colorBtn").click(function () {
        $("#color-modal").modal("show");
    });
    $("#color-modal").on("shown.bs.modal", function () {
        $("#color-panel").empty();
        $.ajax({
            type: "get",
            url: "/card/wx-card/get-card-color",
            async: false,
            success: function (result) {
                $.each(result, function (index, data) {
                    $("#color-panel").append("<div class='col-md-3'>" +
                        "                          <input type='hidden' class='colorVal' value='" + data.code + "'> " +
                        "                          <a onclick='selectColor(\"" + data.code + "\",\"" + data.name + "\")'>" +
                        "                               <p style='height:100px;background-color:" + data.name + ";'></p>" +
                        "                          </a>" +
                        "                    </div>");
                });
            }
        });
    });

    //选择LOGO
    $("#logoBtn").click(function () {
        $("#logo-modal").modal("show");
    });
    $("#logo-modal").on("shown.bs.modal", function () {
        $("#logo-panel").empty();
        $.ajax({
            type: "get",
            url: "/card/wx-card/get-card-logo",
            async: false,
            success: function (result) {
                var imgMapping = result.imgMapping;
                var cardImgs = result.cardImgs;
                $.each(cardImgs, function (index, data) {
                    $("#logo-panel").append("<div class='col-md-3'>" +
                        "                         <input type='hidden' class='logoImgId' value='" + data.id + "'> " +
                        "                         <a onclick='selectLogo(\"" + data.id + "\",\"" + imgMapping + "\",\"" + data.uri + data.imgName + "\")'>" +
                        "                              <img style='height:120px;width: 200px;' src='" + imgMapping + data.uri + data.imgName + "'>" +
                        "                        </a>" +
                        "                    </div>");
                });
            }
        });
    });

    //选择背景
    $("#bgBtn").click(function () {
        $("#bg-modal").modal("show");
    });
    $("#bg-modal").on("shown.bs.modal", function () {
        $("#bg-panel").empty();
        $.ajax({
            type: "get",
            url: "/card/wx-card/get-card-bg",
            async: false,
            success: function (result) {
                var imgMapping = result.imgMapping;
                var cardImgs = result.cardImgs;
                $.each(cardImgs, function (index, data) {
                    $("#bg-panel").append("<div class='col-md-3'>" +
                        "                         <input type='hidden' class='bgImgId' value='" + data.id + "'> " +
                        "                         <a onclick='selectBg(\"" + data.id + "\",\"" + imgMapping + "\",\"" + data.uri + data.imgName + "\")'>" +
                        "                              <img style='height:120px;width: 200px;' src='" + imgMapping + data.uri + data.imgName + "'>" +
                        "                        </a>" +
                        "                    </div>");
                });
            }
        });
    });

    // 验证数据
    $("#btnSave").click(function () {
        var inventoryQuantity = $("#inventoryQuantity").val();//库存数量
        if (inventoryQuantity == null || inventoryQuantity == "") {
            errorAction("请输入库存数量", "#baseSetting", "#inventoryQuantity");
            return false;
        }
        if (!/^([1-9][0-9]{0,7}|100000000)$/.test(inventoryQuantity)) {
            errorAction("库存数量必须是1-100000000之间的整数", "#baseSetting", "#inventoryQuantity");
            return false;
        }
        if (dataValid()) {
            $("#btnSave").attr("disabled", true);
            Shade.blockUI($("#addBody"));
            $.post("/card/wx-card/wx-card-add", $("#wxAddForm").serialize(), function (data) {
                if (data.result == true) {
                    $("#btnSave").attr("disabled", false);
                    Shade.unblockUI($("#addBody"));
                    BootboxExt.alert("新增成功", function () {
                        location.href = "/card/wx-card/wx-card-search";
                    });
                } else {
                    BootboxExt.alert("新增失败", function () {
                        window.location.reload();
                    });
                }
            });
        }
    });

    // 验证数据
    $("#btnUpdate").click(function () {
        if (dataValid()) {
            $("#btnUpdate").attr("disabled", true);
            Shade.blockUI($("#updateBody"));
            $.post("/card/wx-card/wx-card-update", $("#wxUpdateForm").serialize(), function (data) {
                $("#btnUpdate").attr("disabled", false);
                Shade.unblockUI($("#updateBody"));
                if (data.result == true) {
                    BootboxExt.alert("更新成功", function () {
                        location.href = "/card/wx-card/wx-card-search";
                    });
                } else {
                    BootboxExt.alert("微信端未处理请求，更新失败", function () {
                        window.location.reload();
                    });
                }
            });
        }
    });

    //取消
    $("#btnBack").click(function () {
        window.location.href = "/card/wx-card/wx-card-search";
    });

    /*左侧展示效果*/
    //logo
    $("#logoDisplay").load(function () {
        if ($("#logoDisplay").attr("src") != "") {
            $("#logoImg").attr("src", $("#logoDisplay").attr("src"));
        } else {
            $("#logoImg").attr("src", "/images/card/logo_area.jpg");
        }
    });
    //背景
    $("#bgDisplay").load(function () {
        if ($("#bgDisplay").attr("src") != "") {
            $(".shop_panel").css("background-image", "url(" + $("#bgDisplay").attr("src") + ")");
        } else {
            $(".shop_panel").css("background-color", "rgb(85, 189, 71)");
        }
    });

    //卡券名称
    $("#title").change(function () {
        $("#js_title_preview").text($("#title").val());
    });

    //商户名称
    $("select#brandNameSelect").change(function () {
        $("#js_brand_name_preview").text($("select#brandNameSelect").val());
        $("#brandName").val($("select#brandNameSelect").val());
    });

    //营销方式
    $("#marketSettingSelect").change(function () {
        $("#js_custom_url_preview").text("");
        $(".quick_pay a").css("display", "none").text("");
        $(".quick_pay p").css("display", "none").text("");

        $("#marketSetting input").val("");

        var objSelected = "#marketSettingSelect option:selected";

        var activateUrl = $(objSelected).data("activateUrl".toLowerCase());
        $("#activateUrl").val(activateUrl);
        var balanceUrl = $(objSelected).data("balanceUrl".toLowerCase());
        $("#balanceUrl").val(balanceUrl);

        var centerUrl = $(objSelected).data("centerUrl".toLowerCase());
        $("#centerUrl").val(centerUrl);
        var centerUrlName = $(objSelected).data("centerUrlName".toLowerCase());
        $("#centerTitle").val(centerUrlName);
        var centerUrlSubTitle = $(objSelected).data("centerUrlSubTitle".toLowerCase());
        $("#centerSubTitle").val(centerUrlSubTitle);

        var customUrl = $(objSelected).data("customUrl".toLowerCase());
        $("#customUrl").val(customUrl);
        var customUrlName = $(objSelected).data("customUrlName".toLowerCase());
        $("#customUrlName").val(customUrlName);
        var customUrlSubTitle = $(objSelected).data("customUrlSubTitle".toLowerCase());
        $("#customUrlSubTitle").val(customUrlSubTitle);

        var customCellUrl = $(objSelected).data("customCellUrl".toLowerCase());
        $("#customCellUrl").val(customCellUrl);
        var customCellName = $(objSelected).data("customCellName".toLowerCase());
        $("#customCellName").val(customCellName);
        var customCellTips = $(objSelected).data("customCellTips".toLowerCase());
        $("#customCellTips").val(customCellTips);

        var promotionUrl = $(objSelected).data("promotionUrl".toLowerCase());
        $("#promotionUrl").val(promotionUrl);
        var promotionUrlName = $(objSelected).data("promotionUrlName".toLowerCase());
        $("#promotionUrlName").val(promotionUrlName);
        var promotionUrlSubTitle = $(objSelected).data("promotionUrlSubTitle".toLowerCase());
        $("#promotionUrlSubTitle").val(promotionUrlSubTitle);

        //左侧展示
        if (centerUrlName != undefined && centerUrlName != "") {
            $(".quick_pay a").css("display", "").text(centerUrlName);
        }
        if (centerUrlSubTitle != undefined && centerUrlSubTitle != "") {
            $(".quick_pay p").css("display", "").text(centerUrlSubTitle);
        }
        //入口一
        if (customUrlName != undefined && customUrlName != "") {
            var showHtml = '<li class="msg_card_section"><div class="li_panel"><div class="li_content"><p><span class="supply_area"><span class="js_custom_url_tips_pre">' + customUrlSubTitle + '</span><span class="ic ic_go"></span></span><span class="js_custom_url_name_pre">' + customUrlName + '</span></p></div></div></li>';
            $("#js_custom_url_preview").append(showHtml);
        }
        //入口二
        if (customCellName != undefined && customCellName != "") {
            var showHtml = '<li class="msg_card_section"><div class="li_panel"><div class="li_content"><p><span class="supply_area"><span class="js_custom_url_tips_pre">' + customCellTips + '</span><span class="ic ic_go"></span></span><span class="js_custom_url_name_pre">' + customCellName + '</span></p></div></div></li>';
            $("#js_custom_url_preview").append(showHtml);
        }
        //入口三
        if (promotionUrlName != undefined && promotionUrlName != "") {
            var showHtml = '<li class="msg_card_section"><div class="li_panel"><div class="li_content"><p><span class="supply_area"><span class="js_custom_url_tips_pre">' + promotionUrlSubTitle + '</span><span class="ic ic_go"></span></span><span class="js_custom_url_name_pre">' + promotionUrlName + '</span></p></div></div></li>';
            $("#js_custom_url_preview").append(showHtml);
        }

    });

    //商户名称修改按钮
    $("#brandNameEdit").click(function () {
        $("#brandNameEdit").parents(".frm_card_extend").find(".col-sm-4 select").css("display", "");
        $("#brandNameEdit").parents(".frm_card_extend").find(".col-sm-4 div").css("display", "");
        $(".select2-search input").css("display", "");
        $("input#brandName").css("display", "none");
        $("#brandNameEdit").parent().remove();
    });

    //营销方式修改按钮
    $("#activeUrlEdit").click(function () {
        $("#activeUrlEdit").parents(".frm_card_extend").find(".col-sm-4 select").removeAttr("disabled");
        $("#activeUrlEdit").parent().remove();
    });
});

function selectColor(name, value) {
    colorName = name;
    colorValue = value;
    var values = $("#color-panel").find("input.colorVal");
    $.each(values, function (index, obj) {
        var val = $(this).val();
        if (val == colorName) {
            $(this).parent().find("p").addClass("choosetab");
        } else {
            $(this).parent().find("p").removeClass("choosetab");
        }
    });
}

function getColorVal() {
    if (colorValue != "") {
        $("#color").val(colorName);
        $("#colorDisplay").css({"width": "200", "height": "120", "background-color": colorValue});
    }
    $("#color-modal").modal("hide");
}

function updateColorVal() {
    if (colorValue != "") {
        $("#color").val(colorName);
        $("#colorDisplay").css({"background-color": colorValue});
    }
    $("#color-modal").modal("hide");
}

function selectLogo(logoId, mapping, uri) {
    logoImgId = logoId;
    logoMapping = mapping;
    logoUri = uri;
    var values = $("#logo-panel").find("input.logoImgId");
    $.each(values, function (index, obj) {
        var val = $(this).val();
        if (val == logoImgId) {
            $(this).parent().find("img").addClass("choosetab");
        } else {
            $(this).parent().find("img").removeClass("choosetab");
        }
    });
}

function getLogoVal() {
    if (logoImgId != "") {
        $("#logoImgId").val(logoImgId);
        $("#logoDisplay").attr("src", logoMapping + logoUri);
        $("#logoDisplay").css({"width": "200", "height": "120"});
    }
    $("#logo-modal").modal("hide");
}

function updateLogoVal() {
    if (logoImgId != "") {
        $("#logoImgId").val(logoImgId);
        $("#logoDisplay").attr("src", logoMapping + logoUri);
    }
    $("#logo-modal").modal("hide");
}

function selectBg(bgId, mapping, uri) {
    bgImgId = bgId;
    bgMapping = mapping;
    bgUri = uri;
    var values = $("#bg-panel").find("input.bgImgId");
    $.each(values, function (index, obj) {
        var val = $(this).val();
        if (val == bgId) {
            $(this).parent().find("img").addClass("choosetab");
        } else {
            $(this).parent().find("img").removeClass("choosetab");
        }
    });
}

function getBgVal() {
    if (bgImgId != "") {
        $("#bgImgId").val(bgImgId);
        $("#bgDisplay").attr("src", bgMapping + bgUri);
        $("#bgDisplay").css({"width": "200", "height": "120"});
    }
    $("#bg-modal").modal("hide");
}

function updateBgVal() {
    if (bgImgId != "") {
        $("#bgImgId").val(bgImgId);
        $("#bgDisplay").attr("src", bgMapping + bgUri);
    }
    $("#bg-modal").modal("hide");
}

function getStrLength(str) {
    var strlen = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            strlen += 3;
        } else {
            strlen++;
        }
    }
    return strlen;
}

function dataValid() {
    var title = $("#title").val();               //卡券名称
    var quantity = $("#quantity").val();         //开卡数量
    var brandName = $("#brandName").val();       //商户名称
    var servicePhone = $("#servicePhone").val(); //客服电话
    var notice = $("#notice").val();             //卡券使用提醒
    var desn = $("#desn").val();                 //卡券说明
    var prerogative = $("#prerogative").val();   //会员卡特权说明
    var validDateStatus = $("input[name='validDateStatus']:checked").val();//期限类型
    var effDateBegin = $("#effDateBegin").val(); //开始日期
    var effDateEnd = $("#effDateEnd").val();     //结束日期
    var effectiveDays = $("#effectiveDays").val();//有效天数
    var color = $("#color").val();                //颜色
    var bgImgId = $("#bgImgId").val();            //背景
    var logoImgId = $("#logoImgId").val();        //logo
    var marketSetting = $("#marketSettingSelect").val();

    if (title == null || title == "") {
        errorAction("请输入卡券名称", "#baseSetting", "#title");
        return false;
    }
    if (getStrLength(title) > 27) {
        errorAction("卡券名称字数上限为9个汉字", "#baseSetting", "#title");
        return false;
    }
    if (quantity == null || quantity == "") {
        errorAction("请输入开卡数量", "#baseSetting", "#quantity");
        return false;
    }
    if (!/^([1-9][0-9]{0,4}|100000)$/.test(quantity)) {
        errorAction("开卡数量必须是1-100000之间的整数", "#baseSetting", "#quantity");
        return false;
    }
    if (brandName == null || brandName == "") {
        errorAction("请输入商户名称", "#baseSetting", "#brandName");
        return false;
    }
    if (getStrLength(brandName) > 36) {
        errorAction("商户名称字数上限为12个汉字", "#baseSetting", "#brandName");
        return false;
    }
    if (servicePhone == null || servicePhone == "") {
        errorAction("请输入客服电话!", "#baseSetting", "#servicePhone");
        return false;
    }

    if (!/^([1][3,4,5,7,8][0-9]{9}|[0,4,8][0-9]{2,3}-[0-9]{5,10}|[1-9]{1}[0-9]{5,8})$/.test(servicePhone)) {
        errorAction("请输入正确的客服电话", "#baseSetting", "#servicePhone");
        return false;
    }
    if (notice == null || notice == "") {
        errorAction("请输入卡券使用提醒", "#baseSetting", "#notice");
        return false;
    }
    if (getStrLength(notice) > 50) {
        errorAction("卡券使用提醒字数上限为16个汉字", "#baseSetting", "#notice");
        return false;
    }
    if (desn == null || desn == "") {
        errorAction("请输入卡券说明", "#baseSetting", "#desn");
        return false;
    }
    if (getStrLength(desn) > 3072) {
        errorAction("卡券说明字数上限为1072个汉字", "#baseSetting", "#desn");
        return false;
    }
    if (prerogative == null || prerogative == "") {
        errorAction("请输入会员卡特权说明!", "#baseSetting", "#prerogative");
        return false;
    }
    if (getStrLength(prerogative) > 3072) {
        errorAction("会员卡特权说明字数上限为1072个汉字", "#baseSetting", "#prerogative");
        return false;
    }
    if (validDateStatus == 2) {
        if (effDateBegin == null || effDateBegin == "") {
            tabAction("请选择开始时间", "#baseSetting");
            return false;
        }
        if (effDateEnd == null || effDateEnd == "") {
            tabAction("请选择结束时间", "#baseSetting");
            return false;
        }
    }
    if (validDateStatus == 3 && (effectiveDays == null || effectiveDays == "")) {
        errorAction("请输入有效天数", "#baseSetting", "#effectiveDays");
        return false;
    }
    if (effectiveDays != null && effectiveDays != "" && !/^[0-9]*[1-9][0-9]*$/.test(effectiveDays)) {
        errorAction("有效天数必须为正整数", "#baseSetting", "#effectiveDays");
        return false;
    }
    if (effectiveDays != null && effectiveDays > 10000) {
        errorAction("有效天数不能大于10000天", "#baseSetting", "#effectiveDays");
        return false;
    }
    if (color == null || color == "") {
        tabAction("请选择颜色", "#baseSetting");
        return false;
    }
    if (bgImgId == null || bgImgId == "") {
        tabAction("请选择背景", "#baseSetting");
        return false;
    }
    if (logoImgId == null || logoImgId == "") {
        tabAction("请选择LOGO", "#baseSetting");
        return false;
    }
    if (!$("#marketSettingSelect").attr("disabled")) {
        if (marketSetting == null || marketSetting == "") {
            errorAction("请选择营销方式", "#marketSetting", "#marketSettingSelect");
            return false;
        }
    }
    return true;
}

function errorAction(msg, tabShow, selector) {
    BootboxExt.alert(msg);
    $('#inputTab a[href=' + tabShow + ']').tab('show');
    $(selector).focus();
}

function tabAction(msg, tabShow) {
    BootboxExt.alert(msg);
    $('#inputTab a[href=' + tabShow + ']').tab('show');
}