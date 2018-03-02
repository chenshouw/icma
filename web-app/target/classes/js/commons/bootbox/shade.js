/**
 * 界面遮罩
 */
var Shade = function () {
    return {
        blockUI: function (el, centerY) {
            var el = jQuery(el);
            if (el.height() <= 400) {
                centerY = true;
            }
            el.block({
                message: '<span style="font-size: 16px;">处理中,请稍待……</span>',
                //message: '<img src="/metronic/img/ajax-loading.gif" align="">',
                centerY: centerY !== undefined ? centerY : true,
                css: {
                    top: '10%',
                    border: 'none',
                    padding: '2px',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: 'gray',
                    opacity: 0.5,
                    cursor: 'wait'
                }
            });
            //弹出框中提交遮罩的z-index要大于10051，因为弹出框的z-index:10050
            $('.blockOverlay').css('z-index', 10051);
            $('.blockMsg ').css('z-index', 10062);
        },
        unblockUI: function (el) {
            jQuery(el).unblock({
                onUnblock: function () {
                    jQuery(el).removeAttr("style");
                }
            });
        }
    };
}();