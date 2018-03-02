var cardImgForm = $('form');
cardImgForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        describe: {
            required: true,
            stringCheck:true,
            stringMaxLength:500
        },
        cutBtn: {
            required: true
        },
        status: {
            required: true
        },
        memo: {
            required: true,
            stringMaxLength:500
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
