$("#tree_cl").jstree({
            "core" : {
                "themes" : {
                    "stripes" : true,
                },
                "animation": 0,
                'data': {
                    'url': function (node) {
                        return '/rights/org/getOrgTree/';
                    }
                }
            },
            "types" : {
                "default" : {
                    "icon" : "glyphicon glyphicon-flash"
                },
                "demo" : {
                    "icon" : "glyphicon glyphicon-ok"
                }
            },
            "plugins": ["contextmenu","types" ],
            "contextmenu": {
                "items": {
                    "create": null,
                    "rename": null,
                    "remove": null,
                    "新建子目录": {
                        "label": "新建子目录",
                        "action": function (data) {
                            var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                            $("#form_cl").show();
                            $("#parentOrgId").val(obj.id);
                            $("#orgOpratorType").val("create");
                        }
                    },
                    "修改目录": {
                        "label": "修改目录",
                        "action": function (data) {
                            var inst = jQuery.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            $("#form_cl").show();
                            $("#orgOpratorType").val("update");
                            getInfo(obj.id)
                        }
                    },
                    "删除目录": {
                        "label": "删除目录",
                        "action": function (data) {
                            var inst = jQuery.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            deleteOrg(obj.id);
                        }
                    },
                }
            }
        }).on('change.jstree', function (e,data) {
        }).bind("loaded.jstree", function (e, data) {

           var inst = data.instance;
           var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
           inst.select_node(obj);
    data.instance.open_all();
        });

        function getInfo(orgId){
            $.get("/rights/org/get", { orgId: orgId}, function (data)
            {
                if(data.result != null){
                    $("#orgId").val(orgId);
                    $("#orgCode").val(data.result.orgCode);
                    $("#orgName").val(data.result.orgName);
                    $("#parentOrgId").val(data.result.parentOrgId);
                    $("#orgShortName").val(data.result.orgShortName);
                    $("#sortNo").val(data.result.sortNo);
                    $("#orgType").val(data.result.orgType);
                }else{
                    BootboxExt.confirm("查询需修改的对象失败", function (res) {
                        window.location.reload();
                    });
                }
            }, "json");
        }

        function save() {
            $.post("/rights/org/save",
            $("#form_cl").serialize(),
            function(data){
                if(data.result == true){
                    BootboxExt.alert("保存成功",function(res){
                        location.href="/rights/org/search";
                    });
                }else{
                    BootboxExt.alert("保存失败",function(res){
                        window.location.reload();
                    });
                }
            })
        }

        function deleteOrg(orgId) {
            BootboxExt.confirm("确认删除吗？", function (res) {
                if (res) {
                    $.get("/rights/org/delete", { orgId: orgId}, function (data)
                    {
                        if(data.result == true){
                            BootboxExt.alert("删除成功", function (res) {
                                location.href = "/rights/org/search";
                            });
                        }else{
                            BootboxExt.alert("删除失败", function (res) {
                                window.location.reload();
                            });
                        }
                    }, "json");
                }
            });
        }

        /*
         * 新增
         */
        function addNew(){
            $("#form_cl").show();
            $("#parentOrgId").val(0);
            $("#orgOpratorType").val("create");
        }