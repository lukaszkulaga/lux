




$(document).ready(function () {

    /*
    *    zmienne globalne
    * */
    $baseUrl = $('#baseUrl').val();
    $(".komunikat").hide();
    $(".komunikatError").hide();

    let locale = 'pl'
    let order = $.fn.dataTable.ext.type.order

    delete order['string-pre']
    order['string-asc'] = function(a, b) {return a.localeCompare(b, locale)}
    order['string-desc'] = function(a, b) {return b.localeCompare(a, locale)}


    var table =  $('#table_id').DataTable( {
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Polish.json"
        }
    });

    // var table = $('#table_id').DataTable( {
    //
    // })

// przerobic na ajax i wpetli wywolac table.draw(); - cos podobnie jak w checkbox administrator i status - nie trzeba 
//odwzorowywac widoku tabeli w petli tak jak zawsze to robiłem !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    $('#id').keyup( function() {

        // alert('1');

        $.fn.dataTable.ext.search.push(
            function aaa ( settings, data, dataIndex ) {

                //alert(data);
                var id = $('#id').val();
                var searchId = data[6] || 0; // use data for the age column


                if (id === searchId) {
                    return true;
                } if(id === null || id === ''){
                    return true;
                }
                else {
                    return false;
                }

                // if (id === searchId) {
                //     return true;
                // } return id === null || id === '';
            }
        );

       table.draw();

    } );





    $('.resultsBody').on('click','.statusKonta',function(){

        $idUzytkownika = $(this).parent().parent().find('.idUzytkownik').text();
        $statusKonta = $(this).val();

        if($statusKonta === '1'){
            $statusKonta = 2;
        } else if ($statusKonta === '2') {
            $statusKonta = 1;
        } else {
            $statusKonta = 1;
        }

        let statusKontaArr = {'idUzytkownika':$idUzytkownika,'statusKonta':$statusKonta};

        $url = $baseUrl + 'statusKonta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: statusKontaArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.resultsBody tr').remove();

                table.draw();

                //json.statusKontaArr.forEach(item=> {

                    // var id = '<td class="idUzytkownik">' + item.IdUzytkownika + '</td>';
                    // var imie = '<td>' + item.Imie + '</td>';
                    // var nazwisko = '<td>' + item.Nazwisko + '</td>';
                    // var nazwaUzytkownika = '<td>' + item.NazwaUzytkownika + '</td>';
                    // var email = '<td>' + item.Email + '</td>';
                    // var numerTel = '<td>' + item.NumerTelefonu + '</td>';
                    // if( item.StatusKonta === 1){
                    //     $status = '<td><input class="statusKonta" type="checkbox" ' +
                    //         'value="'+ item.StatusKonta +'" checked /></td>';
                    // } else {
                    //     $status= '<td><input class="statusKonta" type="checkbox" ' +
                    //         'value="'+ item.StatusKonta +'"  /></td>';
                    // }
                    // if( item.Rola === 1){
                    //     $rola = '<td><input class="rola" type="checkbox" ' +
                    //         'value="'+ item.Rola +'" checked /></td>';
                    // } else {
                    //     $rola= '<td><input class="rola" type="checkbox" ' +
                    //         'value="'+ item.Rola +'"  /></td>';
                    // }

                    // $row = "<tr>" +
                    //     id +
                    //     imie +
                    //     nazwisko +
                    //     nazwaUzytkownika +
                    //     email +
                    //     numerTel +
                    //     $status +
                    //     $rola +
                    //     "</tr>";

                       
                   // $('.resultsBody').append($row);

               // });
            }
        });
    });

    $('.resultsBody').on('click','.rola',function(){

        $idUzytkownika = $(this).parent().parent().find('.idUzytkownik').text();
        $rola= $(this).val();

        if($rola === '1'){
            $rola = 2;
        } else if ($rola === '2') {
            $rola = 1;
        } else {
            $rola = 2;
        }

        let rolaArr = {'idUzytkownika':$idUzytkownika,'rola':$rola};

        $url = $baseUrl + 'rola/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: rolaArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                console.log(json);

                $('.resultsBody tr').remove();

                table.draw();

               // json.rolaArr.forEach(item=> {

                    // var id = '<td class="idUzytkownik">' + item.IdUzytkownika + '</td>';
                    // var imie = '<td>' + item.Imie + '</td>';
                    // var nazwisko = '<td>' + item.Nazwisko + '</td>';
                    // var nazwaUzytkownika = '<td>' + item.NazwaUzytkownika + '</td>';
                    // var email = '<td>' + item.Email + '</td>';
                    // var numerTel = '<td>' + item.NumerTelefonu + '</td>';
                    // if( item.StatusKonta === 1){
                    //     $status = '<td><input class="statusKonta" type="checkbox" ' +
                    //         'value="'+ item.StatusKonta +'" checked /></td>';
                    // } else {
                    //     $status= '<td><input class="statusKonta" type="checkbox" ' +
                    //         'value="'+ item.StatusKonta +'" /></td>';
                    // }
                    // if( item.Rola === 1){
                    //     $rola = '<td><input class="rola" type="checkbox" ' +
                    //         'value="'+ item.Rola +'" checked /></td>';
                    // } else {
                    //     $rola= '<td><input class="rola" type="checkbox" ' +
                    //         'value="'+ item.Rola +'"  /></td>';
                    // }

                    // $row = "<tr>" +
                    //     id +
                    //     imie +
                    //     nazwisko +
                    //     nazwaUzytkownika +
                    //     email +
                    //     numerTel +
                    //     $status +
                    //     $rola +
                    //     "</tr>";

                 
                   // $('.resultsBody').append($row);
               // });
            }
        });
    });


});

