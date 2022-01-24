$(document).ready(function () {

    /*
    *    zmienne globalne
    * */
    $baseUrl = $('#baseUrl').val();

    $(".komunikat").hide();
    $(".komunikatError").hide();

    $(".dodawanieZgloszenia").hide();
    $(".edytowanieZgloszenia").hide();

    $(".sekcjaHistoriaZgloszen").hide(); // musi byc hide. Gdyby nie działała normalna tabelka (suwak) to oznacza ze ta ją pokrywa.
    $(".sekcjaButtonHistoria").hide();






    // ----------------------------------  DODAWANIE ZGLOSZEN  ------------------------------------------------------


    $('.zamknijSekcje').on('click', function(){
        $(".dodawanieZgloszenia").hide();
        $(".edytowanieZgloszenia").hide();
    });
    $('.dodajZgloszenie').on('click', function(){
        $(".dodawanieZgloszenia").show();
        $(".edytowanieZgloszenia").hide();
    });

    $('#buttonZapiszZgloszenie').on('click',function(){

        $idKlienta = $('#klientDodaj').val();
        $kategoriaDodaj = $('#kategoriaDodaj').val();
        $idAdres = $('#adresDodaj').val();
        $nrLokaluDodaj= $('#nrLokaluDodaj').val();
        $terminOdDodaj= $('#terminOdDodaj').val();
        $terminDoDodaj= $('#terminDoDodaj').val();
        $godzinaOdDodaj = $('#godzinaOdDodaj').val();
        $godzinaDoDodaj= $('#godzinaDoDodaj').val();
        $opisDodaj= $('#opisDodaj').val();
        $priorytetDodaj= $('#priorytetDodaj').val();

        //alert($idKlienta);
        // alert($kategoriaDodaj);
        // alert($idAdres);
        // alert($nrLokaluDodaj);
        // alert($terminOdDodaj);
        // alert($terminDoDodaj);
        // alert($godzinaOdDodaj);
        // alert($godzinaDoDodaj);
        // alert($opisDodaj);
        // alert($priorytetDodaj);

        $listaWykonawcowArr = [];

        $('.wykonawcaTbodyTr').each(function() {

            $wykonawca = $(this).find(".idWykonawca").text();

            if($wykonawca !== ''){
                $listaWykonawcowArr.push($wykonawca);
            }
        });

        if($listaWykonawcowArr.length === 0){
            $listaWykonawcowArr = '';
        }


        let zgloszenieArr = {'listaWykonawcow':$listaWykonawcowArr,'idKlienta':$idKlienta,'idAdres':$idAdres,
            'kategoriaDodaj':$kategoriaDodaj,'nrLokaluDodaj':$nrLokaluDodaj,'terminOdDodaj':$terminOdDodaj,
        'terminDoDodaj':$terminDoDodaj,'godzinaOdDodaj':$godzinaOdDodaj,'godzinaDoDodaj':$godzinaDoDodaj,
        'opisDodaj':$opisDodaj,'priorytetDodaj':$priorytetDodaj};

        $url = $baseUrl + 'zapiszZgloszenie/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: zgloszenieArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.zgloszeniaTbody tr').remove();

                json.zgloszeniaArr.forEach(item=> {

                    if(item.Nazwa === null){
                        $Nazwa =  '';
                    } else {
                        $Nazwa = item.Nazwa;
                    }
                    if(item.Kategoria === null){
                        $Kategoria =  '';
                    } else {
                        $Kategoria = item.Kategoria;
                    }
                    if(item.Priorytet === null){
                        $Priorytet =  '';
                    } else {
                        $Priorytet = item.Priorytet;
                    }

                    var IdZgloszeniaTab = '<th style="width:4%" class="IdZgloszeniaTab" scope="row">' + item.IdZgloszenia + '</th>';
                    var IdKlientaTab = '<td style="width:4%" class="IdKlientaTab">' + item.IdKlienta + '</td>';
                    var IdAdresTab = '<td style="width:4%" class="IdAdresTab">' + item.IdAdres + '</td>';
                    var dataZgloszeniaTab = '<td style="width:8%" class="dataZgloszeniaTab">' + item.DataDodania + '</td>';
                    var planowanaRealizacjaTab = '<td style="width:15%" class="planowanaRealizacjaTab">' + item.PlanowanaRealizacja + '</td>';
                    var adresTab = '<td style="width:15%" class="adresTab">' + item.Adres + '</td>';
                    var klientTab = '<td style="width:15%" class="klientTab">' + $Nazwa + '</td>';
                    var wykonawcaTab = '<td style="width:10%" class="wykonawcaTab">' + item.Wykonawca + '</td>';
                    var kategoriaTab = '<td style="width:10%" class="kategoriaTab">' + $Kategoria + '</td>';
                    var priorytetTab = '<td style="width:9%" class="priorytetTab">' + $Priorytet + '</td>';
                    var statusTab = '<td style="width:9%" class="statusTab">' + item.Status + '</td>';

                    $row = "<tr class='zgloszeniaTbodyTr'>" +
                            IdZgloszeniaTab +
                            IdKlientaTab +
                            IdAdresTab +
                            dataZgloszeniaTab +
                            planowanaRealizacjaTab +
                            adresTab +
                            klientTab +
                            wykonawcaTab +
                            kategoriaTab +
                            priorytetTab +
                            statusTab +
                        "</tr>";

                    $('.zgloszeniaTbody').append($row);
                });
            }
        })



    });


    // generuje sie dynamiczny select adresów w zależności od wybranego klienta
    $('#klientDodaj').on('change', function(){

        $idKlienta = $(this).val();

        let klientDodajArr = {'idKlienta':$idKlienta};

        $url = $baseUrl + 'dynamicznyAdres/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: klientDodajArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json.adresSlownik);

                $('#adresDynamiczny select').remove();
                $('#adresDynamiczny div').remove();

                    $optionSelected = '<option selected="selected" value="0" disabled>--wybierz--</option>';
                    $div = '<div class="field-placeholder-zgloszenia"><span>Adres</span></div>';
                    $wynik = '';

                    for(var i=0;json.adresSlownik.length > i; i++){

                        $option = '<option value=' + json.adresSlownik[i]['IdAdres'] + '>' + json.adresSlownik[i]['Adres'] + ' </option>';

                        $wynik = $wynik + $option;
                    }

                    $row = "<select id='adresDodaj'>" +
                        $optionSelected +
                        $wynik +
                        "</select>" + $div;

                 $('#adresDynamiczny').append($row);
            }
        })

    });

    // generuje sie dynamiczna tabela z wykonawcami na podstawie wyboru wykonawców z selecta - całość zapisuje sie po klinieciu button zapisz
    $('#wykonawcaDodaj').on('change', function(){

        $idWykonawca = $(this).val();
        $wykonawcaText= $('#wykonawcaDodaj option:selected').text();

        var wykonawcaId = '<td class="idWykonawca" style="display: none" >' + $idWykonawca + '</td>';
        var wykonawca = '<th class="wykonawcaJS" scope="row">' + $wykonawcaText + '</th>';
        var usun = '<td  class="usunWykonawceTab"><button title="Usuń" type="button" class="usunWykonawceButton"><svg class="koszIcons" style="width: 1vw;height: 2vh"></svg></button></td>';

        $row = "<tr class='wykonawcaTbodyTr'>" +
            wykonawcaId +
            wykonawca +
            usun +
            "</tr>";

        $('.wykonawcaTbody').append($row);
    });
    $('.wykonawcaTbody').on('click','.usunWykonawceButton', function(){
        $usunWykonawce = $(this).parent().parent().remove();
    });





    // ----------------------------------  EDYCJA ZGLOSZEN  ------------------------------------------------------




    $('.zgloszeniaTbody').on('click','tr',function() {

        $(".edytowanieZgloszenia").show();
        $(".dodawanieZgloszenia").hide();

        $IdZgloszeniaTab = $(this).find('.IdZgloszeniaTab').text();
        $IdKlientaTab = $(this).find('.IdKlientaTab').text();

        alert($IdZgloszeniaTab);
        alert($IdKlientaTab);
    });






// ----------------------------------  HISTORIA ZGLOSZEN  ------------------------------------------------------




    $('.pokazZgloszenia').on('click', function(){

        $(".sekcjaZgloszenia").show();
        $(".sekcjaButtonZgloszenia").show();
        $(".sekcjaHistoriaZgloszen").hide();
        $(".sekcjaButtonHistoria").hide();
    });

    $('.pokazHistorie').on('click', function(){

        $(".sekcjaHistoriaZgloszen").show();
        $(".sekcjaButtonHistoria").show();
        $(".sekcjaZgloszenia").hide();
        $(".sekcjaButtonZgloszenia").hide();
    });






});



































