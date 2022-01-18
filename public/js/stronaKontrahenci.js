
$(document).ready(function () {

    $baseUrl = $('#baseUrl').val();
    // przy każdym przeładowaniu strony te obiekty muszą byc ukryte
    $('.edycjaKontrahenta').hide();
    $('.dodawanieKontrahenta').hide();
    $('.dodawanieAdresow').hide();
    $('#wyswietlDaneAdresowe').hide();
    $('.dodawanieKontaktow').hide();
    $('#sekcjaDodawaniaAdresu').hide();
    $('#sekcjaEdycjiAdresu').hide();
    $('#sekcjaEdycjiKontaktu').hide();
    $('#sekcjaDodawaniaKontaktu').hide();
    $('#wyswietlDaneKontaktowe').hide();

    $('.errorSuccess').hide();
    $(".komunikat").hide();
    $(".komunikatError").hide();

    // zmienne dla walidacji
    $nazwaErr = false;
    $nipErr = false;
    $podmiotErr = false;



    /*
*
*   zamykanie sekcji
*
* */

    $('#zamknijDodawanieKontrahenta').on('click',function (){
        $('.dodawanieKontrahenta').hide();
    });
    $('#zamknijEdycjeKontrahenta').on('click',function (){
        $('.edycjaKontrahenta').hide();
    });
    $('#zamknijDodawanieAdresow').on('click',function (){
        $('.dodawanieAdresow').hide();
    });
    $('#zamknijDodawanieKontaktow').on('click',function (){
        $('.dodawanieKontaktow').hide();
    });


    /*
*
*   komunikat progress bar
*
* */

    function komunikatProgres($text,$successError) {

        if($successError === 'success'){
            $(".komunikatError").hide();
            $(".komunikat").show();
        } else {
            $(".komunikat").hide();
            $(".komunikatError").show();
        }

        $('.textKomunikatu').text($text);

        setTimeout(function(){

            if($successError === 'success'){
                $(".komunikat").hide();
            } else {
                $(".komunikatError").hide();
            }

        }, 4000);


        if($successError === 'success'){
            $elem = $(".progressBar");
        } else {
            $elem = $(".progressBarError");
        }

        $width = 1;
        $id = setInterval(frame, 40);
        function frame() {
            if ($width >= 100) {
                clearInterval($id);
            } else {
                $width++;
                $elem.css('width',$width + '%')
            }
        }
    }


   // ----------------------------------  DANE PODSTAWOWE  ------------------------------------------------------



    /*
  *
  * Sekcja filtrowania danych podstawowych
  *
  * */


    $('.filtrKontrahent,#wyczysc').on('keyup change click',function(){

        $nazwaFiltr = $('#nazwaFiltr').val();
        $nipFiltr = $('#nipFiltr').val();
        $podmiotFiltr = $('#podmiotFiltr').val();
        //$podmiotFiltr= $('#podmiotFiltr option:selected').text();

        if((this).id === 'wyczysc') {
            $nazwaFiltr = '';
            $nipFiltr = '';
            $podmiotFiltr = '';
        } else {
            $nazwaFiltr = $('#nazwaFiltr').val();
            $nipFiltr = $('#nipFiltr').val();
            $podmiotFiltr = $('#podmiotFiltr').val();
        }

        let danePodstawoweFiltrArr = {'nazwaFiltr':$nazwaFiltr,'nipFiltr':$nipFiltr,'podmiotFiltr':$podmiotFiltr};

        $url = $baseUrl + 'filtrujDanePostawoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: danePodstawoweFiltrArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.resultsBody tr').remove();

                json.danePodstawoweFiltrArr.forEach(item=> {

                    var id = '<td style="display: none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var nazwa = '<th scope="row" class="nazwaTab">' + item.Nazwa + '</th>';
                    var nip = '<td class="nipTab">' + item.NIP + '</td>';
                    var podmiot = '<td class="podmiotTab">' + item.Opis + '</td>';
                    var podmiotId = '<td style="display:none" class="podmiotIdTab">' + item.IdPodmiot + '</td>';
                    var adres = ' <td style="" class="daneAdresoweTab"><button class="pokazAdresButton"><svg class="earthIcon"></svg></button></td>';
                    var kontakt = '<td style="" class="daneKontaktoweTab"><button class="pokazKontaktButton"><svg class="telefonIcons"></svg></button></td>';
                    var usun = '<td style="" class="usunKontrahentaTab"><button class="usunKontrahentaButton"><svg class="koszIcons" ></svg></button></td>';

                    $row = "<tr class='daneKontrahentaPokaz'>" +
                        id +
                        nazwa +
                        nip +
                        podmiot +
                        podmiotId +
                        adres +
                        kontakt +
                        usun +
                        "</tr>";

                    $('.resultsBody').append($row);
                });
            }
        });
    })










    /*

     -------------------- sekcja zapisywania danych podstawowych ---------------------------------

     */



    $('.dodajKontrahenta').on('click',function() {

        // za kazdym razem gdy klikniemy aby dodac nowgo kontrahenta -  czyscimy wartosci w polach
        $('#nazwa').val('');
        $('#nip').val('');
        $('#podmiot').val(0); // ustawiamy na  -- wybierz --

        // potrzebne do walidacji - po ponownym kliknieciu aby dodac nowego klienta trzeba ustawić zmienne dla walidacji na false
        $nazwaErr = false;
        $nipErr = false;
        $podmiotErr = false;

        // ustawiamy css dla pól i ikonek po ponownym kliknieciu
        $('#nazwa').css('border','1px solid rgb(209, 205, 205)');
        $('#nazwa').parent().parent().find('.errorSuccess').show().css('background','').attr('title','');
        $('#nip').css('border','1px solid rgb(209, 205, 205)');
        $('#nip').parent().parent().find('.errorSuccess').show().css('background','').attr('title','');
        $('#podmiot').css('border','1px solid rgb(209, 205, 205)');
        $('#podmiot').parent().parent().find('.errorSuccess').show().css('background','').attr('title','');

        // ukrywanie sekcji po kazdym kliknieciu
        $('.dodawanieKontrahenta').show();
        $('.edycjaKontrahenta').hide();
        $('.dodawanieAdresow').hide();
        $('.dodawanieKontaktow').hide();
        $('#wyswietlDaneAdresowe').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiAdresu').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
        $('#wyswietlDaneKontaktowe').hide();
    });


    // walidacja dla pola nazwa
    $('#nazwa').on('keyup', function() {

        if($('#nazwa').val().length > 0){
            $('#nazwa').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat').attr('title','');
            $nazwaErr = true;
        } else{
            $('#nazwa').css('border','1px solid red');
            $('#nazwa').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadz nazwe');
            $nazwaErr = false;
        }
    });

    // walidacja dla pola nip
    $('#nip').on('keyup', function() {

        let nipVal = $('#nip').val();
        let pattern = /[0-9]{10}/;
        let validacjaNIPPattern = pattern.test(nipVal);

        if( $('#nip').val().length === 10 && validacjaNIPPattern === true ){
            $('#nip').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat').attr('title','');
            $nipErr = true;
        } else{
            $('#nip').css('border','1px solid red');
            $('#nip').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadz 10 cyfr NIP');
            $nipErr = false;
        }
    });

    // walidacja dla pola podmiot
    $('#podmiot').on('change', function() {

        if($('#podmiot').val() !== 0){
            $('#podmiot').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat').attr('title','');
            $podmiotErr = true;
        } else{
            $('#podmiot').css('border','1px solid red');
            $('#podmiot').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wybierz podmiot');
            $podmiotErr = false;
        }
    });

    // walidacja pojedyncza - walidacja uruchamiana po kliknieciu przycisku do zapisu nowych danych podstawowych - walidacja musi byc
    // taka sama jak dla pojedynczych walidacji dla poszczególnych pól. Jest tylko raz wykonywana po kliknieciu przycisku
    // do zapisu danych.
    function walidacjaDanychPodstawowych() {

        if ( $nazwaErr === false ) {
            $('#nazwa').css('border','1px solid red');
            $('#nazwa').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadz nazwe');
            $nazwaErr = false;
        }
        else {
            $('#nazwa').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat');
            $nazwaErr = true;
        }
        if ( $nipErr === false ) {
            $('#nip').css('border','1px solid red');
            $('#nip').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadz 10 cyfr NIP');
            $nipErr = false;
        }
        else {
            $('#nip').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat');
            $nipErr = true;
        }
        if ( $podmiotErr === false ) {
            $('#podmiot').css('border','1px solid red');
            $('#podmiot').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wybierz podmiot');
            $podmiotErr = false;
        }
        else {
            $('#podmiot').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat');
            $podmiotErr = true;
        }

        if($nazwaErr === false || $nipErr === false || $podmiotErr === false){
            return false;
        } else {
            return true;
        }
    }


    // funkcja sprawdza czy podany nip juz istnieje w bazie
    function sprawdzanieNIP (){

            $nip = $('#nip').val();
            $sprawdzNIP = 'błąd - nie wykonał sie ajax';

            let sprawdzNIPArr = {'nip':$nip};

            $url = $baseUrl + 'sprawdzNIP/ajax';
            $.ajax({
                url: $url,
                type: 'POST',
                // wyłaczamy async aby po kliknieciu przycisku zapisujacego dane podstawowe zdążyło się wykonać
                // wywołanie funkcji która sprawdza czy nip istnieje ( a dokładnie - żeby zdążył wykonac sie ajax).
                // Chodzi o to że ajax standardowo ma ustawione async na true i działa wtedy równolegle ( niezależnie )
                // i dlatego informacja o tym czy nip  istnieje pojawia się przed tym zanim ajax skonczy działac
                // i w odczycie dostajemy udefined.
                async: false,
                data: {tab: sprawdzNIPArr},
                format: 'json',
                dataType: 'text',
                success: function (response) {
                    let json = JSON.parse(response);

                    $sprawdzNIP =  json.sprawdzNIP;

                }
            })

        return $sprawdzNIP;
    }



    // zapisywanie danych podstawowych
    $('#zapiszDanePodstawowe').on('click',function() {

        // walidacja pojedyncza - jeżeli true czyli wszystkie walidacje przejda pomyslnie i
        // nip nie istnieje w bazie to wykona sie ajax
        $rezultat = walidacjaDanychPodstawowych();
        $sprawdzanieNIP =  sprawdzanieNIP();

        if($rezultat === true && $sprawdzanieNIP === false){

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
                        var adres = ' <td style="" class="daneAdresoweTab"><button class="pokazAdresButton"><svg class="earthIcon"></svg></button></td>';
                        var kontakt = '<td style="" class="daneKontaktoweTab"><button class="pokazKontaktButton"><svg class="telefonIcons"></svg></button></td>';
                        var usun = '<td style="" class="usunKontrahentaTab"><button class="usunKontrahentaButton"><svg class="koszIcons" ></svg></button></td>';

                        $row = "<tr class='daneKontrahentaPokaz'>" +
                            id +
                            nazwa +
                            nip +
                            podmiot +
                            podmiotId +
                            adres +
                            kontakt +
                            usun +
                            "</tr>";

                        $('.resultsBody').append($row);
                    });

                    komunikatProgres('Dodano kontrahenta','success');
                }
            })

            /* done - w tym miejscu możemy wywolac zdarzenia po załadowaniu jakichs elementow za pomoca ajax.
            Bez tego zdzarzenie ktore dzialalo przed wykonaniem sie ajaxa juz nie zadziala - chyba chodzi o pamiec komputera
            bo nowo zaladowany element w ajaxie jest juz innym obiektem - w done zdarzenie zadziala bo odwolujemy sie do
             tego nowo utworzonego obiektu . Zamiast done możemy zrobic zdarzenie oddelegowane */

            // .done(function (data) {
            //     alert('2');
            //
            //     $('.daneKontrahentaPokaz').on('click',function() {
            //
            //         alert('3');
            //         // var test = $(this).find('.IdKlienta').text();
            //         $('.dodawanieKontrahenta').hide();
            //         $('.edycjaKontrahenta').show();
            //
            //     });
            // });


            $('.dodawanieKontrahenta').hide();
            $('.edycjaKontrahenta').hide();
            $('.dodawanieAdresow').hide();
            $('.dodawanieKontaktow').hide();
            $('#wyswietlDaneAdresowe').hide();
            $('#sekcjaDodawaniaAdresu').hide();
            $('#sekcjaEdycjiAdresu').hide();
            $('#sekcjaEdycjiKontaktu').hide();
            $('#sekcjaDodawaniaKontaktu').hide();
            $('#wyswietlDaneKontaktowe').hide();

        } else {
            if( $rezultat === false ){
                komunikatProgres('wypełnij wymagane pola','success');
            }
            if( $sprawdzanieNIP === true ){
                komunikatProgres('taki nip juz istnieje','error');
            }
        }
    });










    /*

    -----------------   sekcja edycji danych podstawowych -----------------------------

    */


    //zamiast done możemy zrobic tzw. zdarzenie delegowane ( jest ono globalne ) ktore zadziala tak jak done w ajax
    $('.resultsBody').on('click','.nazwaTab',function() {

        $idKlienta = $(this).parent().find('.IdKlienta').text();
        $nazwaEdycja = $(this).parent().find('.nazwaTab').text();
        $nipEdycja = $(this).parent().find('.nipTab').text();
        $podmiotEdycjaId = $(this).parent().find('.podmiotIdTab').text();

        $nazwaKontrahenta = $(this).text();
        $('#nazwaKontrahenta').text($nazwaKontrahenta);

        $('#idKontrahentaEdycja').val($idKlienta);
        $('#nazwaEdycja').val($nazwaEdycja);
        $('#nipEdycja').val($nipEdycja);
        $('#podmiotEdycja').val($podmiotEdycjaId);

        $('.edycjaKontrahenta').show();
        $('.dodawanieKontrahenta').hide();
        $('.dodawanieAdresow').hide();
        $('.dodawanieKontaktow').hide();
        $('#wyswietlDaneAdresowe').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiAdresu').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
        $('#wyswietlDaneKontaktowe').hide();

        $nazwaEdycjaErr = true;
        $nipEdycjaErr = true;
        $podmiotEdycjaErr = true;

        // ustawiamy css dla pól i ikonek po ponownym kliknieciu
        $('#nazwaEdycja').css('border','1px solid rgb(209, 205, 205)');
        $('#nazwaEdycja').parent().parent().find('.errorSuccess').show().css('background','').attr('title','');
        $('#nipEdycja').css('border','1px solid rgb(209, 205, 205)');
        $('#nipEdycja').parent().parent().find('.errorSuccess').show().css('background','').attr('title','');
        $('#podmiotEdycja').css('border','1px solid rgb(209, 205, 205)');
        $('#podmiotEdycja').parent().parent().find('.errorSuccess').show().css('background','').attr('title','');

    });

    // walidacja dla pola nazwa
    $('#nazwaEdycja').on('keyup', function() {

        if($('#nazwaEdycja').val().length > 0){
            $('#nazwaEdycja').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat').attr('title','');
            $nazwaEdycjaErr = true;
        } else{
            $('#nazwaEdycja').css('border','1px solid red');
            $('#nazwaEdycja').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadz nazwe');
            $nazwaEdycjaErr = false;
        }
    });

    // walidacja dla pola nip
    $('#nipEdycja').on('keyup', function() {

        let nipVal = $('#nipEdycja').val();
        let pattern = /[0-9]{10}/;
        let validacjaNIPPattern = pattern.test(nipVal);

        if( $('#nipEdycja').val().length === 10 && validacjaNIPPattern === true ){
            $('#nipEdycja').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat').attr('title','');
            $nipEdycjaErr = true;
        } else{
            $('#nipEdycja').css('border','1px solid red');
            $('#nipEdycja').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadz 10 cyfr NIP');
            $nipEdycjaErr = false;
        }
    });

    // walidacja dla pola podmiot
    $('#podmiotEdycja').on('change', function() {

        if($('#podmiotEdycja').val() !== 0){
            $('#podmiotEdycja').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat').attr('title','');
            $podmiotEdycjaErr = true;
        } else{
            $('#podmiotEdycja').css('border','1px solid red');
            $('#podmiotEdycja').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wybierz podmiot');
            $podmiotEdycjaErr = false;
        }
    });

    // walidacja pojedyncza - walidacja uruchamiana po kliknieciu przycisku do zapisu nowych danych podstawowych - walidacja musi byc
    // taka sama jak dla pojedynczych walidacji dla poszczególnych pól. Jest tylko raz wykonywana po kliknieciu przycisku
    // do zapisu danych.
    function walidacjaDanychPodstawowychEdycja() {

        if ( $nazwaEdycjaErr === false ) {
            $('#nazwaEdycja').css('border','1px solid red');
            $('#nazwaEdycja').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadz nazwe');
            $nazwaEdycjaErr = false;
        }
        else {
            $('#nazwaEdycja').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat');
            $nazwaEdycjaErr = true;
        }
        if ( $nipEdycjaErr === false ) {
            $('#nipEdycja').css('border','1px solid red');
            $('#nipEdycja').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadz 10 cyfr NIP');
            $nipEdycjaErr = false;
        }
        else {
            $('#nipEdycja').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat');
            $nipEdycjaErr = true;
        }
        if ( $podmiotEdycjaErr === false ) {
            $('#podmiotEdycja').css('border','1px solid red');
            $('#podmiotEdycja').parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wybierz podmiot');
            $podmiotEdycjaErr = false;
        }
        else {
            $('#podmiotEdycja').css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat');
            $podmiotEdycjaErr = true;
        }

        if($nazwaEdycjaErr === false || $nipEdycjaErr === false || $podmiotEdycjaErr === false){
            return false;
        } else {
            return true;
        }
    }

    $('#edycjaDanychPodstawowych').on('click',function() {

        $idKlienta = $('#idKontrahentaEdycja').val();
        $nazwa = $('#nazwaEdycja').val();
        $nip = $('#nipEdycja').val();
        $podmiot = $('#podmiotEdycja').val();

        $rezultat = walidacjaDanychPodstawowychEdycja();

        if ($rezultat === true){

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
                        var adres = ' <td style="" class="daneAdresoweTab"><button class="pokazAdresButton"><svg class="earthIcon"></svg></button></td>';
                        var kontakt = '<td style="" class="daneKontaktoweTab"><button class="pokazKontaktButton"><svg class="telefonIcons"></svg></button></td>';
                        var usun = '<td style="" class="usunKontrahentaTab"><button class="usunKontrahentaButton"><svg class="koszIcons" ></svg></button></td>';

                        $row = "<tr class='daneKontrahentaPokaz'>" +
                            id +
                            nazwa +
                            nip +
                            podmiot +
                            podmiotId +
                            adres +
                            kontakt +
                            usun +
                            "</tr>";

                        $('.resultsBody').append($row);
                    });

                    komunikatProgres('Zapisano zmiany','success');

                }
            });




            // po kliknieciu przycisku edytuj zamykamy wszystkie sekcje
            $('.edycjaKontrahenta').hide();
            $('.dodawanieKontrahenta').hide();
            $('.dodawanieAdresow').hide();
            $('.dodawanieKontaktow').hide();
            $('#wyswietlDaneAdresowe').hide();
            $('#sekcjaDodawaniaAdresu').hide();
            $('#sekcjaEdycjiAdresu').hide();
            $('#sekcjaEdycjiKontaktu').hide();
            $('#sekcjaDodawaniaKontaktu').hide();
            $('#wyswietlDaneKontaktowe').hide();

        }
    });


    /*
 *
 * sekcja danych podstawowych - usuwanie danych podstawowych + kontakty + adresy
 *
 * */


    $('.resultsBody').on('click','.usunKontrahentaButton',function(){

        $idKlienta= $(this).parent().parent().find('.IdKlienta').text();

        let usunKontrahentaArr = {'idKlienta':$idKlienta};

        $url = $baseUrl + 'usunKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: usunKontrahentaArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json);

                $('.resultsBody tr').remove();

                json.usunKontrahentaArr.forEach(item=> {

                    var id = '<td style="display: none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var nazwa = '<th scope="row" class="nazwaTab">' + item.Nazwa + '</th>';
                    var nip = '<td class="nipTab">' + item.NIP + '</td>';
                    var podmiot = '<td class="podmiotTab">' + item.Opis + '</td>';
                    var podmiotId = '<td style="display:none" class="podmiotIdTab">' + item.IdPodmiot + '</td>';
                    var adres = ' <td style="" class="daneAdresoweTab"><button class="pokazAdresButton"><svg class="earthIcon"></svg></button></td>';
                    var kontakt = '<td style="" class="daneKontaktoweTab"><button class="pokazKontaktButton"><svg class="telefonIcons"></svg></button></td>';
                    var usun = '<td style="" class="usunKontrahentaTab"><button class="usunKontrahentaButton"><svg class="koszIcons" ></svg></button></td>';

                    $row = "<tr class='daneKontrahentaPokaz'>" +
                        id +
                        nazwa +
                        nip +
                        podmiot +
                        podmiotId +
                        adres +
                        kontakt +
                        usun +
                        "</tr>";

                    $('.resultsBody').append($row);
                });

                komunikatProgres('Usunięto kontrahenta','success');
            }
        })

    });



   // -----------------------------------------------------  DANE ADRESOWE   ------------------------------------


  /*
  *
  * sekcja danych adresowych - wyświetlanie
  *
  * */


    $('.resultsBody').on('click','.pokazAdresButton',function() {

        $('.dodawanieAdresow').show();
        $('#wyswietlDaneAdresowe').show();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('.dodawanieKontaktow').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiAdresu').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
        $('#wyswietlDaneKontaktowe').hide();

        $idKlienta = $(this).parent().parent().find('.IdKlienta').text();
        $nazwaKontrahenta = $(this).parent().parent().find('.nazwaTab').text();

        // ustawiamy IdKlienta aby odczytac w sekcji zapisywania danych adresowych
        $('.pobierzIdKlienta').val($idKlienta);
        $('#nazwaKontrahentaAdres').text($nazwaKontrahenta);

        let daneAdresoweArr = {'idKlienta':$idKlienta};

        $url = $baseUrl + 'daneAdresoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: daneAdresoweArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.resultsBodyAdres tr').remove();

                json.daneAdresoweKontrahentaArr.forEach(item=> {

                    var idK = '<td style="display:none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var idA = '<td style="display:none" class="IdAdres">' + item.IdAdres + '</td>';
                    var miejscowosc = '<td style="display:none" class="miejscowoscTab">' + item.Miejscowosc + '</td>';
                    var ulica = '<td style="display:none" class="ulicaTab">' + item.Ulica + '</td>';
                    var nrBudynku = '<td style="display:none" class="nrBudynkuTab">' + item.NrBudynku + '</td>';
                    var adres = '<th style="font-weight:normal;cursor:unset" scope="row" class="adresTab">' + item.Adres + '</th>';
                    var edytuj = '<td style="" class="edytujAdresTab"><button title="Edytuj" type="button" class="edytujAdresButton"><svg class="edycjaIcons" ></svg></button></td>';
                    var usun = '<td style="" class="usunAdresTab"><button title="Usuń" type="button" class="usunAdresButton"><svg class="koszIcons" ></svg></button></td>';


                    $row = "<tr class='daneAdresowePokaz'>" +
                        idK +
                        idA +
                        miejscowosc +
                        ulica +
                        nrBudynku +
                        adres +
                        edytuj +
                        usun +
                        "</tr>";

                    $('.resultsBodyAdres').append($row);
                });

                if (json.daneAdresoweKontrahentaArr.length>0 ){
                    $('.brakDanych').hide();
                    $('#tabelaAdresow').show();
                    $('#dodajDaneAdresowe').css('margin-top','46vh');
                } else {
                    $('.brakDanych').show();
                    $('#tabelaAdresow').hide();
                    $('#dodajDaneAdresowe').css('margin-top','30.7vh');
                };


            }
        });

    })



            /*
        *
        * sekcja danych adresowych - dodawanie
        *
        * */


    $('#dodajDaneAdresoweButton').on('click',function (){

        // zerujemy wartosci w polach
        $('#miejscowoscDodaj').val('');
        $('#ulicaDodaj').val('');
        $('#nrBudynkuDodaj').val('');

        $('.dodawanieAdresow').show();
        $('#sekcjaDodawaniaAdresu').show();
        $('#sekcjaEdycjiAdresu').hide();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('.dodawanieKontaktow').hide();
        $('#wyswietlDaneAdresowe').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
        $('#wyswietlDaneKontaktowe').hide();
    });


    $('#zapiszDaneAdresoweButton').on('click',function(){

        $miejscowosc = $('#miejscowoscDodaj').val();
        $ulica = $('#ulicaDodaj').val();
        $nrBudynku = $('#nrBudynkuDodaj').val();
        // jak nie działa to mozliwe ze została dodana nowa sekcja w html która zagnieżdża inną i jest zła ilość parent();
        // $idKlienta = $(this).parent().parent().parent().parent().parent().find('.IdKlienta').text();

        $idKlienta = $('.pobierzIdKlienta').val();

        let daneAdresoweDodajArr = {'idKlienta':$idKlienta,'miejscowosc':$miejscowosc,'ulica':$ulica,'nrBudynku':$nrBudynku};

        $url = $baseUrl + 'dodajDaneAdresoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: daneAdresoweDodajArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json);

                $('.resultsBodyAdres tr').remove();

                json.daneAdresoweKontrahentaArr.forEach(item=> {

                    var idK = '<td style="display:none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var idA = '<td style="display:none" class="IdAdres">' + item.IdAdres + '</td>';
                    var miejscowosc = '<td style="display:none" class="miejscowoscTab">' + item.Miejscowosc + '</td>';
                    var ulica = '<td style="display:none" class="ulicaTab">' + item.Ulica + '</td>';
                    var nrBudynku = '<td style="display:none" class="nrBudynkuTab">' + item.NrBudynku + '</td>';
                    var adres = '<th style="font-weight:normal;cursor:unset" scope="row" class="adresTab">' + item.Adres + '</th>';
                    var edytuj = '<td style="" class="edytujAdresTab"><button title="Edytuj" type="button" class="edytujAdresButton"><svg class="edycjaIcons" ></svg></button></td>';
                    var usun = '<td style="" class="usunAdresTab"><button title="Usuń" type="button" class="usunAdresButton"><svg class="koszIcons" ></svg></button></td>';



                    $row = "<tr class='daneAdresowePokaz'>" +
                        idK +
                        idA +
                        miejscowosc +
                        ulica +
                        nrBudynku +
                        adres +
                        edytuj +
                        usun +
                        "</tr>";

                    $('.resultsBodyAdres').append($row);
                });

                if (json.daneAdresoweKontrahentaArr.length>0 ){
                    $('.brakDanych').hide();
                    $('#tabelaAdresow').show();
                    $('#dodajDaneAdresowe').css('margin-top','46vh');
                } else {
                    $('.brakDanych').show();
                    $('#tabelaAdresow').hide();
                    $('#dodajDaneAdresowe').css('margin-top','30.7vh');
                };


                komunikatProgres('Dodano adres','success');
            }
        })

        // po kliknieciu przycisku dodania adresu wylaczamy wszystkie pozostałe sekcje
        $('.dodawanieAdresow').show();
        $('#wyswietlDaneAdresowe').show();
        $('#sekcjaEdycjiAdresu').hide();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('.dodawanieKontaktow').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
        $('#wyswietlDaneKontaktowe').hide();
    });


    /*
       *
       * sekcja danych adresowych - edytowanie
       *
       * */

    $('.resultsBodyAdres').on('click','.edytujAdresButton',function (){

        $('.dodawanieAdresow').show();
        $('#sekcjaEdycjiAdresu').show();
        $('#wyswietlDaneAdresowe').hide();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('.dodawanieKontaktow').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
        $('#wyswietlDaneKontaktowe').hide();

        $idAdres= $(this).parent().parent().find('.IdAdres').text();
        $idKlienta= $(this).parent().parent().find('.IdKlienta').text();
        $miejscowosc= $(this).parent().parent().find('.miejscowoscTab').text();
        $ulica= $(this).parent().parent().find('.ulicaTab').text();
        $nrBudynku= $(this).parent().parent().find('.nrBudynkuTab').text();

        $('.pobierzIdAdres').val($idAdres);
        $('.pobierzIdKlienta').val($idKlienta);
        $('#miejscowoscEdytuj').val($miejscowosc);
        $('#ulicaEdytuj').val($ulica);
        $('#nrBudynkuEdytuj').val($nrBudynku);
    });


    $('#edytujDaneAdresoweButton').on('click',function(){

        $idAdres = $('.pobierzIdAdres').val();
        $idKlienta = $('.pobierzIdKlienta').val();
        $miejscowosc = $('#miejscowoscEdytuj').val();
        $ulica = $('#ulicaEdytuj').val();
        $nrBudynku = $('#nrBudynkuEdytuj').val();


        let daneAdresoweEdytujArr = {'idAdres':$idAdres,'idKlienta':$idKlienta,'miejscowosc':$miejscowosc,'ulica':$ulica,'nrBudynku':$nrBudynku};

        $url = $baseUrl + 'edytujDaneAdresoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: daneAdresoweEdytujArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json);

                $('.resultsBodyAdres tr').remove();

                json.daneAdresoweKontrahentaArr.forEach(item=> {

                    var idK = '<td style="display:none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var idA = '<td style="display:none" class="IdAdres">' + item.IdAdres + '</td>';
                    var miejscowosc = '<td style="display:none" class="miejscowoscTab">' + item.Miejscowosc + '</td>';
                    var ulica = '<td style="display:none" class="ulicaTab">' + item.Ulica + '</td>';
                    var nrBudynku = '<td style="display:none" class="nrBudynkuTab">' + item.NrBudynku + '</td>';
                    var adres = '<th style="font-weight:normal;cursor:unset" scope="row" class="adresTab">' + item.Adres + '</th>';
                    var edytuj = '<td style="" class="edytujAdresTab"><button title="Edytuj" type="button" class="edytujAdresButton"><svg class="edycjaIcons" ></svg></button></td>';
                    var usun = '<td style="" class="usunAdresTab"><button title="Usuń" type="button" class="usunAdresButton"><svg class="koszIcons" ></svg></button></td>';



                    $row = "<tr class='daneAdresowePokaz'>" +
                        idK +
                        idA +
                        miejscowosc +
                        ulica +
                        nrBudynku +
                        adres +
                        edytuj +
                        usun +
                        "</tr>";

                    $('.resultsBodyAdres').append($row);
                });

                komunikatProgres('Zapisano zmiany','success');
            }
        })

        $('.dodawanieAdresow').show();
        $('#wyswietlDaneAdresowe').show();
        $('#sekcjaEdycjiAdresu').hide();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('.dodawanieKontaktow').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
        $('#wyswietlDaneKontaktowe').hide();


    });

    /*
       *
       * sekcja danych adresowych - usuwanie
       *
       * */


    $('.resultsBodyAdres').on('click','.usunAdresButton',function(){

        $idAdres= $(this).parent().parent().find('.IdAdres').text();
        $idKlienta= $(this).parent().parent().find('.IdKlienta').text();


        let daneAdresoweUsunArr = {'idAdres':$idAdres, 'idKlienta':$idKlienta};

        $url = $baseUrl + 'usunDaneAdresoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: daneAdresoweUsunArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json);

                $('.resultsBodyAdres tr').remove();

                json.daneAdresoweKontrahentaArr.forEach(item=> {

                    var idK = '<td style="display:none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var idA = '<td style="display:none" class="IdAdres">' + item.IdAdres + '</td>';
                    var miejscowosc = '<td style="display:none" class="miejscowoscTab">' + item.Miejscowosc + '</td>';
                    var ulica = '<td style="display:none" class="ulicaTab">' + item.Ulica + '</td>';
                    var nrBudynku = '<td style="display:none" class="nrBudynkuTab">' + item.NrBudynku + '</td>';
                    var adres = '<th style="font-weight:normal;cursor:unset" scope="row" class="adresTab">' + item.Adres + '</th>';
                    var edytuj = '<td style="" class="edytujAdresTab"><button title="Edytuj" type="button" class="edytujAdresButton"><svg class="edycjaIcons" ></svg></button></td>';
                    var usun = '<td style="" class="usunAdresTab"><button title="Usuń" type="button" class="usunAdresButton"><svg class="koszIcons" ></svg></button></td>';



                    $row = "<tr class='daneAdresowePokaz'>" +
                        idK +
                        idA +
                        miejscowosc +
                        ulica +
                        nrBudynku +
                        adres +
                        edytuj +
                        usun +
                        "</tr>";

                    $('.resultsBodyAdres').append($row);
                });

                komunikatProgres('Usunięto adres','success');
            }
        })

    });





    // -----------------------------  DANE KONTAKTOWE  ------------------------------------


    /*
 *
 * sekcja danych kontaktowych - wyświetlanie
 *
 * */


$('.resultsBody').on('click','.pokazKontaktButton',function() {

    $('.dodawanieKontaktow').show();
    $('#wyswietlDaneKontaktowe').show();
    $('#sekcjaEdycjiKontaktu').hide();
    $('#sekcjaDodawaniaKontaktu').hide();
    $('.dodawanieAdresow').hide();
    $('#wyswietlDaneAdresowe').hide();
    $('.dodawanieKontrahenta').hide();
    $('.edycjaKontrahenta').hide();
    $('#sekcjaDodawaniaAdresu').hide();
    $('#sekcjaEdycjiAdresu').hide();


        $idKlienta = $(this).parent().parent().find('.IdKlienta').text();
        $nazwaKontrahenta = $(this).parent().parent().find('.nazwaTab').text();

        // ustawiamy IdKlienta aby odczytac w sekcji zapisywania danych kontaktowych
        $('.pobierzIdKlienta').val($idKlienta);
        $('#nazwaKontrahentaKontakt').text($nazwaKontrahenta);

        let daneKontaktoweArr = {'idKlienta':$idKlienta};

        $url = $baseUrl + 'daneKontaktoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: daneKontaktoweArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.resultsBodyKontakt tr').remove();

                json.daneKontaktoweKontrahentaArr.forEach(item=> {

                    var idK = '<td style="display:none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var idKontakt = '<td style="display:none" class="IdKontakt">' + item.IdKontakt + '</td>';
                    var telefon = '<th style="font-weight:normal;cursor:unset" scope="row" class="telefonTab">' + item.Telefon + '</th>';
                    var email = '<th style="font-weight:normal;cursor:unset" scope="row" class="emailTab">' + item.Email + '</th>';
                    var edytuj = '<td style="" class="edytujKontaktTab"><button title="Edytuj" type="button" class="edytujKontaktButton"><svg class="edycjaIcons" ></svg></button></td>';
                    var usun = '<td style="" class="usunKontaktTab"><button title="Usuń" type="button" class="usunKontaktButton"><svg class="koszIcons" ></svg></button></td>';


                    $row = "<tr class='daneKontaktowePokaz'>" +
                        idK +
                        idKontakt +
                        telefon +
                        email +
                        edytuj +
                        usun +
                        "</tr>";

                    $('.resultsBodyKontakt').append($row);
                });

                if (json.daneKontaktoweKontrahentaArr.length>0 ){
                    $('.brakDanych').hide();
                    $('#tabelaKontaktow').show();
                    $('#dodajDaneKontaktowe').css('margin-top','46vh');
                } else {
                    $('.brakDanych').show();
                    $('#tabelaKontaktow').hide();
                    $('#dodajDaneKontaktowe').css('margin-top','30.7vh');
                };

            }
        });

    });


    /*
*
* sekcja danych kontaktowych - dodawanie
*
* */


    $('#dodajDaneKontaktoweButton').on('click',function (){

        // zerujemy wartosci w polach
        $('#telefonDodaj').val('');
        $('#emailDodaj').val('');

        $('.dodawanieKontaktow').show();
        $('#sekcjaDodawaniaKontaktu').show();
        $('#wyswietlDaneKontaktowe').hide();
        $('.dodawanieAdresow').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiAdresu').hide();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('#wyswietlDaneAdresowe').hide();
        $('#sekcjaEdycjiKontaktu').hide();

    });


    $('#zapiszDaneKontaktoweButton').on('click',function(){

        $telefon = $('#telefonDodaj').val();
        $email = $('#emailDodaj').val();

        // jak nie działa to mozliwe ze została dodana nowa sekcja w html która zagnieżdża inną i jest zła ilość parent();
        // $idKlienta = $(this).parent().parent().parent().parent().parent().find('.IdKlienta').text();

        $idKlienta = $('.pobierzIdKlienta').val();

        let daneKontaktoweDodajArr = {'idKlienta':$idKlienta,'telefon':$telefon,'email':$email};

        $url = $baseUrl + 'dodajDaneKontaktoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: daneKontaktoweDodajArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json);

                $('.resultsBodyKontakt tr').remove();

                json.daneKontaktoweKontrahentaArr.forEach(item=> {

                    var idK = '<td style="display:none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var idKontakt = '<td style="display:none" class="IdKontakt">' + item.IdKontakt + '</td>';
                    var telefon = '<th style="font-weight:normal;cursor:unset" scope="row" class="telefonTab">' + item.Telefon + '</th>';
                    var email = '<th style="font-weight:normal;cursor:unset" scope="row" class="emailTab">' + item.Email + '</th>';
                    var edytuj = '<td style="" class="edytujKontaktTab"><button title="Edytuj" type="button" class="edytujKontaktButton"><svg class="edycjaIcons" ></svg></button></td>';
                    var usun = '<td style="" class="usunKontaktTab"><button title="Usuń" type="button" class="usunKontaktButton"><svg class="koszIcons" ></svg></button></td>';

                    $row = "<tr class='daneKontaktowePokaz'>" +
                        idK +
                        idKontakt +
                        telefon +
                        email +
                        edytuj +
                        usun +
                        "</tr>";

                    $('.resultsBodyKontakt').append($row);

                });

                if (json.daneKontaktoweKontrahentaArr.length>0 ){
                    $('.brakDanych').hide();
                    $('#tabelaKontaktow').show();
                    $('#dodajDaneKontaktowe').css('margin-top','46vh');
                } else {
                    $('.brakDanych').show();
                    $('#tabelaKontaktow').hide();
                    $('#dodajDaneKontaktowe').css('margin-top','30.7vh');
                };

                komunikatProgres('Dodano kontakt','success');
            }
        })

        // po kliknieciu przycisku dodania adresu wylaczamy wszystkie pozostałe sekcje
        $('.dodawanieKontaktow').show();
        $('#wyswietlDaneKontaktowe').show();
        $('.dodawanieAdresow').hide();
        $('#wyswietlDaneAdresowe').hide();
        $('#sekcjaEdycjiAdresu').hide();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
    });



    /*
      *
      * sekcja danych kontaktowych - edytowanie
      *
      * */

    $('.resultsBodyKontakt').on('click','.edytujKontaktButton',function (){

        $('.dodawanieKontaktow').show();
        $('#sekcjaEdycjiKontaktu').show();
        $('.dodawanieAdresow').hide();
        $('#sekcjaEdycjiAdresu').hide();
        $('#wyswietlDaneAdresowe').hide();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();
        $('#wyswietlDaneKontaktowe').hide();

        $idKontakt= $(this).parent().parent().find('.IdKontakt').text();
        $idKlienta= $(this).parent().parent().find('.IdKlienta').text();
        $telefon= $(this).parent().parent().find('.telefonTab').text();
        $email= $(this).parent().parent().find('.emailTab').text();

        $('.pobierzIdKontakt').val($idKontakt);
        $('.pobierzIdKlienta').val($idKlienta);
        $('#telefonEdytuj').val($telefon);
        $('#emailEdytuj').val($email);

    });


    $('#edytujDaneKontaktoweButton').on('click',function(){

        $idKontakt = $('.pobierzIdKontakt').val();
        $idKlienta = $('.pobierzIdKlienta').val();
        $telefon = $('#telefonEdytuj').val();
        $email = $('#emailEdytuj').val();

        let daneKontaktoweEdytujArr = {'idKontakt':$idKontakt,'idKlienta':$idKlienta,'telefon':$telefon,'email':$email};

        $url = $baseUrl + 'edytujDaneKontaktoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: daneKontaktoweEdytujArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json);

                $('.resultsBodyKontakt tr').remove();

                json.daneKontaktoweKontrahentaArr.forEach(item=> {

                    var idK = '<td style="display:none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var idKontakt = '<td style="display:none" class="IdKontakt">' + item.IdKontakt + '</td>';
                    var telefon = '<th style="font-weight:normal;cursor:unset" scope="row" class="telefonTab">' + item.Telefon + '</th>';
                    var email = '<th style="font-weight:normal;cursor:unset" scope="row" class="emailTab">' + item.Email + '</th>';
                    var edytuj = '<td style="" class="edytujKontaktTab"><button title="Edytuj" type="button" class="edytujKontaktButton"><svg class="edycjaIcons" ></svg></button></td>';
                    var usun = '<td style="" class="usunKontaktTab"><button title="Usuń" type="button" class="usunKontaktButton"><svg class="koszIcons" ></svg></button></td>';

                    $row = "<tr class='daneKontaktowePokaz'>" +
                        idK +
                        idKontakt +
                        telefon +
                        email +
                        edytuj +
                        usun +
                        "</tr>";

                    $('.resultsBodyKontakt').append($row);

                });

                komunikatProgres('Zapisano zmiany','success');
            }
        })

        $('.dodawanieKontaktow').show();
        $('#wyswietlDaneKontaktowe').show();
        $('.dodawanieAdresow').hide();
        $('#wyswietlDaneAdresowe').hide();
        $('#sekcjaEdycjiAdresu').hide();
        $('.dodawanieKontrahenta').hide();
        $('.edycjaKontrahenta').hide();
        $('#sekcjaDodawaniaAdresu').hide();
        $('#sekcjaEdycjiKontaktu').hide();
        $('#sekcjaDodawaniaKontaktu').hide();

    });

    /*
   *
   * sekcja danych kontaktowych - usuwanie
   *
   * */


    $('.resultsBodyKontakt').on('click','.usunKontaktButton',function(){

        $idKontakt= $(this).parent().parent().find('.IdKontakt').text();
        $idKlienta= $(this).parent().parent().find('.IdKlienta').text();


        let daneKontaktoweUsunArr = {'idKontakt':$idKontakt, 'idKlienta':$idKlienta};

        $url = $baseUrl + 'usunDaneKontaktoweKontrahenta/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: daneKontaktoweUsunArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json);

                $('.resultsBodyKontakt tr').remove();

                json.daneKontaktoweKontrahentaArr.forEach(item=> {

                    var idK = '<td style="display:none" class="IdKlienta">' + item.IdKlienta + '</td>';
                    var idKontakt = '<td style="display:none" class="IdKontakt">' + item.IdKontakt + '</td>';
                    var telefon = '<th style="font-weight:normal;cursor:unset" scope="row" class="telefonTab">' + item.Telefon + '</th>';
                    var email = '<th style="font-weight:normal;cursor:unset" scope="row" class="emailTab">' + item.Email + '</th>';
                    var edytuj = '<td style="" class="edytujKontaktTab"><button title="Edytuj" type="button" class="edytujKontaktButton"><svg class="edycjaIcons" ></svg></button></td>';
                    var usun = '<td style="" class="usunKontaktTab"><button title="Usuń" type="button" class="usunKontaktButton"><svg class="koszIcons" ></svg></button></td>';



                    $row = "<tr class='daneKontaktowePokaz'>" +
                        idK +
                        idKontakt+
                        telefon +
                        email +
                        edytuj +
                        usun +
                        "</tr>";

                    $('.resultsBodyKontakt').append($row);
                });

                komunikatProgres('Usunięto kontakt','success');
            }
        })

    });



});








