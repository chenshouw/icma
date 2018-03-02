var flowRuleForm = $('form');
flowRuleForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: true,
    ignore: "",
    rules: {
        operation: {
            string: true,
            newCharacter: true,
            required: true,
            stringMaxLength: 50
        },
        preStatus: {
            string: true,
            stringMaxLength: 10
        },
        postStatus: {
            string: true,
            required: true,
            stringMaxLength: 10
        },
        memo: {
            string: true,
            stringMaxLength: 500
        }
    },
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    success: function (label) {
        label.closest('.form-group').removeClass('has-error');
    }
});