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
    $(".sekcjaFiltrowHistoria").hide();



    /*
  *
  * Sekcja filtrowania zgłoszeń
  *
  * */


    $('.filtrZgloszenia,#wyczysc').on('keyup change click',function(){


        if((this).id === 'wyczysc') {
            $nrZgloszeniaFiltr = '';
            $dataDodaniaOdFiltr = '';
            $dataDodaniaDoFiltr = '';
            $planowanaRealizacjaFiltr = '';
            $adresFiltr = '';
            $klientFiltr = '';
            $wykonawcaFiltr = '';
            $kategoriaFiltr = '';
            $priorytetFiltr = '';
            $statusFiltr = '';
        } else {
            $nrZgloszeniaFiltr = $('#nrZgloszeniaFiltr').val();
            $dataDodaniaOdFiltr = $('#dataDodaniaOdFiltr').val();
            $dataDodaniaDoFiltr = $('#dataDodaniaDoFiltr').val();
            $planowanaRealizacjaFiltr = $('#planowanaRealizacjaFiltr').val();
            $adresFiltr = $('#adresFiltr').val();
            $klientFiltr = $('#klientFiltr').val();
            $wykonawcaFiltr = $('#wykonawcaFiltr').val();
            $kategoriaFiltr = $('#kategoriaFiltr').val();
            $priorytetFiltr = $('#priorytetFiltr').val();
            $statusFiltr = $('#statusFiltr').val();
        }



        let zgloszeniaFiltrArr = {'nrZgloszeniaFiltr':$nrZgloszeniaFiltr,'dataDodaniaOdFiltr':$dataDodaniaOdFiltr,
            'dataDodaniaDoFiltr':$dataDodaniaDoFiltr,'planowanaRealizacjaFiltr':$planowanaRealizacjaFiltr,
            'adresFiltr':$adresFiltr,'klientFiltr':$klientFiltr,'wykonawcaFiltr':$wykonawcaFiltr,
            'kategoriaFiltr':$kategoriaFiltr,'priorytetFiltr':$priorytetFiltr,'statusFiltr':$statusFiltr};

        $url = $baseUrl + 'filtrujZgloszenia/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: zgloszeniaFiltrArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.zgloszeniaTbody tr').remove();

                json.filtrujZgloszeniaArr.forEach(item=> {

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
                    var IdKlientaTab = '<td style="width:4%;display:none" class="IdKlientaTab">' + item.IdKlienta + '</td>';
                    var IdAdresTab = '<td style="width:4%;display:none" class="IdAdresTab">' + item.IdAdres + '</td>';
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
        });
    })




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

                json.zgloszeniaArr.zgloszeniaRepo.forEach(item=> {

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
                    var IdKlientaTab = '<td style="width:4%;display:none" class="IdKlientaTab">' + item.IdKlienta + '</td>';
                    var IdAdresTab = '<td style="width:4%;display:none" class="IdAdresTab">' + item.IdAdres + '</td>';
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

                    ajax_file_upload(fileobj,json.zgloszeniaArr.idZgloszeniaRepo);

            }
        })
    });


    /*
    *
    *  dodawanie ścieżki pliku do bazy - funkcja ajax_file_upload wywolywana jest po zapisaniu wszystkich innych danych
    * ponieważ wtedy możemy skorzystac z wygenerowanego IdZgloszenia i przekazac je do tej funkcji
    *
    * */

    const image_drop_area = document.querySelector("#drop_file_zone");
    var fileobj = [];

    image_drop_area.addEventListener('drop', (event) => {

        event.preventDefault();

        $output = document.querySelector('.img-content');
        $('.zalaczniki .zalacznikiArr').remove();
        $row = '';

        for ($i = 0; $i < event.dataTransfer.files.length; $i++) {

            fileobj.push(event.dataTransfer.files[$i]);

            var zalacznik = '<th class="zalacznikJS" scope="row">' + event.dataTransfer.files[$i]['name'] + '</th>';
            var usun = '<td  class="zalacznikTab"><button title="Usuń" type="button" class="usunZalacznikButton"><svg class="koszIcons" style="width: 1vw;height: 2vh"></svg></button></td>';

            $row = $row + "<tr class='zalacznikTbodyTr'>" +
                zalacznik +
                usun +
                "</tr>";
        }

        $('.zalacznikTbodyDodawanie').append($row);

    });
    $('.zalacznikTbodyDodawanie').on('click','.usunZalacznikButton', function(){
        $usunZalacznik = $(this).parent().parent().remove();
    });

    $('#file_explorer').on('click',function(){
        document.getElementById('selectfile').click();
        document.getElementById('selectfile').onchange = function() {

            $len = document.getElementById('selectfile').files;

            for ($i = 0; $i < $len.length; $i++) {
                fileobj.push(document.getElementById('selectfile').files[$i]);
            }
        };
    });
    function ajax_file_upload(file_obj,idZgloszenia) {

        if(file_obj != undefined) {

            for( $i=0; $i < fileobj.length; $i++ ){

                $form_data = new FormData();
                $form_data.append('file', file_obj[$i]);
                $form_data.append('IdZgloszenia', idZgloszenia);

                $url = $baseUrl + 'dodajZalacznik/ajax';
                $.ajax({
                    url: $url,
                    type: 'POST',
                    data: $form_data,
                    format: 'json',
                    dataType: 'text',
                    processData: false,
                    contentType: false,
                    success: function (response) {

                        console.log(response);

                    }
                })
            }

        }
    }



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
                    $('#statusEdytuj').val(item.IdStatus);
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
        $statusEdytuj = $('#statusEdytuj').val();
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
            'statusEdytuj':$statusEdytuj,'opisEdytuj':$opisEdytuj,'priorytetEdytuj':$priorytetEdytuj};

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
                    var IdKlientaTab = '<td style="width:4%;display:none" class="IdKlientaTab">' + item.IdKlienta + '</td>';
                    var IdAdresTab = '<td style="width:4%;display:none" class="IdAdresTab">' + item.IdAdres + '</td>';
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





// ----------------------------------  HISTORIA ZGLOSZEN  ------------------------------------------------------

    /*
  *
  * Sekcja filtrowania zgłoszeń historycznych
  *
  * */


    $('.filtrZgloszeniaHistoria,#wyczyscFiltrHistoria').on('keyup change click',function(){


        if((this).id === 'wyczyscFiltrHistoria') {
            $nrZgloszeniaFiltr = '';
            $dataDodaniaOdFiltr = '';
            $dataDodaniaDoFiltr = '';
            $planowanaRealizacjaFiltr = '';
            $adresFiltr = '';
            $klientFiltr = '';
            $wykonawcaFiltr = '';
            $kategoriaFiltr = '';
            $priorytetFiltr = '';
            $statusFiltr = '';
        } else {
            $nrZgloszeniaFiltr = $('#nrZgloszeniaFiltrHistoria').val();
            $dataDodaniaOdFiltr = $('#dataDodaniaOdFiltrHistoria').val();
            $dataDodaniaDoFiltr = $('#dataDodaniaDoFiltrHistoria').val();
            $planowanaRealizacjaFiltr = $('#planowanaRealizacjaFiltrHistoria').val();
            $adresFiltr = $('#adresFiltrHistoria').val();
            $klientFiltr = $('#klientFiltrHistoria').val();
            $wykonawcaFiltr = $('#wykonawcaFiltrHistoria').val();
            $kategoriaFiltr = $('#kategoriaFiltrHistoria').val();
            $priorytetFiltr = $('#priorytetFiltrHistoria').val();
            $statusFiltr = $('#statusFiltrHistoria').val();
        }



        let zgloszeniaFiltrHistoriaArr = {'nrZgloszeniaFiltr':$nrZgloszeniaFiltr,'dataDodaniaOdFiltr':$dataDodaniaOdFiltr,
            'dataDodaniaDoFiltr':$dataDodaniaDoFiltr,'planowanaRealizacjaFiltr':$planowanaRealizacjaFiltr,
            'adresFiltr':$adresFiltr,'klientFiltr':$klientFiltr,'wykonawcaFiltr':$wykonawcaFiltr,
            'kategoriaFiltr':$kategoriaFiltr,'priorytetFiltr':$priorytetFiltr,'statusFiltr':$statusFiltr};

        $url = $baseUrl + 'filtrujZgloszeniaHistoria/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: zgloszeniaFiltrHistoriaArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.zgloszeniaHistoriaTbody tr').remove();

                json.zgloszeniaFiltrHistoriaArr.filtrHistoriaSQL.forEach(item=> {


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
                    var IdKlientaTab = '<td style="width:4%;display:none" class="IdKlientaTab">' + item.IdKlienta + '</td>';
                    var IdAdresTab = '<td style="width:4%;display:none" class="IdAdresTab">' + item.IdAdres + '</td>';
                    var dataZgloszeniaTab = '<td style="width:8%" class="dataZgloszeniaTab">' + item.DataDodania + '</td>';
                    var dataRozwiazaniaTab = '<td style="width:15%" class="dataRozwiazaniaTab">' + item.DataModyfikacji + '</td>';
                    var adresTab = '<td style="width:15%" class="adresTab">' + item.Adres + '</td>';
                    var klientTab = '<td style="width:15%" class="klientTab">' + $Nazwa + '</td>';
                    var wykonawcaTab = '<td style="width:10%" class="wykonawcaTab">' + item.Wykonawca + '</td>';
                    var kategoriaTab = '<td style="width:10%" class="kategoriaTab">' + $Kategoria + '</td>';
                    var priorytetTab = '<td style="width:9%" class="priorytetTab">' + $Priorytet + '</td>';
                    var statusTab = '<td style="width:9%;display:none" class="statusTab">' + item.Status + '</td>';


                    $opt ='';
                    $len = json.zgloszeniaFiltrHistoriaArr.slownikStatus.length;
                    // $selected =  '<option selected="selected" value="0" disabled>--wybierz--</option>';
                    for($i=0; $i < $len; $i++){
                        $opt = $opt + '<option value="' +json.zgloszeniaFiltrHistoriaArr.slownikStatus[$i]['IdStatus']+ '">' + json.zgloszeniaFiltrHistoriaArr.slownikStatus[$i]['Opis'] + '</option>';
                    }

                    var statusSelectTab =
                        '<td style="width:9%" class="statusSelectTab">'+
                        '<div style="width:10vw;float: left">'+
                        '<div class="field-wrapper">'+
                        '<select class="status" id="statusSelect">' +
                        // '<option value="' + item.IdStatus + '" >' + item.Status + '</option>' +
                        '<option selected="selected" value="0" disabled>--wybierz--</option>' +
                        $opt +
                        '</select>'+
                        '<div class="field-placeholder"><span>Status</span></div>'+
                        '</div>'+
                        '</div>'+
                        '</td>';

                    var statusId = '<td style="width:9%;display:none" class="idStatusTab">' + item.IdStatus + '</td>';

                    $row = "<tr class='zgloszeniaHistoriaTbodyTr'>" +
                        IdZgloszeniaTab +
                        IdKlientaTab +
                        IdAdresTab +
                        dataZgloszeniaTab +
                        dataRozwiazaniaTab +
                        adresTab +
                        klientTab +
                        wykonawcaTab +
                        kategoriaTab +
                        priorytetTab +
                        statusTab +
                        statusSelectTab +
                        statusId +
                        "</tr>";

                    $('.zgloszeniaHistoriaTbody').append($row);


                    // dynamiczne ustawianie wartości dla selecta status w tabeli
                    $('.zgloszeniaHistoriaTbodyTr').each(function() {
                        $idStatus = $(this).find(".idStatusTab").text();
                        $status = $(this).find(".status").val($idStatus);
                    });

                });

            }
        });
    })


    $('.pokazZgloszenia').on('click', function(){

        $(".sekcjaZgloszenia").show();
        $(".sekcjaButtonZgloszenia").show();
        $(".sekcjaFiltrow").show();
        $(".sekcjaHistoriaZgloszen").hide();
        $(".sekcjaButtonHistoria").hide();
        $(".dodawanieZgloszenia").hide();
        $(".edytowanieZgloszenia").hide();
        $(".sekcjaFiltrowHistoria").hide();

        $('#nrZgloszeniaFiltr').val('');
        $('#dataDodaniaOdFiltr').val('');
        $('#dataDodaniaDoFiltr').val('');
        $('#planowanaRealizacjaFiltr').val('');
        $('#adresFiltr').val('');
        $('#klientFiltr').val('');
        $('#wykonawcaFiltr').val('');
        $('#kategoriaFiltr').val('');
        $('#priorytetFiltr').val('');
        $('#statusFiltr').val('');


        $url = $baseUrl + 'pokazZgloszenia/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: ''},
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
                    var IdKlientaTab = '<td style="width:4%;display:none" class="IdKlientaTab">' + item.IdKlienta + '</td>';
                    var IdAdresTab = '<td style="width:4%;display:none" class="IdAdresTab">' + item.IdAdres + '</td>';
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

    $('.pokazHistorie').on('click', function(){

        $(".sekcjaFiltrowHistoria").show();
        $(".sekcjaHistoriaZgloszen").show();
        $(".sekcjaButtonHistoria").show();
        $(".sekcjaZgloszenia").hide();
        $(".sekcjaButtonZgloszenia").hide();
        $(".dodawanieZgloszenia").hide();
        $(".edytowanieZgloszenia").hide();
        $(".sekcjaFiltrow").hide();

        $('#nrZgloszeniaFiltrHistoria').val('');
        $('#dataDodaniaOdFiltrHistoria').val('');
        $('#dataDodaniaDoFiltrHistoria').val('');
        $('#planowanaRealizacjaFiltrHistoria').val('');
        $('#adresFiltrHistoria').val('');
        $('#klientFiltrHistoria').val('');
        $('#wykonawcaFiltrHistoria').val('');
        $('#kategoriaFiltrHistoria').val('');
        $('#priorytetFiltrHistoria').val('');
        $('#statusFiltrHistoria').val('');


        $url = $baseUrl + 'historiaZgloszen/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: ''},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.zgloszeniaHistoriaTbody tr').remove();

                json.zgloszeniaHistoriaArr.zgloszeniaHistoria.forEach(item=> {


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
                    var IdKlientaTab = '<td style="width:4%;display:none" class="IdKlientaTab">' + item.IdKlienta + '</td>';
                    var IdAdresTab = '<td style="width:4%;display:none" class="IdAdresTab">' + item.IdAdres + '</td>';
                    var dataZgloszeniaTab = '<td style="width:8%" class="dataZgloszeniaTab">' + item.DataDodania + '</td>';
                    var dataRozwiazaniaTab = '<td style="width:15%" class="dataRozwiazaniaTab">' + item.DataModyfikacji + '</td>';
                    var adresTab = '<td style="width:15%" class="adresTab">' + item.Adres + '</td>';
                    var klientTab = '<td style="width:15%" class="klientTab">' + $Nazwa + '</td>';
                    var wykonawcaTab = '<td style="width:10%" class="wykonawcaTab">' + item.Wykonawca + '</td>';
                    var kategoriaTab = '<td style="width:10%" class="kategoriaTab">' + $Kategoria + '</td>';
                    var priorytetTab = '<td style="width:9%" class="priorytetTab">' + $Priorytet + '</td>';
                    var statusTab = '<td style="width:9%;display:none" class="statusTab">' + item.Status + '</td>';


                    $opt ='';
                    $len = json.zgloszeniaHistoriaArr.slownikStatus.length;
                    // $selected =  '<option selected="selected" value="0" disabled>--wybierz--</option>';
                    for($i=0; $i < $len; $i++){
                        $opt = $opt + '<option value="' +json.zgloszeniaHistoriaArr.slownikStatus[$i]['IdStatus']+ '">' + json.zgloszeniaHistoriaArr.slownikStatus[$i]['Opis'] + '</option>';
                    }

                    var statusSelectTab =
                        '<td style="width:9%" class="statusSelectTab">'+
                        '<div style="width:10vw;float: left">'+
                        '<div class="field-wrapper">'+
                        '<select class="status" id="statusSelect">' +
                        // '<option value="' + item.IdStatus + '" >' + item.Status + '</option>' +
                        '<option selected="selected" value="0" disabled>--wybierz--</option>' +
                        $opt +
                        '</select>'+
                        '<div class="field-placeholder"><span>Status</span></div>'+
                        '</div>'+
                        '</div>'+
                        '</td>';

                    var statusId = '<td style="width:9%;display:none" class="idStatusTab">' + item.IdStatus + '</td>';

                    $row = "<tr class='zgloszeniaHistoriaTbodyTr'>" +
                        IdZgloszeniaTab +
                        IdKlientaTab +
                        IdAdresTab +
                        dataZgloszeniaTab +
                        dataRozwiazaniaTab +
                        adresTab +
                        klientTab +
                        wykonawcaTab +
                        kategoriaTab +
                        priorytetTab +
                        statusTab +
                        statusSelectTab +
                        statusId +
                        "</tr>";

                    $('.zgloszeniaHistoriaTbody').append($row);


                    // dynamiczne ustawianie wartości dla selecta status w tabeli
                    $('.zgloszeniaHistoriaTbodyTr').each(function() {
                        $idStatus = $(this).find(".idStatusTab").text();
                        $status = $(this).find(".status").val($idStatus);
                    });

                });
            }
        })

    });


    $('.zgloszeniaHistoriaTbody').on('change','.status', function(){

       $valSelectStatus =  $(this).val();
       $idZgloszenia =  $(this).parent().parent().parent().parent().find(".IdZgloszeniaTab").text();



        let zgloszenieHistArr = {'valSelectStatus':$valSelectStatus,'idZgloszenia':$idZgloszenia};


        $url = $baseUrl + 'historiaZgloszenEdycja/ajax';
        $.ajax({
            url: $url,
            type: 'POST',
            data: {tab: zgloszenieHistArr},
            format: 'json',
            dataType: 'text',
            success: function (response) {
                let json = JSON.parse(response);

                $('.zgloszeniaHistoriaTbody tr').remove();

                json.zgloszeniaHistoriaArr.zgloszeniaHistoria.forEach(item=> {


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
                    var IdKlientaTab = '<td style="width:4%;display:none" class="IdKlientaTab">' + item.IdKlienta + '</td>';
                    var IdAdresTab = '<td style="width:4%;display:none" class="IdAdresTab">' + item.IdAdres + '</td>';
                    var dataZgloszeniaTab = '<td style="width:8%" class="dataZgloszeniaTab">' + item.DataDodania + '</td>';
                    var dataRozwiazaniaTab = '<td style="width:15%" class="dataRozwiazaniaTab">' + item.DataModyfikacji + '</td>';
                    var adresTab = '<td style="width:15%" class="adresTab">' + item.Adres + '</td>';
                    var klientTab = '<td style="width:15%" class="klientTab">' + $Nazwa + '</td>';
                    var wykonawcaTab = '<td style="width:10%" class="wykonawcaTab">' + item.Wykonawca + '</td>';
                    var kategoriaTab = '<td style="width:10%" class="kategoriaTab">' + $Kategoria + '</td>';
                    var priorytetTab = '<td style="width:9%" class="priorytetTab">' + $Priorytet + '</td>';
                    var statusTab = '<td style="width:9%;display:none" class="statusTab">' + item.Status + '</td>';


                    $opt ='';
                    $len = json.zgloszeniaHistoriaArr.slownikStatus.length;
                    // $selected =  '<option selected="selected" value="0" disabled>--wybierz--</option>';
                    for($i=0; $i < $len; $i++){
                        $opt = $opt + '<option value="' +json.zgloszeniaHistoriaArr.slownikStatus[$i]['IdStatus']+ '">' + json.zgloszeniaHistoriaArr.slownikStatus[$i]['Opis'] + '</option>';
                    }

                    var statusSelectTab =
                        '<td style="width:9%" class="statusSelectTab">'+
                            '<div style="width:10vw;float: left">'+
                                '<div class="field-wrapper">'+
                                    '<select class="status" id="statusSelect">' +
                                        // '<option value="' + item.IdStatus + '" >' + item.Status + '</option>' +
                                        '<option selected="selected" value="0" disabled>--wybierz--</option>' +
                                         $opt +
                                    '</select>'+
                                    '<div class="field-placeholder"><span>Status</span></div>'+
                                '</div>'+
                            '</div>'+
                        '</td>';

                    var statusId = '<td style="width:9%;display:none" class="idStatusTab">' + item.IdStatus + '</td>';

                    $row = "<tr class='zgloszeniaHistoriaTbodyTr'>" +
                        IdZgloszeniaTab +
                        IdKlientaTab +
                        IdAdresTab +
                        dataZgloszeniaTab +
                        dataRozwiazaniaTab +
                        adresTab +
                        klientTab +
                        wykonawcaTab +
                        kategoriaTab +
                        priorytetTab +
                        statusTab +
                        statusSelectTab +
                        statusId +
                        "</tr>";

                    $('.zgloszeniaHistoriaTbody').append($row);


                    // dynamiczne ustawianie wartości dla selecta status w tabeli
                    $('.zgloszeniaHistoriaTbodyTr').each(function() {
                        $idStatus = $(this).find(".idStatusTab").text();
                        $status = $(this).find(".status").val($idStatus);
                    });

                });
            }
        })
    });




});






















































