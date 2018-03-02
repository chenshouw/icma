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

    $(".list-display").each(function () {
        var colorValue = $(this).find('#cardColor').val();
        $(this).find('#colorDisplay').css({"background-color": colorValue});
        var logoIdValue = $(this).find('#logoId').val();
        var bgIdValue = $(this).find('#bgId').val();
        var that = $(this);
        $.ajax({
            data: {logoImgId: logoIdValue, bgImgId: bgIdValue},
            dataType: 'json',
            type: "get",
            url: "/card/wx-card/get-img-url",
            success: function (data) {
                $(that).find('#logoDisplay').attr("src", data.logoUrl);
                $(that).find('#bgDisplay').attr("src", data.bgUrl);
            }
        });
    });

});

function cardInfoDel(id) {
    BootboxExt.confirm("确认删除吗？", function (res) {
        if (res) {
            $.get("/card/wx-card/wx-card-remove", {id: id}, function (data) {
                if (data.result == true) {
                    BootboxExt.confirm("删除成功", function (res) {
                        location.href = "/card/wx-card/wx-card-search";
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

function showDetail(id) {
    $("#id").val(id);
    $("#detail-modal").modal("show");
}
$(function () {
    $("#detail-modal").on("shown.bs.modal", function () {
        var id = $("#id").val();
        $.ajax({
            data: {id: id},
            dataType: 'json',
            type: "get",
            url: "/card/wx-card/get-card-detail",
            async: false,
            success: function (data) {
                $('#inputTab a[href="#baseSetting"]').tab('show');
                $("#detail_title").val(data.wxCardInfo.title);
                $("#detail_quantity").val(data.wxCardInfo.quantity);
                $("#detail_batchNo").val(data.wxCardInfo.batchNo);
                $("#detail_brandName").val(data.wxCardInfo.brandName);
                $("#detail_servicePhone").val(data.wxCardInfo.servicePhone);
                $("#detail_cardType").val(data.wxCardInfo.cardType);
                $("#detail_prerogative").val(data.wxCardInfo.prerogative);
                $("#detail_notice").val(data.wxCardInfo.notice);
                $("#detail_desn").val(data.wxCardInfo.desn);
                if (data.wxCardInfo.validDateStatus == 1) {
                    $("#detail_dateType").val("无限日期");
                    $("#effDate").hide();
                    $("#dateBegin").hide();
                    $("#dateEnd").hide();
                } else if (data.wxCardInfo.validDateStatus == 2) {
                    $("#detail_dateType").val("固定日期");
                    $("#effDate").hide();
                    $("#dateBegin").show();
                    $("#dateEnd").show();
                    $("#detail_dateBegin").val(data.effDateBegin);
                    $("#detail_dateEnd").val(data.effDateEnd);
                } else if (data.wxCardInfo.validDateStatus == 3) {
                    $("#detail_dateType").val("有效天数");
                    $("#effDate").show();
                    $("#dateBegin").hide();
                    $("#dateEnd").hide();
                    $("#detail_effDate").val(data.wxCardInfo.effectiveDays);
                }
                $("#detail_color").css({"background-color": data.colorValue});
                $("#detail_logo").attr("src", data.logoUrl);
                $("#detail_bg").attr("src", data.bgUrl);
                if (data.wxCardInfo.canGiveFriend == 0) {
                    $("#detail_giveFriend").val("不可以");
                } else if (data.wxCardInfo.validDateStatus == 1) {
                    $("#detail_giveFriend").val("可以");
                } else {
                    $("#detail_giveFriend").val("");
                }

                $("#detail_activateUrl").val(data.wxCardInfo.activateUrl);
                $("#detail_balanceUrl").val(data.wxCardInfo.balanceUrl);
                $("#detail_centerUrl").val(data.wxCardInfo.centerUrl);
                $("#detail_centerTitle").val(data.wxCardInfo.centerTitle);
                $("#detail_centerSubTitle").val(data.wxCardInfo.centerSubTitle);
                $("#detail_customUrl").val(data.wxCardInfo.customUrl);
                $("#detail_customUrlName").val(data.wxCardInfo.customUrlName);
                $("#detail_customUrlSubTitle").val(data.wxCardInfo.customUrlSubTitle);
                $("#detail_customCellUrl").val(data.wxCardInfo.customCellUrl);
                $("#detail_customCellName").val(data.wxCardInfo.customCellName);
                $("#detail_customCellTips").val(data.wxCardInfo.customCellTips);
                $("#detail_promotionUrl").val(data.wxCardInfo.promotionUrl);
                $("#detail_promotionUrlName").val(data.wxCardInfo.promotionUrlName);
                $("#detail_promotionUrlSubTitle").val(data.wxCardInfo.promotionUrlSubTitle);

            }
        });
    });

    var inputs = $("input");
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].onmouseover = function () {
            this.title = this.value;
        }
    }
});