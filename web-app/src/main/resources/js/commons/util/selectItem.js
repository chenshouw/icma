/**
 一、下拉标签使用说明
 1)、标签说明
 1、使用select标签
 2)、属性说明
 1、data-type:data-type='select',固定写法,表示此标签为自定义生成下拉标签
 2、id:标签的唯一标识
 3、name:标签的属性字段名称（获取数据用）
 4、data-first:是否显示默认的“请选择”(true:显示，false:不显示，默认值：true)
 5、data-first-text:当data-first为true时显示下拉框第一项的名称，默认为“请选择”（如：data-first-text='所有'）
 6、data-first-value:当data-first为true是显示下拉框第一项的值，默认为""（如：data-first-value='all'）
 7、data-disabled:下拉框是否禁用，默认为false可用（true:不可用，false:可用）
 8、data-category:获取生成下拉框在表t_item_info中category的值（如：data-category='CARED'，注意:省=AREAP，市、区=AREAC）
 9、data-supper-code:过滤上级编码在此值内的数据(in),多个时用英文逗号隔开（如：data-supper-code='31,42'）,注意：不要与data-not-supper-code属性混用，只能两者选其一
 10、data-not-supper-code:过滤上级编码不在此值内的数据(not in),多个用英文逗号隔开（如：data-not-supper-code='82,85'），注意不要与data-supper-code属性混用，只能两者选其一
 11、data-status:过滤状态在此值内的所有数据（in）,多个时英文逗号隔开（如：data-status='1,2'）,注意：不要与data-not-status属性混用，只能两者选其一
 12、data-not-status：过滤状态不在此值内的所有数据（not in），多个时用英文逗号隔开（如：data-not-status='1,2'）,注意：不要与data-status属性混用，只能两者选其一
 13、data-value：默认值code匹配，如（data-value='31'，默认选中广东）,注意：不要与data-name属性混用，如果两者混用，只匹配data-value
 14、data-name：默认值name匹配，如（data-name='上海',默认选中上海）,注意：不要与data-value属性混用，如果两者混用，只匹配data-value
 15、data-pid:需要关联的父标签的id值，子标签的数据通过父标签的value值联动获取（如：父标签<select id='areap' data-type='select' data-category='AREAP' \>,
 子标签<select id='areac' data-type='select' data-pid='areap' data-category='AREAC' \>）。
 注意：如果子标签未写data-category属性，则默认使用父标签的data-category属性值。
 */
var SelectItem = function () {
    var changeFunMap = new Map();
    return {
        getType: function (thisObj, category, supperCodeStr, sFlag, statusStr, zFlag, callback) {
            var supperCodeArr = null;
            var statusArr = null;
            //只传递一个参数
            if (typeof supperCodeStr === "function") {
                SelectItem.loadData(thisObj, category, null, null, null, null, supperCodeStr);
                return;
            }
            //传递2个参数
            if (typeof sFlag === "function") {
                if (supperCodeStr != null) {
                    supperCodeArr = supperCodeStr.split(',');
                }
                SelectItem.loadData(thisObj, category, supperCodeArr, "==", null, null, sFlag);
                return;
            }
            //传递3个参数
            if (typeof statusStr === "function") {
                if (supperCodeStr != null) {
                    supperCodeArr = supperCodeStr.split(',');
                }
                if (sFlag == "==" || sFlag == "!=") {
                    SelectItem.loadData(thisObj, category, supperCodeArr, sFlag, null, null, statusStr);
                } else {
                    if (sFlag != null) {
                        statusArr = sFlag.split(',');
                    }
                    SelectItem.loadData(thisObj, category, supperCodeArr, "==", statusArr, "==", statusStr);
                }
                return;
            }
            //传递4个参
            if (typeof zFlag === "function") {
                if (supperCodeStr != null) {
                    supperCodeArr = supperCodeStr.split(',');
                }
                if (sFlag == "==" || sFlag == "!=") {
                    if (statusStr != null) {
                        statusArr = statusStr.split(',');
                    }
                    SelectItem.loadData(thisObj, category, supperCodeArr, sFlag, statusArr, "==", zFlag);
                } else {
                    if (sFlag != null) {
                        statusArr = sFlag.split(',');
                    }
                    //alert(statusStr);
                    SelectItem.loadData(thisObj, category, supperCodeArr, "==", statusArr, statusStr, zFlag);
                }
                return;
            }
            //5个参数
            if (typeof callback === "function") {
                if (supperCodeStr != null) {
                    supperCodeArr = supperCodeStr.split(',');
                }
                if (statusStr != null) {
                    statusArr = statusStr.split(',');
                }
                SelectItem.loadData(thisObj, category, supperCodeArr, sFlag, statusArr, zFlag, callback);
                return;
            }

            if (typeof callback !== "function") {
                throw new Error(callback + " is not a Function Object!");
            }
        },
        /**
         *将category字段为参数category
         *supper_Code字段为参数supperCode
         *数据字典加载到页面
         */
        loadData: function (thisObj, category, supperCodeArr, sFlag, statusArr, zFlag, callback) {
            if (typeof callback !== "function") {
                throw new Error(callback + " is not a Function Object!");
                return;
            }
            var reData = new Object();
            reData.obj = thisObj;
            //编码有效
            if (category) {
                var arr = new Array();
                //加载json文件解析为json对象
                $.getJSON("/select/item/" + category + ".txt", function (data) {
                    var arr = new Array();
                    for (var i = 0; i < data.length; i++) {
                        var obj = new Object();
                        obj.name = data[i].N;
                        obj.code = data[i].C;
                        //父节点编码
                        if (data[i].S) {
                            obj.supperCode = data[i].S;
                        } else {
                            obj.supperCode = '';
                        }
                        //状态
                        if (data[i].Z) {
                            obj.status = data[i].Z;
                        } else {
                            obj.status = '';
                        }

                        //过滤上级编码（上级编码数组有值）
                        if (supperCodeArr != null && supperCodeArr.length > 0) {
                            //过滤规则为相等时
                            if (sFlag == "==") {
                                for (var j = 0; j < supperCodeArr.length; j++) {
                                    if (obj.supperCode == supperCodeArr[j]) {
                                        //过滤状态条件（状态条件数组有值）
                                        if (statusArr != null && statusArr.length > 0) {
                                            //过滤状态条件运算规则为相等时
                                            if (zFlag == "==") {
                                                for (var k = 0; k < statusArr.length; k++) {
                                                    if (obj.status == statusArr[k]) {
                                                        arr.push(obj);
                                                        break;
                                                    }
                                                }
                                                //过滤状态条件运算条件为不等时
                                            } else if (zFlag == "!=") {
                                                var reFlag = true;
                                                for (var k = 0; k < statusArr.length; k++) {
                                                    if (obj.status == statusArr[k]) {
                                                        reFlag = false;
                                                        break;
                                                    }
                                                }
                                                if (reFlag) {
                                                    arr.push(obj);
                                                }
                                            }
                                        } else {
                                            arr.push(obj);//不需要过滤状态条件时
                                        }
                                        break;
                                    }
                                }
                            } else if (sFlag == "!=") {  //过滤规则为不相等时
                                var reFlag = true;
                                for (var j = 0; j < supperCodeArr.length; j++) {
                                    if (obj.supperCode == supperCodeArr[j]) {
                                        reFlag = false;
                                        break;
                                    }
                                }
                                if (reFlag) {
                                    //过滤状态
                                    if (statusArr != null && statusArr.length > 0) {
                                        if (zFlag == "==") {
                                            for (var k = 0; k < statusArr.length; k++) {
                                                if (obj.status == statusArr[k]) {
                                                    arr.push(obj);
                                                    break;
                                                }
                                            }
                                        } else if (zFlag == "!=") {
                                            var reFlag = true;
                                            for (var k = 0; k < statusArr.length; k++) {
                                                if (obj.status == statusArr[k]) {
                                                    reFlag = false;
                                                    break;
                                                }
                                            }
                                            if (reFlag) {
                                                arr.push(obj);
                                            }
                                        }
                                    } else {
                                        arr.push(obj);
                                    }
                                }
                            }
                            //不需要过滤上级编码时,过滤状态
                        } else {
                            if (statusArr != null && statusArr.length > 0) {
                                if (zFlag == "==") {
                                    for (var j = 0; j < statusArr.length; j++) {
                                        if (obj.status == statusArr[j]) {
                                            arr.push(obj);
                                            break;
                                        }
                                    }
                                } else if (zFlag == "!=") {
                                    var reFlag = true;
                                    for (var j = 0; j < statusArr.length; j++) {
                                        if (obj.status == statusArr[j]) {
                                            reFlag = false;
                                            break;
                                        }
                                    }
                                    if (reFlag) {
                                        arr.push(obj);
                                    }
                                }
                            } else {
                                arr.push(obj);//上级编码和状态都不需要过滤时
                            }

                        }
                    }
                    //alert($.toJSON(arr));
                    reData.arr = arr;
                    callback.call(this, reData);
                });
            } else {
                //编码无效直接返回空数组
                callback.call(this, reData.arr = new Array());
            }
        },
        /**
         * 通过标签中的属性过滤条件获取需要的数据（只过滤上级编码和状态两个字段）
         */
        init: function (obj) {
            var code = obj.data('category');	//类型
            var status = obj.data('status');	//状态（取==）
            var scode = obj.data('supperCode');	//上级编码（取==）
            var nStatus = obj.data('notStatus');//状态（取!=）
            var nScode = obj.data('notSupperCode');//上级编码（取!=）
            var glCode = '';
            if (code && code != null) {
                //alert(obj.data('c'));
                if (scode != undefined && status != undefined) {	//两个都等于时
//					glCode = 1+",过滤上级编码in："+scode+",状态in："+status;
                    SelectItem.getType(obj, code.toString(), scode.toString(), status.toString(), function (data) {
                        SelectItem.initData(data);
                    });
                } else if (nScode != undefined && nStatus != undefined) {//两个都不等于时
//					glCode = 2+",过滤上级编码not in："+nScode+",状态not in："+nStatus;
                    SelectItem.getType(obj, code.toString(), nScode.toString(), '!=', nStatus.toString(), '!=', function (data) {
                        SelectItem.initData(data);
                    });
                } else if (scode != undefined && nStatus != undefined) {//上级编码等于 状态不等于
//					glCode = 3+",过滤上级编码in："+scode+",状态not in："+nStatus;
                    SelectItem.getType(obj, code.toString(), scode.toString(), nStatus.toString(), '!=', function (data) {
                        SelectItem.initData(data);
                    });
                } else if (nScode != undefined && status != undefined) {//上级编码不等于 状态等于
//					glCode = 4+",过滤上级编码not in："+nScode+",状态in："+status;
                    SelectItem.getType(obj, code.toString(), nScode.toString(), '!=', status.toString(), function (data) {
                        SelectItem.initData(data);
                    });
                } else if (nScode != undefined && status == undefined && nStatus == undefined) { //只上级不等于
//					glCode = 5+",只过滤上级编码not in："+nScode;
                    SelectItem.getType(obj, code.toString(), nScode.toString(), '!=', function (data) {
                        SelectItem.initData(data);
                    });
                } else if (scode != undefined && status == undefined && nStatus == undefined) {//只上级等于
//					glCode = 6+",只过滤上级编码in："+scode;
                    SelectItem.getType(obj, code.toString(), scode.toString(), function (data) {
                        SelectItem.initData(data);
                    });
                } else if (nScode == undefined && scode == undefined && status != undefined) {//只状态等于
//					glCode = 7+",只过状态in："+status;
                    SelectItem.getType(obj, code.toString(), null, status.toString(), function (data) {
                        SelectItem.initData(data);
                    });
                } else if (nScode == undefined && scode == undefined && nStatus != undefined) {//只状态不等于
//					glCode = 8+",只过状态not in："+nStatus;
                    SelectItem.getType(obj, code.toString(), null, nStatus.toString(), '!=', function (data) {
                        SelectItem.initData(data);
                    });
                } else {//不过滤上级编码和状态
//					glCode = 9+",只过滤类型："+code;
                    SelectItem.getType(obj, code.toString(), function (data) {
                        SelectItem.initData(data);
                    });
                }
//				console.log('过滤代号：'+glCode);
            }
        },
        /**
         * 数据处理 data
         * data.obj 数据对象
         * data.arr 数据集合
         */
        initData: function (data) {
            var result = new Array;
            var selected = data.obj.data("first");
            //是否显示“第一项” false为不显示（默认为true）
            if (selected != false) {
                var d = new Object;
                d.name = '请选择';
                d.code = '';
                if (data.obj.data("firstText")) {
                    d.name = data.obj.data("firstText");
                }
                if (data.obj.data("firstValue")) {
                    d.code = data.obj.data("firstValue");
                }
                //设置为选中状态
                d.selected = true;
                result.push(d);
            }
            var vValue = data.obj.data('value');	//默认值
            var vName = data.obj.data('name');
            data.obj.data('index', -1);
            if (data.arr != null && data.arr.length > 0) {
                for (var i = 0; i < data.arr.length; i++) {
                    //如果有传入值，则将配置此值的下拉为选中，并记录选中的数据下标供与它关联的下拉框使用(data-value与data-name同时使用时data-name将无效)
                    if (vValue !== undefined && vValue !== '') {
                        if (data.arr[i].code == vValue) {
                            data.arr[i].selected = true;
                            data.obj.data('index', i);
                        }
                    } else if (vName !== undefined && vName !== '') {
                        if (data.arr[i].name == vName) {
                            data.arr[i].selected = true;
                            data.obj.data('index', i);
                        }
                    } else {
                        //如果没有"第一项"则默认选中获取数据的第一个
                        if (selected == false && i == 0) {
                            data.arr[i].selected = true;
                            data.obj.data('index', i);
                        }
                    }
                    result.push(data.arr[i]);
                }
            }
            SelectItem.createSelect(result, data.obj);
        },
        /**
         * 填充下拉选择框数据并在页面进行展现
         */
        createSelect: function (result, thisObj) {
            var thisObjId = thisObj.attr("id");
            var childrenObjArr = $("select[data-type='select'][data-pid=" + thisObjId + "]");
            //判断下拉菜单是否可用，默认可用
            if (thisObj.data('disabled')) {
                thisObj.attr("disabled", true);
            }
            //判断是否有关联的子下拉框（有-生成关联关系，无-直接生成下拉框即可）
            if (childrenObjArr && childrenObjArr.length > 0) {
                thisObj.empty();
                $.each(result, function (i, item) {
                    //生成下拉列表
                    thisObj.append($("<option></option>").val(item["code"]).text(item["name"]));
                    //设置为选中
                    if (item["selected"]) {
                        thisObj.val(item["code"]);
                    }
                });
                thisObj.trigger("change");
                if (!changeFunMap.containsKey(thisObj.attr('id'))) {
                    thisObj.change(function (e, text) {
                        //父下拉框改变时，关联出子下拉框数据
                        for (var k = 0; k < childrenObjArr.length; k++) {
                            var childrenObj = $("select[data-type='select'][data-pid=" + thisObjId + "]").eq(k);
                            SelectItem.loadChildrenFun($(this).val(), thisObj, childrenObj);
                        }
                    });
                    changeFunMap.put(thisObj.attr('id'), true);
                }
                //初始化子下拉框的数据
                for (var i = 0; i < childrenObjArr.length; i++) {
                    SelectItem.clearData($("select[data-type='select'][data-pid=" + thisObjId + "]").eq(i));
                    var index = thisObj.data('index');
                    if ((thisObj.data('first') == false || index > -1) && result.length > 0) {
                        if (thisObj.data('first') != false) {
                            index = parseInt(index) + 1;
                        } else {
                            if (index == undefined) {
                                return;
                            }
                        }
                        SelectItem.loadChildrenFun(result[index].code, thisObj, $("select[data-type='select'][data-pid=" + thisObjId + "]").eq(i));
                    }
                }

            } else {
                thisObj.empty();
                $.each(result, function (i, item) {
                    //生成下拉列表
                    thisObj.append($("<option></option>").val(item["code"]).text(item["name"]));
                    //设置为选中
                    if (item["selected"]) {
                        thisObj.val(item["code"]);
                    }
                });
                thisObj.trigger("change");
            }
        },
        /**
         * 清空下拉列表的数据（递归清除所有关联下级下拉框）
         */
        clearData: function (thisObj) {
            var result = new Array();
            //是否自定义第一项（显示第一项）
            if (thisObj.data('first') != false) {
                var d = new Object();
                d.name = '请选择';
                d.code = '';
                if (thisObj.data("firstText")) {
                    d.name = thisObj.data("firstText");
                }
                if (thisObj.data("firstValue")) {
                    d.code = thisObj.data("firstValue");
                }
                result.push(d);
            }
            //判断下拉菜单是否可用，默认可用
            if (thisObj.data('disabled')) {
                thisObj.attr("disabled", true);
            }
            thisObj.empty();
            $.each(result, function (i, item) {
                //生成下拉列表
                thisObj.append($("<option></option>").val(item["code"]).text(item["name"]));
                //设置为选中
                if (item["selected"]) {
                    thisObj.val(item["code"]);
                }
            });
            var thisObjId = thisObj.attr("id");
            var childrenObj = $("select[data-type='select'][data-pid=" + thisObjId + "]");
            //获取关联子下拉框，清除（递归）
            if (childrenObj && childrenObj.length > 0) {
                for (var i = 0; i < childrenObj.length; i++) {
                    SelectItem.clearData($("select[data-type='select'][data-pid=" + thisObjId + "]").eq(i));
                }
            }
        },
        /**
         * 获取关联标签的值（加载关联标签）
         */
        loadChildrenFun: function (code, pObj, thisObj) {
            thisObj.data('supperCode', code);
            if (!thisObj.data("category")) {
                thisObj.data("category", pObj.data("category"));
            }
            SelectItem.init(thisObj);
        },
        /**
         * 重置
         */
        initTk: function (tkId) {
            var selectArray = tkId.find("select[data-type='select']");
            for (var j = 0; j < selectArray.length; j++) {
                var obj = tkId.find("select[data-type='select']").eq(j);
                var dataId = obj.data("pid");
                if (!dataId && obj.data('category') != undefined) {	//如果有关联则不初始化（因为父标签加载时已经进行递归初始化了）
                    SelectItem.init(obj);
                }
            }
        }
    };
}();
/**
 * 页面初始化完成后，初始化加载需要的下拉标签数据
 */
$(document).ready(function () {
    var boxSelectArray = $(" .box-select select[data-type='select']");
    if (boxSelectArray.length > 0) {//解决主页面和二级弹框中有data-type='select'时，点击弹框时，其主页面重新加载select问题
        for (var j = 0; j < boxSelectArray.length; j++) {
            var obj = $(" .box-select select[data-type='select']").eq(j);
            var dataId = obj.data("pid");
            if (!dataId && obj.data('category') != undefined) {	//如果有关联则不初始化（因为父标签加载时已经进行递归初始化了）
                SelectItem.init(obj);
            }
        }
    } else {
        var selectArray = $("select[data-type='select']");
        for (var j = 0; j < selectArray.length; j++) {
            var obj = $("select[data-type='select']").eq(j);
            var dataId = obj.data("pid");
            if (!dataId && obj.data('category') != undefined) {	//如果有关联则不初始化（因为父标签加载时已经进行递归初始化了）
                SelectItem.init(obj);
            }
        }
    }
});

