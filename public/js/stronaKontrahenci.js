
$(document).ready(function () {

    $baseUrl = $('#baseUrl').val();


    $("#test").on('click',function() {

        alert("ok");


            let arr = {};

            $url = $baseUrl + 'stronaKontrahenci/ajax';
            $.ajax({
                url: $url,
                type: 'POST',
                data: {tab: arr},
                format: 'json',
                dataType: 'text',
                success: function (response) {
                    var json = JSON.parse(response);
                    alert(json);
                }
            });

    });


});



