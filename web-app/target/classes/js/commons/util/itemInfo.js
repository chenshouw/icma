/**
 * 将选录数据代码转换为名称
 */
var ItemInfo = function () {
    //保存code map集合---避免重复请求
    var codeMap = new Map();
    return {
        /**
         * 代码转换为名称
         * @param oSettings
         * @param value
         * @returns
         */
        getName: function (value, itemCode) {
            if (!codeMap.containsKey(itemCode)) {
                $.ajaxSettings.async = false;
                $.getJSON("/select/item/" + itemCode + ".txt", function (dataArr) {
                    codeMap.put(itemCode, dataArr);
                });
                $.ajaxSettings.async = true;
            }
            var data = codeMap.get(itemCode);
            var reValue = "";
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (value == data[i].C) {
                        reValue = data[i].N;
                        break;
                    }
                }
            }
            return reValue;
        }
    };
}();
/**
 * 数据字典代码转换为名称
 */
$(document).ready(function () {
    $(".item_code_to_name").each(function (index, element) {
        var name = ItemInfo.getName($(this).data("value"), $(this).data("category"));
        $(this).html(name);
    });
});