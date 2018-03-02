var mediaTypeFrom = $('form');
mediaTypeFrom.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        mediaType:{
            required: true,
            onlynum:true,
            stringMaxLength:38
        },
        carrierType: {
            required: true,
            stringMaxLength: 38
        },
        lifeCycleFlag :{
            required: true,
            stringMaxLength: 38
        },
        chargeFlag: {
            required: true,
            stringMaxLength: 38
        },
        tradingFlag: {
            required: true,
            stringMaxLength: 38
        },
        ownerFlag: {
            required: true,
            stringMaxLength: 38
        },
        ownerChangeFlag: {
            required: true,
            stringMaxLength: 38
        },
        withAcc: {
            required: true,
            stringMaxLength: 38
        },
        flag: {
            required: true,
            stringMaxLength: 38
        },
        name:{
            required: true,
            stringMaxLength:60
        },
        memo:{
            stringMaxLength:200
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
