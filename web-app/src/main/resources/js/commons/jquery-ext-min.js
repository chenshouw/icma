/**
 * 异步请求后台报错
 * ajax未定义error方法
 * 将执行以下js代码
 * 弹出提示。
 * @author lijiguang 2017年11月3日
 */
$(function () {
    $.ajaxSetup({
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("jqXHR:" + jqXHR);
            console.log("textStatus:" + textStatus);
            console.log("errorThrown:" + errorThrown);
            var errorJson = jQuery.parseJSON(jqXHR.responseText);
            //提示内容
            var alertText = "<div class='row'>" +
                "<div class='col-md-12 page-500'>" +
                "<div class='number'>" + errorJson.code + "</div>" +
                "<div class='details'>" +
                "<h3>" + errorJson.msg + "</h3>" +
                "<p>" +
                "我们将关注此问题并尽快处理。<br/>" +
                "给你带来不便，敬请谅解。<br/>" +
                "如有疑问，请联系管理员。<br/>" +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";
            //隐藏遮罩
            //$(".blockUI").hide(500);
            //Shade.unblockUI($("body"));
            $.unblockUI();
            // $("#btnUpdate").attr("disabled", false);
            switch (jqXHR.status) {
                case(500):
                    BootboxExt.alert(alertText);
                    break;
                case(401):
                    BootboxExt.alert("未登录");
                    break;
                case(403):
                    BootboxExt.alert("无权限执行此操作");
                    break;
                case(408):
                    BootboxExt.alert("请求超时");
                    break;
                default:
                    BootboxExt.alert("未知错误");
            }
        }
    });
});