

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

    $('.zamknijSekcje').on('click', function(){
        $('.zmianyKomentarze').hide();
        $('.edytowanieZgloszenia').show();
    });



    $('#dodajKomentarz').on('click',function(){

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
                alert('przyszedl');

                $('.wszystkieKomentarze p').remove();

                json.dodawanieKomentarzaTab.forEach(item=> {

                    $row = "<p class='listaKomentarzy'>" +
                                "<span>" +
                                    item.Komentarz +
                                "</span>" + "</br>"+
                                "<span>" +
                                    item.DataDodania.substring(0,16) +
                                "</span>" +
                            "</p>";

                    $('.wszystkieKomentarze').append($row);

                });

            }
        })
    })







});