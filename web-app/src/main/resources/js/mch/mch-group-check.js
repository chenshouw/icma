var mchInfoForm = $('form');
mchInfoForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        mchGrp: {
            required: true,
            onlynum:true,
            stringMaxLength:30
        },
        groupName: {
            required: true,
            stringMaxLength:150
        },
        flag: {
            required: true,
            stringMaxLength:38
        },
        memo:{
            stringMaxLength:100
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
