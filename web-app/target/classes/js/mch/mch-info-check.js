var mchInfoForm = $('form');
mchInfoForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        mid: {
            required: true,
            onlynum:true,
            stringMaxLength:30
        },
        midName: {
            required: true,
            stringMaxLength:150
        },
        settleInterval: {
            onlynum:true,
            stringMaxLength:40
        },
        status: {
            required: true
        },
       fax:{
           stringMaxLength:20
       },
        email:{
             stringMaxLength:60
        },
       linkMan:{
           stringMaxLength:40
       },
        mchAddr:{
            stringMaxLength:150
        },
        settleBank:{
            stringMaxLength:20
        },
        settleAccno:{
            onlynum:true,
            stringMaxLength:30
        },
        accName:{
            stringMaxLength:60
        },
        memo:{
            stringMaxLength:100
        },
        phone:{
            tel: true
        },
        midShortName:{
            required: true,
            stringMaxLength:150
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

