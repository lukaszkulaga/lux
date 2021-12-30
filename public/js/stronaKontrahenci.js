
$(document).ready(function () {

    $baseUrl = $('#baseUrl').val();
    $('.daneAdresowe').hide();
    $('.dodawanieKontrahenta').hide();



    /*

     -------------------- sekcja zapisywania danych podstawowych ---------------------------------

     */

    // zmienne dla walidacji
    $nazwaErr = false;
    $nipErr = false;
    $podmiotErr = false;

    $('.dodajKontrahenta').on('click',function() {

        $('#nazwa').val('');
        $('#nip').val('');
        $('#podmiot').val(0);

        // potrzebne do walidacji - po ponownym dodaniu klienta trzeba ustawić zmienne dla walidacji
        $nazwaErr = false;
        $nipErr = false;
        $podmiotErr = false;

        $('.daneAdresowe').hide();
        $('.dodawanieKontrahenta').show();
    });


    // walidacja dla pola nazwa
    $('#nazwa').on('keyup', function() {

        if($('#nazwa').val().length > 0){
            $('#nazwa').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorDodajKontrahenta').text('');
            $nazwaErr = true;
        } else{
            $('#nazwa').css('border','1px solid red');
            $('#nazwa').parent().parent().find('.errorDodajKontrahenta').text('wprowadź nazwę').css('color','red');
            $nazwaErr = false;
        }
    });

    // walidacja dla pola nip
    $('#nip').on('keyup', function() {

        if($('#nip').val().length > 0){
            $('#nip').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorDodajKontrahenta').text('');
            $nipErr = true;
        } else{
            $('#nip').css('border','1px solid red');
            $('#nip').parent().parent().find('.errorDodajKontrahenta').text('wprowadź nip').css('color','red');
            $nipErr = false;
        }
    });

    // walidacja pojedyncza - walidacja uruchamiana po kliknieciu przycisku do zapisu nowych danych podstawowych - walidacja musi byc
    // taka sama jak dla pojedynczych walidacji dla poszczególnych pól. Jest tylko raz wykonywana po kliknieciu przycisku
    // do zapisu danych.
    function walidacjaDanychPodstawowych() {

        if ( $nazwaErr === false ) {

            $('#nazwa').css('border','1px solid red');
            $('#nazwa').parent().parent().find('.errorDodajKontrahenta').text('wprowadź nazwę').css('color','red');
            $nazwaErr = false;
        }
        else {
            $('#nazwa').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorDodajKontrahenta').text('');
            $nazwaErr = true;
        }
        if ( $nipErr === false ) {

            $('#nip').css('border','1px solid red');
            $('#nip').parent().parent().find('.errorDodajKontrahenta').text('wprowadź nip').css('color','red');
            $nipErr = false;
        }
        else {
            $('#nip').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorDodajKontrahenta').text('');
            $nipErr = true;
        }


        if($nazwaErr === false || $nipErr === false){
            return false;
        } else {
            return true;
        }
    }

    // zapisywanie danych podstawowych
    $('#zapiszDanePodstawowe').on('click',function() {

        // walidacja pojedyncza - jeżeli true czyli wszystkie walidacje przejda pomyslnie to wykona sie ajax
        $rezultat = walidacjaDanychPodstawowych()

        if($rezultat === true){

            $nazwa = $('#nazwa').val();
            $nip = $('#nip').val();
            $podmiot = $('#podmiot').val();

            let danePodstawoweArr = {'nazwa':$nazwa,'nip':$nip,'podmiot':$podmiot};

            $url = $baseUrl + 'zapiszDanePostawoweKontrahenta/ajax';
            $.ajax({
                url: $url,
                type: 'POST',
                data: {tab: danePodstawoweArr},
                format: 'json',
                dataType: 'text',
                success: function (response) {
                    let json = JSON.parse(response);
                    console.log(json);

                    $('.resultsBody tr').remove();

                    json.danePodstawoweKontrahentaArr.forEach(item=> {

                        var id = '<td style="display: none" class="IdKlienta">' + item.IdKlienta + '</td>';
                        var nazwa = '<th scope="row" class="nazwaTab">' + item.Nazwa + '</th>';
                        var nip = '<td class="nipTab">' + item.NIP + '</td>';
                        var podmiot = '<td class="podmiotTab">' + item.Opis + '</td>';
                        var podmiotId = '<td style="display:none" class="podmiotIdTab">' + item.IdPodmiot + '</td>';

                        $row = "<tr class='daneKontrahentaPokaz'>" +
                            id +
                            nazwa +
                            nip +
                            podmiot +
                            podmiotId +
                            "</tr>";

                        $('.resultsBody').append($row);
                    });

                }
            })

            /* done - w tym miejscu możemy wywolac zdarzenia po zalodowaniu jakichs elementow za pomoca ajax.
            Bez tego zdzarzenie ktore dzialalo przed wykonaniem sie ajaxa juz nie zadziala - chyba chodzi o pamiec komputera
            bo nowo zaladowany element w ajaxie jest juz innym obiektem - w done zdarzenie zadziala bo odwolujemy sie do
             tego nowo utworzonego obiektu */

            // .done(function (data) {
            //     alert('2');
            //
            //     $('.daneKontrahentaPokaz').on('click',function() {
            //
            //         alert('3');
            //         // var test = $(this).find('.IdKlienta').text();
            //         $('.dodawanieKontrahenta').hide();
            //         $('.daneAdresowe').show();
            //
            //     });
            // });
        }
    });










    /*

    -----------------   sekcja edycji danych podstawowych -----------------------------

    */

    $('#edycjaDanychPodstawowych').on('click',function() {

        $idKlienta = $('#idKontrahentaEdycja').val();
        $nazwa = $('#nazwaEdycja').val();
        $nip = $('#nipEdycja').val();
        $podmiot = $('#podmiotEdycja').val();

        let danePodstawoweEdycjaArr = {'idKlienta':$idKlienta,'nazwa':$nazwa,'nip':$nip,'podmiot':$podmiot};

        $url = $baseUrl + 'edytujDanePostawoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: danePodstawoweEdycjaArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json);

                $('.resultsBody tr').remove();

                json.danePodstawoweEdycjaArr.forEach(item=> {

                    var id = '<td style="display: none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var nazwa = '<th scope="row" class="nazwaTab">' + item.Nazwa + '</th>';
                    var nip = '<td class="nipTab">' + item.NIP + '</td>';
                    var podmiot = '<td class="podmiotTab">' + item.Opis + '</td>';
                    var podmiotId = '<td style="display:none" class="podmiotIdTab">' + item.IdPodmiot + '</td>';

                    $row = "<tr class='daneKontrahentaPokaz'>" +
                        id +
                        nazwa +
                        nip +
                        podmiot +
                        podmiotId +
                        "</tr>";

                    $('.resultsBody').append($row);
                });

            }
        });

    });


   //zamiast done możemy zrobic tzw. zdarzenie delegowane ( jest ono globalne ) ktore zadziala tak jak done w ajax
    $('.resultsBody').on('click','.daneKontrahentaPokaz',function() {

        $idKlienta = $(this).find('.IdKlienta').text();
        $nazwaEdycja = $(this).find('.nazwaTab').text();
        $nipEdycja = $(this).find('.nipTab').text();
        $podmiotEdycjaId = $(this).find('.podmiotIdTab').text();

        $('#idKontrahentaEdycja').val($idKlienta);
        $('#nazwaEdycja').val($nazwaEdycja);
        $('#nipEdycja').val($nipEdycja);
        $('#podmiotEdycja').val($podmiotEdycjaId);

        $('.dodawanieKontrahenta').hide();
        $('.daneAdresowe').show();

    });



});








