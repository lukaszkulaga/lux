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
        $('.wykonawcaTbodyTr').remove();

        // $('#klientDodaj').val(0);
        // $('#kategoriaDodaj').val(0);
        // $('#adresDodaj').val(0);
        // $('#nrLokaluDodaj').val('');
        // $('#terminOdDodaj').val('');
        // $('#terminDoDodaj').val('');
        // $('#godzinaOdDodaj').val('');
        // $('#godzinaDoDodaj').val('');
        // $('#opisDodaj').val('');
        // $('#priorytetDodaj').val(0);

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

        // alert($idKlienta);
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
                    var IdKategoriaTab = '<td style="width:4%" class="IdKategoriaTab">' + item.IdKategoria + '</td>';
                    var IdPriorytetTab = '<td style="width:4%" class="IdPriorytetTab">' + item.IdPriorytet + '</td>';
                    var NrLokaluTab = '<td style="width:4%" class="nrLokaluTab">' + item.DokladnaLokalizacja + '</td>';
                    var IdStatusTab = '<td style="width:4%" class="IdStatusTab">' + item.IdStatus + '</td>';
                    var opisTab = '<td style="width:4%" class="opisTab">' + item.Opis + '</td>';
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
                            IdKategoriaTab +
                            IdPriorytetTab +
                            NrLokaluTab +
                            IdStatusTab +
                            opisTab +
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

        $('.wykonawcaTbodyDodawanie').append($row);
    });
    $('.wykonawcaTbodyDodawanie').on('click','.usunWykonawceButton', function(){
        $usunWykonawce = $(this).parent().parent().remove();
    });






    // ----------------------------------  EDYCJA ZGLOSZEN  ------------------------------------------------------


    // generuje sie dynamiczna tabela z wykonawcami na podstawie wyboru wykonawców z selecta - całość zapisuje sie po klinieciu button edytuj
    $('#wykonawcaEdytuj').on('change', function(){

        $idWykonawca = $(this).val();
        $wykonawcaText= $('#wykonawcaEdytuj option:selected').text();

        var wykonawcaId = '<td class="idWykonawca" style="display: none" >' + $idWykonawca + '</td>';
        var wykonawca = '<th class="wykonawcaJS" scope="row">' + $wykonawcaText + '</th>';
        var usun = '<td  class="usunWykonawceTab"><button title="Usuń" type="button" class="usunWykonawceButton"><svg class="koszIcons" style="width: 1vw;height: 2vh"></svg></button></td>';

        $row = "<tr class='wykonawcaTbodyTr'>" +
            wykonawcaId +
            wykonawca +
            usun +
            "</tr>";

        $('.wykonawcaTbodyEdycja').append($row);
    });
    $('.wykonawcaTbodyEdycja').on('click','.usunWykonawceButton', function(){
        $usunWykonawce = $(this).parent().parent().remove();
    });


    // generuje sie dynamiczny select adresów w zależności od wybranego klienta
    $('#klientEdytuj').on('change', function(){

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

                $('#adresDynamicznyEdycja select').remove();
                $('#adresDynamicznyEdycja div').remove();

                $optionSelected = '<option selected="selected" value="0" disabled>--wybierz--</option>';
                $div = '<div class="field-placeholder-zgloszenia"><span>Adres</span></div>';
                $wynik = '';

                for(var i=0;json.adresSlownik.length > i; i++){

                    $option = '<option value=' + json.adresSlownik[i]['IdAdres'] + '>' + json.adresSlownik[i]['Adres'] + ' </option>';

                    $wynik = $wynik + $option;
                }

                $row = "<select id='adresEdytuj'>" +
                    $optionSelected +
                    $wynik +
                    "</select>" + $div;

                $('#adresDynamicznyEdycja').append($row);


                $('#adresEdytuj').val($adresDlaEdycji); // ustawiamy adres zgodny z adresem ze zgłoszenia ( z tabeli )
                $adresDlaEdycji = '0'; // ustawiamy 0 zeby wyswietlało na start --wybierz-- w polu adres przy zmianie klienta
            }
        })
    });


    $adresDlaEdycji = ''; // potrzebne do wyświetlenia prawidłowego adresu w sekcji edycji zgłoszenia.
    $('.zgloszeniaTbody').on('click','tr',function() {

        $(".edytowanieZgloszenia").show();
        $(".dodawanieZgloszenia").hide();
        $('.wykonawcaTbodyTr').remove();

        $IdZgloszeniaTab = $(this).find('.IdZgloszeniaTab').text();
        $adresTab = $(this).find('.IdAdresTab').text();
        $klientTab = $(this).find('.IdKlientaTab').text();
        // zapis do inputa utworzonego w sekcji edytowania zgłoszenia - potrzebne do edycji danych po kliknieciu przycisku edytuj.
        $('#idZgloszeniaEdycja').val($IdZgloszeniaTab);


        // na samym dole wywolujemy zdarzenie do dynamicznej generacji adresu w sekcji edycji zgloszenia a ustawienie
        // Id klienta w polu $('#klientEdytuj') jest potrzebne zeby ajax sie wykonał w tym zdarzeniu wywoływanym na dole
        // ( mozna tutaj ajaxa w tym zdarzeniu '.zgloszeniaTbody' ustawic async:false i w ciele ajaxa poustawiac dane).
        // #adresEdytuj tutaj ustawiamy a w zdarzeniu generujacym dynamicznie adres pobieramy value i je tam ustawiamy
        $('#klientEdytuj').val($klientTab);
        $adresDlaEdycji = $adresTab; // zmienna przechowuje id adresu z klikniętego tr w tabeli

        let edycjaZgloszeniaArr = {'IdZgloszeniaTab':$IdZgloszeniaTab};

        $url = $baseUrl + 'listaZgloszen/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: edycjaZgloszeniaArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);
                console.log(json.zgloszeniaArr);
                console.log(json.wykonawcaArr);

                json.zgloszeniaArr.forEach(item=> {

                    $('#kategoriaEdytuj').val(item.IdKategoria);
                    $('#priorytetEdytuj').val(item.IdPriorytet);
                    $('#opisEdytuj').val(item.Opis);
                    $('#nrLokaluEdytuj').val(item.DokladnaLokalizacja);
                    $('#terminOdEdytuj').val(item.PlanowanaRealizacjaOd);
                    $('#terminDoEdytuj').val(item.PlanowanaRealizacjaDo);
                    $('#godzinaOdEdytuj').val(item.GodzinaOd);
                    $('#godzinaDoEdytuj').val(item.GodzinaDo);

                });



                json.wykonawcaArr.forEach(item=> {

                    var IdZgloszeniaWykonawca = '<td class="idZgloszeniaWykonawca" style="display: none" >' + item.IdZgloszeniaWykonawca + '</td>';
                    var wykonawcaId = '<td class="idWykonawca" style="display: none" >' + item.IdUzytkownika + '</td>';
                    var wykonawca = '<th class="wykonawcaJS" scope="row">' + item.Wykonawca + '</th>';
                    var usun = '<td  class="usunWykonawceTab"><button title="Usuń" type="button" class="usunWykonawceButton"><svg class="koszIcons" style="width: 1vw;height: 2vh"></svg></button></td>';

                    $row = "<tr class='wykonawcaTbodyTr'>" +
                        IdZgloszeniaWykonawca +
                        wykonawcaId +
                        wykonawca +
                        usun +
                        "</tr>";

                 //   sprawdzamy ' ' bo tak jest w select ( concat ma ' ' i wstawia sie pusty string jak nie ma zadnego wykonawcy i wyswietla sie tylko kosz )
                    if(json.wykonawcaArr[0]['Wykonawca'] !== ' '){
                    $('.wykonawcaTbodyEdycja').append($row);
                       }
                });

            }
        })

        // wywołujemy to zdarzenie aby w sekcji edycji zgłoszenia dynamicznie ustawic adres
        $('#klientEdytuj').change();
    });



    $('#buttonEdytujZgloszenie').on('click',function(){

        $idZgloszenia = $('#idZgloszeniaEdycja').val();
        $idKlienta = $('#klientEdytuj').val();
        $kategoriaEdytuj = $('#kategoriaEdytuj').val();
        $idAdres = $('#adresEdytuj').val();
        $nrLokaluEdytuj = $('#nrLokaluEdytuj').val();
        $terminOdEdytuj = $('#terminOdEdytuj').val();
        $terminDoEdytuj = $('#terminDoEdytuj').val();
        $godzinaOdEdytuj = $('#godzinaOdEdytuj').val();
        $godzinaDoEdytuj = $('#godzinaDoEdytuj').val();
        $opisEdytuj = $('#opisEdytuj').val();
        $priorytetEdytuj = $('#priorytetEdytuj').val();


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

        let zgloszenieArr = {'listaWykonawcow':$listaWykonawcowArr,'idZgloszenia':$idZgloszenia,'idKlienta':$idKlienta,'idAdres':$idAdres,
            'kategoriaEdytuj':$kategoriaEdytuj,'nrLokaluEdytuj':$nrLokaluEdytuj,'terminOdEdytuj':$terminOdEdytuj,
            'terminDoEdytuj':$terminDoEdytuj,'godzinaOdEdytuj':$godzinaOdEdytuj,'godzinaDoEdytuj':$godzinaDoEdytuj,
            'opisEdytuj':$opisEdytuj,'priorytetEdytuj':$priorytetEdytuj};

        $url = $baseUrl + 'edytujZgloszenie/ajax';
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


                   alert(item.Wykonawca);

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
                    var IdKategoriaTab = '<td style="width:4%" class="IdKategoriaTab">' + item.IdKategoria + '</td>';
                    var IdPriorytetTab = '<td style="width:4%" class="IdPriorytetTab">' + item.IdPriorytet + '</td>';
                    var NrLokaluTab = '<td style="width:4%" class="nrLokaluTab">' + item.DokladnaLokalizacja + '</td>';
                    var IdStatusTab = '<td style="width:4%" class="IdStatusTab">' + item.IdStatus + '</td>';
                    var opisTab = '<td style="width:4%" class="opisTab">' + item.Opis + '</td>';
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
                        IdKategoriaTab +
                        IdPriorytetTab +
                        NrLokaluTab +
                        IdStatusTab +
                        opisTab +
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


    // /*
    // *
    // *  usuwanie wykonawców
    // *
    // * */
    //
    // $('.wykonawcaTbodyEdycja').on('click','.usunWykonawceButton',function(){
    //
    //     $idZgloszeniaWykonawca = $(this).parent().parent().find('.idZgloszeniaWykonawca').text();
    //
    //     alert($idZgloszeniaWykonawca);
    //
    //
    //
    //
    // });





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
        // $(".zgloszeniaTbodyTr").hide();
    });






});



































