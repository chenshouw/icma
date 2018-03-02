var FormComponents = function () {

    var handleMultiSelect = function () {

        $('#my_multi_select3').multiSelect({
            selectableHeader: "<br><p>可选成员</p><input type='text' class='form-control search-input' autocomplete='off' placeholder='search...'>",
            selectionHeader: "<br><p>已选成员</p><input type='text' class='form-control search-input' autocomplete='off' placeholder='search...'>",
            afterInit: function (ms) {
                var that = this,
                    $selectableSearch = that.$selectableUl.prev(),
                    $selectionSearch = that.$selectionUl.prev(),
                    selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                    selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

                that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                    .on('keydown', function (e) {
                        if (e.which === 40) {
                            that.$selectableUl.focus();
                            return false;
                        }
                    });

                that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                    .on('keydown', function (e) {
                        if (e.which == 40) {
                            that.$selectionUl.focus();
                            return false;
                        }
                    });
            },
            afterSelect: function () {
                this.qs1.cache();
                this.qs2.cache();
            },
            afterDeselect: function () {
                this.qs1.cache();
                this.qs2.cache();
            }
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            handleMultiSelect();

        }
    };

}();


var addForm = $('form');
addForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        name: {
            required: true,
            maxlength: 50
        },
        description: {
            maxlength: 500
        }
    },
    highlight: function (element) {
        $(element)
            .closest('.form-group').addClass('has-error');
    },

    unhighlight: function (element) {
        $(element)
            .closest('.form-group').removeClass('has-error');
    },

    success: function (label) {
        label
            .closest('.form-group').removeClass('has-error');
    }
});


$(function () {
    //选择所有手机号的单击事件
    $("#addAll").click(function () {
        $('#my_multi_select3').multiSelect('select_all', $(".ms-selection ul"));
    });

    //不选择所有手机号的单击事件
    $("#noAddAll").click(function () {
        $('#my_multi_select3').multiSelect('deselect_all',$(".ms-selection ul"));
    });

    $("#btnSave").click(function () {
        var members = "";
        //封装数据
        $(".ms-selection ul").each(function () {
            $(this).find("li").each(function (i) {
                if ($(this).css("display") != "none") {
                    members = members + "," + $(this).attr('id').split('-')[0];
                }
                //alert(members);
            });
        });
        $("#member").val(members);

        if (addForm.valid()) { //验证通过
            $("#btnSave").attr("disabled",true);
            Shade.blockUI($("#addBody"));
            $.post("/account-manage/mobile-group/add",
                $("#addForm").serialize(),
                function (data) {
                    $("#btnSave").attr("disabled",false);
                    Shade.unblockUI($("#addBody"));
                   if (data.result == true) {
                        BootboxExt.alert("新增成功", function (res) {
                            location.href = "/account-manage/mobile-group/search";
                        });
                    } else {
                        BootboxExt.alert("新增失败", function (res) {
                            window.location.reload();
                        });
                    }
                })
        }
    });
});
