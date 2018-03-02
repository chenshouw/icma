jQuery(document).ready(function () {
    $("input[type='reset'],button[type='reset']").click(function (event) {
        var form = $(this).parents("form");
        if (form && form[0].hasAttribute("cleanAll")) {
            form.find("input[type!='redio'][type!='checkbox'][type!='submit'][type!='reset'][type!='button'],textarea,select").val("");
            form.find("input[type='checkbox'],input[type='redio']").removeAttr("checked");
            event.preventDefault();
        }
    })

    navibarScroll();
    confirmModal();


});
function showMask() {
    window.location.href="javascript:scrollTo(0,0);";
    document.body.setAttribute("scroll","no");
    var mask = document.getElementById("mask");
    if(mask!=null && mask!="undefined")
        mask.style.display = "block";
}
function hiddenMask() {
    document.body.removeAttribute("scroll")
    var mask = document.getElementById("mask");
    if(mask!=null && mask!="undefined")
        mask.style.display = "none";
}
function navibarScroll() {
    var breadcrumbItems = $(".page-breadcrumb > li");
    var sidebarItems = $("#sidebar a");
    var currentItem;
    for (var j = breadcrumbItems.length - 1; j >= 0; j--) {
        if ($(breadcrumbItems[j]).hasClass("btn-group")) continue;
        var found = false;
        for (i in sidebarItems) {

            if ($(sidebarItems[i]).text().trim() == $(breadcrumbItems[j]).text().trim()) {
                currentItem = sidebarItems[i];
                found = true;
                break;
            }
        }
        if (found) break;
    }
    if (currentItem != undefined) {
        var newActive = $(currentItem).parent();
        $('#sidebar li.active').removeClass('active');
        newActive.addClass('active').parents(' li').addClass('active open');
        newActive.parents("li").children("a").children("span.arrow").addClass("open");
    }
}

/**
 * 根据内容拼接正则
 * @param template 内容
 * @returns {string} 正则表达式
 */
function getRegex(template){
    if (template == "#{all}"){
        return /.*/g;
    }
    template = template.replace(/[\r\n]/g, "").replace(/([.|/|\\|\(|\)|\+|-|\[|\]])/g,"\\$1");
    var regIndex = "/^";
    var regEnd = "$/";
    var regExp = "";
    var ars = new Array();
    try {
        ars = template.split("#{");
    }catch(err){
        ars = new Array(template);
    }
    if(ars.length>1) {
        regExp = regIndex + ars[0] + ".{1," + ars[1];
    }else{
        regExp = regExp + regIndex + template
    }
    for(var i=2;i<ars.length;i++) {
        regExp = regExp + ".{1," + ars[i];
    }
    regExp = regExp + regEnd;
    return eval(regExp);
}

/**
 * 分页点击跳转函数。
 * 如果列表中有搜索条件表单,表单提交方式因采用get方式, 因为此函数通过url中的参数列表,在保持搜索条件不变时分页
 * @param index
 */
function pageNavi(index) {
    var path = window.location.pathname;
    var href = window.location.href;
    var _paramPairArray = href.indexOf("?") > 0 ? href.split("?")[1].split("&") : new Array();
    var paramPairArray = new Array();
    for (i in _paramPairArray) {
        if (_paramPairArray[i].match(/^index/) || _paramPairArray[i].match(/^size/)) {
            continue;
        }
        console.log(_paramPairArray[i]);
        paramPairArray.push(_paramPairArray[i]);
    }
    paramPairArray.push("index=" + index);
    window.location.href = path + "?" + (paramPairArray.join("&"));
}

jQuery.extend({
    stringify  : function stringify(obj) {
        if ("JSON" in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';

            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v + '"';
                    } else if (t == "object" && v !== null){
                        v = jQuery.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }

            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});

//rewrite default window function (alert)
window.alert = function (msg) {
    var html = $('<div class="modal fade" id="wide" tabindex="-1" role="basic" aria-hidden="true">'+
        '<div class="modal-dialog">'+
        '<div class="modal-content">'+
        '<div class="modal-body">'+msg+
        '</div>'+
        '<div class="modal-footer">'+
        '    <button type="button" class="btn default" data-dismiss="modal">确定</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>');
    $('body').append(html);
    html.modal('show');
    html.on("hidden.bs.modal",function (e) {
        html.remove();
    })
}

/**
 * 替换原生confirm函数，
 * @param title 标题
 * @param content 内容
 * @param _func 回调函数 callback=function(status){} 默认参数status为bool。
 */
confirm=function(title, content, _func){
    var html = $('<div class="modal fade" id="wide" tabindex="-1" role="basic" aria-hidden="false">'+
        '<div class="modal-dialog">'+
        '<div class="modal-content">'+
        '<div class="modal-header">'+
        title+
        '</div>'+
        '<div class="modal-body">'+content+
        '</div>'+
        '<div class="modal-footer">'+
        '    <button type="button" class="btn default confirm_modal_ok" data-dismiss="modal">确定</button>'+
        '    <button type="button" class="btn default confirm_modal_cancel" data-dismiss="modal">取消</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>');
    $('body').append(html);
    html.find(".confirm_modal_ok").click(function () {
        if (_func)
            _func(true);
        html.modal("hide");
    });
    html.find(".confirm_modal_cancel").click(function () {
        if (_func)
            _func(false);
        html.modal("hide");
    });
    html.modal('show');
    html.on("hidden.bs.modal",function (e) {
        html.remove();
    });
}



/**
 *  头部仓库列表的选中
 **/
    jQuery(document).ready(function(){
        jQuery('#myselect li> a').click(function(){
            var index = $(this).text().trim();
            var param = "currentWarehouseName=" + index;

            $.ajax({
                type: "get",
                url: "/currentWarehouse.html",
                data: param,
                async: false,
                success: function (result) {
                    history.go(0)
                }
            });
            return false;
        });
    });
    /**
     *  获取当前时间
     **/
    
    