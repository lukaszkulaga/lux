

$(document).ready(function () {

    /*
    *    zmienne globalne
    * */
    $baseUrl = $('#baseUrl').val();

    $('.zmianyKomentarze').hide();



    $('#buttonZmianyKomentarze').on('click',function(){

         $('.edytowanieZgloszenia').hide();
        $('.zmianyKomentarze').show();
    })

    $('#zamknijZmianyKomentarze').on('click', function(){
        $('.zmianyKomentarze').hide();
        $('.edytowanieZgloszenia').show();
    });


    //walidacja komentarze

    $komentarzErr = false;

    $('#nowyKomentarz').on('change keyup',function() {
        if( ($('#nowyKomentarz').val() !== null) || ($('#nowyKomentarz').val() !== '') ) {
            $('#nowyKomentarz').css('border','1px solid rgb(209, 205, 205)');
            $komentarzErr = true;
        } else {
            $('#nowyKomentarz').css('border','1px solid red');
            $komentarzErr = false;
        }
    })

    function walidacjaKomenatrz() {

        if($komentarzErr === false) {
            $('#nowyKomentarz').css('border','1px solid red');
            $komentarzErr = false;
        } else {
            $('#nowyKomentarz').css('border','1px solid rgb(209, 205, 205)');
            $komentarzErr = true;
        }

        if($komentarzErr === false ) {
            return false;
        } else {
            return true;
        }
    }


    $('#buttonZmianyKomentarze').on('click',function(){

        $('.wszystkieKomentarze p').remove();
        $('.wszystkieZmiany p').remove();

        $idZgloszenia = $('#idZgloszeniaKomentarze').val();

        let wyswietlKomentarz = {'idZgloszenia':$idZgloszenia};

        $url = $baseUrl + 'wyswietlKomentarzeZmiany/ajax';

        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: wyswietlKomentarz},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                json.wyswietlKomentarzeTab.forEach(item=> {

                    $row = "<p class='listaKomentarzy' style='text-align: left;'>" +
                        "<span style='color:rgb(96, 19, 108); font-weight: bold;font-size: 14px;'>" +
                        item.User +
                        "</span>" + "</br>"+
                        "<span style='color:rgba(0,0,0,0.5);'>" +
                        item.DataDodania.substring(0,16) +
                        "</span>" + "</br>"+
                        "<span style='text-wrap: normal; color: black; font-size: 14px;'>" +
                        item.Komentarz +
                        "</span>" +
                        "</p>";

                    $('.wszystkieKomentarze').append($row);
                });

                json.wyswietlZmianyTab.forEach(item=> {

                    $row = "<p class='listaZmian' style='text-align: left;'>" +
                        "<span style='color:rgb(96, 19, 108); font-weight: bold;font-size: 14px;'>" +
                        item.User +
                        "</span>" + "</br>"+
                        "<span style='color:rgba(0,0,0,0.5);'>" +
                        item.DataModyfikacji.substring(0,16) +
                        "</span>" + "</br>"+
                        "<span style='text-wrap: normal; color: black; font-size: 14px;'>" +
                        item.Zmiany +
                        "</span>" +
                        "</p>";

                    $('.wszystkieZmiany').append($row);
                });
            }
        })

    })



    $('#dodajKomentarz').on('click',function(){

        $rezultat = walidacjaKomenatrz();

        if($rezultat === true) {

        $komentarz = $('#nowyKomentarz').val();
        $idZgloszenia = $('#idZgloszeniaKomentarze').val();
        $imie = $('#imie').text();
        $nazwisko = $('#nazwisko').text();

        let dodajKomentarz = {'idZgloszenia':$idZgloszenia, 'komentarz':$komentarz,'imie':$imie,'nazwisko':$nazwisko};

        $url = $baseUrl + 'dodawanieKomentarza/ajax';

        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: dodajKomentarz},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.wszystkieKomentarze p').remove();

                json.dodawanieKomentarzaTab.forEach(item=> {

                    $row = "<p class='listaKomentarzy' style='text-align: left;'>" +
                        "<span style='color:rgb(96, 19, 108); font-weight: bold;font-size: 14px;'>" +
                        item.User +
                        "</span>" + "</br>"+
                        "<span style='color:rgba(0,0,0,0.5);'>" +
                        item.DataDodania.substring(0,16) +
                        "</span>" + "</br>"+
                        "<span style='text-wrap: normal; color: black; font-size: 14px;'>" +
                        item.Komentarz +
                        "</span>" +
                        "</p>";

                    $('.wszystkieKomentarze').append($row);

                });

            }
        })
        }  else {
            komunikatProgres('Wypełnij wymagane pole','error');
        }
    })







});