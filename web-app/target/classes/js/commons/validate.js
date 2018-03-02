jQuery(document).ready(function () {
    $('form').validate({
        errorElement: 'span',
        wrapper: 'p',
        errorPlacement: function (error, element) {
            error.addClass('frm_msg fail').css("display", "block");
            error.appendTo(element.parents(".frm_control_group"));
            error.children('span').addClass('frm_msg_content').css("display", "inline");
        }
    });

    //为所有的必填项自动添加红星星
    $("input[required]").each(
        function (index, element) {
            $(element).parent("span").prev("label").prepend('<font color="#FF0000">*</font>');
        });
    $("select[required]").each(
        function (index, element) {
            $(element).parent("span").prev("label").prepend('<font color="#FF0000">*</font>');
        });


    //中文最大长度验证（一个中文字符长度为3）
    jQuery.validator.addMethod("cnMaxLength", function (value, element, param) {
        var length = getLen(value);
        return this.optional(element) || (length <= param);
    }, $.validator.format("最多只能输入{0}个中文"));
} );

function getLen(value){
    var length = value.length;
    for (var i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) {
            length += 2;
        }
    }
    return (parseInt(length/3) + (length%3 == 0?0:1));
}

