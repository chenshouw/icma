/**
 * 拓展验证方法---按需求自行添加验证
 * @author lijiguang
 * @date 2017年5月24日
 */
//字符最小长度验证（一个中文字符长度为3）
jQuery.validator.addMethod("stringMinLength", function (value, element, param) {
    var length = value.length;
    for (var i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) {
            length += 2;
        }
    }
    return this.optional(element) || (length >= param);
}, $.validator.format("长度不能小于{0}(一个中文字算3个字节)"));

//字符最大长度验证（一个中文字符长度为3）
jQuery.validator.addMethod("stringMaxLength", function (value, element, param) {
    var length = value.length;
    for (var i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) {
            length += 2;
        }
    }
    return this.optional(element) || (length <= param);
}, $.validator.format("长度不能大于{0}(一个中文字算3个字节)"));

//终端管理验证终端号专用！
jQuery.validator.addMethod("tidLength", function (value, element, param) {
    var length = value.length;
    return this.optional(element) || (length <= param);
}, $.validator.format("长度不能大于{0}位数字"));

//中文区间验证
jQuery.validator.addMethod("stringRangeLength", function (value, element, param) {
    var length = value.length;
    for (var i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) {
            length++;
        }
    }
    return this.optional(element) || ( length >= param[0] && length <= param[1] );
}, $.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));

//身份证号码验证 
jQuery.validator.addMethod("idcardno", function (value, element) {
    return this.optional(element) || isIdCardNo(value);
}, "请输入正确的身份证号码");

//字母数字
jQuery.validator.addMethod("alnum", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "只能包括英文字母和数字");

//数字
jQuery.validator.addMethod("onlynum", function (value, element) {
    return this.optional(element) || /^[0-9]+$/.test(value);
}, "只能包括数字");

//整数
jQuery.validator.addMethod("onlyinteger", function (value, element) {
    return this.optional(element) || /^(\-)?[0-9]+$/.test(value);
}, "只能包括整数");

//数字
jQuery.validator.addMethod("onlynumbesidezero", function (value, element) {
    return this.optional(element) || /^[1-9]\d*$/.test(value);
}, "只能包括除0开头的数字");

//除0以外的所有数字
jQuery.validator.addMethod("allnumbesidezero", function (value, element) {
    return this.optional(element) || /^(\-)?\d+(\.\d{1,2})?$/.test(value);
}, "金额必须是数字,精确到分");

//金额
jQuery.validator.addMethod("onlyamount", function (value, element, param) {
    return this.optional(element) || /^([1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/.test(value);
}, $.validator.format("金额必须是小于{0}位的正数,精确到分"));

//邮政编码验证
jQuery.validator.addMethod("zipCode", function (value, element) {
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确的邮政编码");

//汉字
jQuery.validator.addMethod("chcharacter", function (value, element) {
    var tel = /^[\u4e00-\u9fa5]+$/;
    return this.optional(element) || (tel.test(value));
}, "请输入汉字");

//字母
jQuery.validator.addMethod("character", function (value, element) {
    var reg = /^[A-Za-z]+$/;
    return this.optional(element) || (reg.test(value));
}, "请输入字母");

jQuery.validator.addMethod("newCharacter", function (value, element) {
    var reg = /^[A-Za-z:_\-]+$/;
    return this.optional(element) || (reg.test(value));
}, "请输入字母或者“-”，“:”，“_”符号");

jQuery.validator.addMethod("newCharacterNo", function (value, element) {
    var reg = /^[A-Za-z_\-]+$/;
    return this.optional(element) || (reg.test(value));
}, "请输入字母或者“-”，“_”符号");

//编码类
jQuery.validator.addMethod("newCharacterNo2", function (value, element) {
    var reg = /^(?![_\-]+$)[0-9A-Za-z_\-]+$/;
    return this.optional(element) || (reg.test(value));
}, "请输入数字、字母或者“-”，“_”符号");

jQuery.validator.addMethod("newNumberAndCharacter", function (value, element) {
    var reg = /^[0-9A-Za-z_\-]+$/;
    return this.optional(element) || (reg.test(value));
}, "请输入数字、字母或者“-”，“_”符号");

//小写字母
jQuery.validator.addMethod("lowerCharacter", function (value, element) {
    var reg = /^[a-z]+$/;
    return this.optional(element) || (reg.test(value));
}, "请输入小写字母");

//大写字母以及符号
jQuery.validator.addMethod("upperCharacter2", function (value, element) {
    var reg = /^[A-Z-]+$/;
    return this.optional(element) || (reg.test(value));
}, "请输入大写字母或者“-”符号");

//大写字母
jQuery.validator.addMethod("upperCharacter", function (value, element) {
    var reg = /^[A-Z]+$/;
    return this.optional(element) || (reg.test(value));
}, "请输入大写字母");

//字符验证
jQuery.validator.addMethod("string", function (value, element) {
//return this.optional(element) || /^[u0391-uFFE5w]+$/.test(value);
    return this.optional(element) || /^[\w|.|,|\-|+|\=|(|)|\u0391-\uFFE5]+$/.test(value);
}, "不允许包含特殊符号");

//手机号码验证
jQuery.validator.addMethod("mobile", function (value, element) {
    var length = value.length;
    return this.optional(element) || (length == 11 && /^(13|14|15|17|18)\d{9}$/.test(value));
}, "请输入正确的手机号码");

//电话号码验证
jQuery.validator.addMethod("phone", function (value, element) {
    var tel = /^\d{3,4}-?\d{7,9}$/g;
    return this.optional(element) || (tel.test(value));
}, "请输入正确的电话号码");

//电话号码或者手机号码
jQuery.validator.addMethod("mobilephone", function (value, element) {
//	var rege=/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
    var rege = /^\d{3,4}-?\d{7,9}$/g;
    var regx = /^(13|14|15|17|18)\d{9}$/;
    return this.optional(element) || rege.test(value) || regx.test(value);
}, "请输入正确的电话号码或手机号码");

//QQ
jQuery.validator.addMethod("qq", function (value, element) {
    var reg = /^[1-9]\d{4,9}$/;
    return this.optional(element) || reg.test(value);
}, "请输入正确的QQ号码");

//必须以特定字符串开头验证
jQuery.validator.addMethod("begin", function (value, element, param) {
    var begin = new RegExp("^" + param);
    return this.optional(element) || (begin.test(value));
}, $.validator.format("必须以 {0} 开头"));

//验证两次输入值是否不相同
jQuery.validator.addMethod("notEqualTo", function (value, element, param) {
    return value != $(param).val();
}, $.validator.format("两次输入不能相同"));

// 验证值不允许与特定值等于
jQuery.validator.addMethod("notEqual", function (value, element, param) {
    return value != param;
}, $.validator.format("输入值不允许为{0}"));

// 验证值必须大于特定值(不能等于)
jQuery.validator.addMethod("gt", function (value, element, param) {
    return value > param;
}, $.validator.format("输入值必须大于{0}"));

// 验证值必须大于特定值(不能等于)
jQuery.validator.addMethod("gteq", function (value, element, param) {
    return value >= param;
}, $.validator.format("金额不能为负数"));

//验证值必须小于特定值(不能等于)
jQuery.validator.addMethod("lt", function (value, element, param) {
    return value < param;
}, $.validator.format("输入值必须小于{0}"));

//验证值必须小于等于特定值
jQuery.validator.addMethod("lteq", function (value, element, param) {
    return value <= param;
}, $.validator.format("输入值必须小于{0}"));

//传真号码校验
jQuery.validator.addMethod("fax", function (value, element, param) {
    var fax = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    return this.optional(element) || (fax.test(value));
}, $.validator.format("请输入正确的传真号码"));

//联系电话校验
jQuery.validator.addMethod("tel", function (value, element, param) {
    var tel = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return this.optional(element) || (tel.test(value));
}, $.validator.format("请输入正确的联系电话"));

//邮箱号码校验
jQuery.validator.addMethod("email", function (value, element, param) {
    var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return this.optional(element) || (email.test(value));
}, $.validator.format("请输入正确的邮箱"));

//密码校验
jQuery.validator.addMethod("pwd", function (value, element) {
    var pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
    return this.optional(element) || (pwd.test(value));
}, $.validator.format("密码只能是6-21位字母和数字组成"));

$.validator.addMethod("blank", function (value, element, params) {
    var regular = /^(?:(?!\s).){2,}$/;
    return this.optional(element) || (regular.test(value));
}, $.validator.format("输入的字符中不能包含空格并且长度在2位以上"));

//身份证号码的验证规则
function isIdCardNo(num) {
    //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
    var len = num.length, re;
    if (len == 15)
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(X|x|\d{1})$/);
    else if (len == 18)
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(X|x|\d{1})$/);
    else {
        //alert("输入的数字位数不对。"); 
        return false;
    }
    var a = num.match(re);
    if (a != null) {
        if (len == 15) {
            var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        else {
            var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        if (!B) {
            //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
            return false;
        }
    }
    if (!re.test(num)) {
        //alert("身份证最后一位只能是数字和字母。");
        return false;
    }
    return true;
}

jQuery.validator.addMethod("aintAndZ", function (value, element) {
    var decimal =  	/^[1-9][0-9]*$/;
    return this.optional(element) || (decimal.test(value));
}, $.validator.format("请输入非0正整数"));