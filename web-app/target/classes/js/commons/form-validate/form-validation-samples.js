/**表单验证模板——根据需求改变ID和提交成功后执行的函数**/

jQuery(document).ready(function() {   

    var FormValidation = function () {
            var form1 = $('#form-add');
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
            // 输入有误项高亮显示
                highlight: function (element) { 
                    $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
                },
            // 验证通过项去除高亮
                unhighlight: function (element) { 
                    $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
                },
            // success: function (label) {
            //     label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            // },
                submitHandler: function (form) {
                   //*提交成功后执行的函数*//
                   }
            });
    }();

})

 
