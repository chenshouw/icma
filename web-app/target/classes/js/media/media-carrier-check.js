var mediaTypeFrom = $('form');
mediaTypeFrom.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        carrierType: {
            required: true,
            onlynum:true,
            stringMaxLength: 22
        },
        name:{
            stringMaxLength:60
        },
        inventoryFlag :{
            required: true,
            stringMaxLength: 22
        },
        cvvFlag: {
            required: true,
            stringMaxLength: 22
        },
        cvv2Flag: {
            required: true,
            stringMaxLength: 22
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
