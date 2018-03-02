/*
* 本文件用于物料的解锁/锁定页面,更新时须检查此页面是否出现不通用情况 .
* */
/**
 <div id="confirm_modal" class="modal fade" tabindex="-1" data-width="400">
 <div class="modal-dialog">
 <div class="modal-content">
 <div class="modal-header">
 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
 <h4 class="modal-title">操作提示</h4>
 </div>
 <div class="modal-body">
 <p id="confirm_modal_message">此操作不可逆,确定继续执行吗?</p>
 </div>
 <div class="modal-footer">
 <button id="confirm_cancel" type="button" data-dismiss="modal" class="btn default">取消</button>
 <button id="confirm_continue" type="button" data-dismiss="modal" class="btn green">继续</button>
 </div>
 </div>
 </div>
 </div>
 <div id="operation_result" class="modal fade" tabindex="-1">
 <div class="modal-dialog">
 <div class="modal-content">
 <div class="modal-header">
 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
 <h4 class="modal-title">结果提示</h4>
 </div>
 <div class="modal-body">
 <p id="confirm_modal_message">操作完成!</p>
 </div>
 <div class="modal-footer">
 <button type="button" data-dismiss="modal" class="btn default">知道了</button>
 </div>
 </div>
 </div>
 </div>
 */
/**
 * 用此方法请仔细阅读以下细则
 * 1.需要在页面或者导入文件中载有 弹出的model节点, 如上注释处.
 * 2.应使用a标签访问此方法,在class中加入delete_btn样式
 * @data-content 提示文字,默认值参考上注释处.
 * @href 可访问完整(或相对)链接URL
 * @methods 访问方式: 默认直接GET访问,当设置该参数为ajax时以ajax方式访问URL, 以下是ajax的使用方式介绍
 * @property ajax请求完成后需要变动的属性, 仅支持两种变动 如:锁定(lock),解锁(unlock), 当只有1个参数时, 将替换原来a标签的html内容
 * @class ajax请求完需要改动a标签内的样式可以如上在文字后以括号加入样式对应的字符串
 * @color ajax更换颜色只支持 暗黑和绿色 两种
 * (
 *  需注意: 前1个css不应包含后1个, 如:解锁(unlock),锁定(lock) 是错误的
 *  )
 */
function confirmModal() {
    var confirm_a = null;
    var confirm_href = null;

    //JS confirm_modal 不可逆操作提示
    $(".delete_btn").click(function(){
        $('#confirm_modal').modal('show');
        var content = $(this).attr("data-content");
        $('#confirm_modal_message').html(content);
        confirm_a = $(this);
        confirm_href = confirm_a.attr("href");
        confirm_a.removeAttr("href")
    });
    $("#confirm_continue").click(function(){
        var method = confirm_a.attr("methods");
        var properties = confirm_a.attr("property");
        var lass = confirm_a.attr("class");
        if (method != undefined && method != null && method != "" && method == "ajax") {
            try {
                var arrs = properties!=undefined?properties.split(","):new Array;//文字
                var arr = new Array;//文字
                var rra = new Array;//图标
                toAjax(confirm_a, arrs, arr, rra, confirm_href, lass);
                return;
            }catch (e){
                alert("ajax请求处理失败!");
            }
        }
        window.location.href=confirm_href;
    });
    $("#confirm_cancel").click(function(){
        confirm_a.attr("href", confirm_href);
    });
};

/**
 * ajax请求
 * @param confirm_a A标签
 * @param arrs //property参数内容
 * @param arr //文字内容
 * @param rra //样式内容
 * @param confirm_href // A标签href链接
 * @param lass //A标签内的(html)class样式
 */
function toAjax(confirm_a,arrs,arr,rra,confirm_href,lass){
    var content = confirm_a.attr("message");
    if(arrs!=undefined && arrs.length>1) {
        arr[0] = arrs[0].split("(")[0];
        arr[1] = arrs[1].split("(")[0];
        var sts1 = arrs[0].split("(");
        var sts2 = arrs[1].split("(");
        if (sts1.length > 1 && sts2.length > 1) {
            rra[0] = sts1[1].split(")")[0];
            rra[1] = sts2[1].split(")")[0];
        }
    }
    $.ajax({
        url: confirm_href,
        async: false,
        success: function(data) {
            if (data == 1) {

                var html = confirm_a.context.innerHTML;

                if (lass.indexOf("dark")!=-1) {
                    lass = lass.replace("dark", "green");
                } else if (lass.indexOf("green")!=-1) {
                    lass = lass.replace("green", "dark");
                }
                confirm_a.attr("class",lass);
                if (arrs.length == 1) {
                    confirm_a.context.innerHTML = arrs[0];
                    //alert(arrs[0]);
                } else if(arrs.length>1) {
                    if(arr.length>1) {
                        if (html.indexOf(arr[0]) != -1) {
                            html = html.replace(arr[0], arr[1]);
                        } else if (html.indexOf(arr[1]) != -1) {
                            html = html.replace(arr[1], arr[0]);
                        }
                    }
                    if(rra.length>1) {
                        if (html.indexOf(rra[1]) != -1) {
                            html = html.replace(rra[1], rra[0]);
                        } else if (html.indexOf(rra[0]) != -1) {
                            html = html.replace(rra[0], rra[1]);
                        }
                    }
                    confirm_a.context.innerHTML = html;
                }
                if(content!=undefined && content.length>0){
                    $('#operation_result_message').html(content);
                    $("#operation_result").modal('show');
                }
            } else {
                if(content!=undefined && content.length>0){
                    $('#operation_result_message').html(content);
                    $("#operation_result").modal('show');
                }else if (data == 0) {
                    alert("操作失败");
                    //confirm_a.context.innerHTML = '状态不符合锁定/解锁条件';
                } else if (data == 2) {
                    alert("操作失败: 服务器错误");
                    //confirm_a.context.innerHTML = '锁定/解锁时遇到服务器错误';
                }
            }
        },
        error: function (){
            alert("服务器错误,请联系管理员");
        }
    });
    confirm_a.attr("href", confirm_href);
}