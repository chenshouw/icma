var shopGrpForm = $('form');
shopGrpForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        shopGrp: {
            required: true,
            stringMaxLength: 20,
            newNumberAndCharacter:true
        },
        acqId: {
            required: true
        },
        grpName: {
            required: true,
            stringMaxLength: 50
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
