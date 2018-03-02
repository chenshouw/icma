var faceValueForm = $('form');
faceValueForm.validate({
    errorElement: 'span',
    errorClass: 'help-block',
    focusInvalid: false,
    ignore: "",
    rules: {
        channel: {
            required: true
        },
        money: {
            number: true,
            required: true,
            lteq: parseInt($("#maxValue").val()),
            gteq: 0,
            onlyamount: 12
        },
        status: {
            required: true
        },
        describe: {
            required: true,
            number: true
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


$(window).load(function () {
    $("#money").bind('keyup', function () {
        if ($(this).val() == "" && isNaN($(this).val())) {
            $("#memo").html("");
        } else {
            var memoValue = $(this).val();
            $("#memo").val(memoValue + '元');
        }
    })

})