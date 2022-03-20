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

    $('.zmianyKomentarze').hide();



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
        $('.zmianyKomentarze').hide();
    });
    $('.zamknijSekcjeEdycja').on('click', function(){
        $(".edytowanieZgloszenia").hide();
        $(".dodawanieZgloszenia").hide();
        $('.zmianyKomentarze').hide();
    });

    $('.dodajZgloszenie').on('click', function(){
        $(".dodawanieZgloszenia").show();
        $(".edytowanieZgloszenia").hide();
        $('.zmianyKomentarze').hide();
        $('.wykonawcaTbodyTr').remove();

        $('#klientDodaj').val(0);
        $('#kategoriaDodaj').val(0);
        $('#adresDodaj').val(0);
        $('#nrLokaluDodaj').val('');
        $('#terminOdDodaj').val('');
        $('#terminDoDodaj').val('');
        $('#godzinaOdDodaj').val('');
        $('#godzinaDoDodaj').val('');
        $('#opisDodaj').val('');
        $('#priorytetDodaj').val(0);

        $klientErr = false;
        $adresErr = false;
        $kategoriaErr = false;
        $opisErr = false;
        $priorytetErr = false;

    });




    // WALIDACJE - dodawanie zgłoszenia


    //walidacje pojedyncze

    $('#klientDodaj').on('change', function() {

        $idKlienta = $(this).val();

        // promise
        dynamicznyAdres($idKlienta).then(($result)=> {

            if ($result === false) {
                $('#adresDodaj').css('border', '1px solid rgb(209, 205, 205)');
                $adresErr = true;
            } else {
                $('#adresDodaj').css('border', '1px solid red');
                $adresErr = false;
            }

            if ($('#klientDodaj').val() !== null) {
                $('#klientDodaj').css('border', '1px solid rgb(209, 205, 205)');
                $klientErr = true;
            } else {
                $('#klientDodaj').css('border', '1px solid red');
                $klientErr = false;
            }
        })

    })

    // po wywołaniu zdarzenia na selektorze "#klientDodaj" wywołujemy funkcję dynamicznyAdres() a ona tworzy nowy obiekt
    // o id = adresDodaj, dlatego odwołujemy sie w tej walidacji do tego obiektu za pomocą zdarzenia oddelegowanego
    $('#adresDynamiczny').on('change','#adresDodaj',function() {

        if( $('#adresDodaj').val() !== null ) {
            $('#adresDodaj').css('border','1px solid rgb(209, 205, 205)');
            $adresErr = true;
        } else {
            $('#adresDodaj').css('border','1px solid red');
            $adresErr = false;
        }
    })

    $('#kategoriaDodaj').on('change',function(){

        if($('#kategoriaDodaj').val() !== null) {
            $('#kategoriaDodaj').css('border','1px solid rgb(209, 205, 205)');
            $kategoriaErr = true;
        } else {
            $('#kategoriaDodaj').css('border','1px solid red');
            $kategoriaErr = false;
        }
    })

    $('#priorytetDodaj').on('change', function () {

        if($('#priorytetDodaj').val() !== null) {
            $('#priorytetDodaj').css('border','1px solid rgb(209, 205, 205)');
            $priorytetErr = true;
        } else {
            $('#priorytetDodaj').css('border','1px solid red');
            $priorytetErr = false;
        }


    })

    $('#opisDodaj').on('change keyup',function() {
        if( ($('#opisDodaj').val() !== null) || ($('#opisDodaj').val() !== '') ) {
            $('#opisDodaj').css('border','1px solid rgb(209, 205, 205)');
            $opisErr = true;
        } else {
            $('#opisDodaj').css('border','1px solid red');
            $opisErr = false;
        }
    })

    // walidacja daty zgłoszenia

    $('#terminOdDodaj').on('change',function() {

        $dataOd = $('#terminOdDodaj').val();
        $dataDo = $('#terminDoDodaj').val();
        $godzinaOd = $('#godzinaOdDodaj').val();
        $godzinaDo = $('#godzinaDoDodaj').val();

        if(($dataOd > $dataDo) && ($dataDo !== '')) {
            $('#terminOdDodaj').val('');
            komunikatProgres('Data od nie może być późniejsza od daty do','error');
        }

        if (($dataOd === $dataDo)) {

            $arrayOd = $godzinaOd.split(":");
            $parseGodzinaOd = (parseInt($arrayOd[0], 10) * 60 * 60) + (parseInt($arrayOd[1], 10) * 60);

            $arrayDo = $godzinaDo.split(":");
            $parseGodzinaDo = (parseInt($arrayDo[0], 10) * 60 * 60) + (parseInt($arrayDo[1], 10) * 60);

            if($parseGodzinaOd > $parseGodzinaDo){
                $('#godzinaDoDodaj').val('');
                $('#godzinaOdDodaj').val('');
            }
        }

    });
    $('#terminDoDodaj').on('change',function() {

        $dataOd = $('#terminOdDodaj').val();
        $dataDo = $('#terminDoDodaj').val();
        $godzinaOd = $('#godzinaOdDodaj').val();
        $godzinaDo = $('#godzinaDoDodaj').val();

        if(($dataOd > $dataDo) && ($dataOd !== '')) {
            $('#terminDoDodaj').val('');
            komunikatProgres('Data do nie może być wcześniejsza od daty od','error');
        }

        if (($dataOd === $dataDo)) {

            $arrayOd = $godzinaOd.split(":");
            $parseGodzinaOd = (parseInt($arrayOd[0], 10) * 60 * 60) + (parseInt($arrayOd[1], 10) * 60);

            $arrayDo = $godzinaDo.split(":");
            $parseGodzinaDo = (parseInt($arrayDo[0], 10) * 60 * 60) + (parseInt($arrayDo[1], 10) * 60);

            if($parseGodzinaOd > $parseGodzinaDo){
                $('#godzinaDoDodaj').val('');
                $('#godzinaOdDodaj').val('');
                komunikatProgres('Godzina od nie może być późniejsza od godziny do','error');
            }
        }
    });

    // walidacja godziny zgłoszenia

    $('#godzinaOdDodaj').on('change',function() {

        $dataOd = $('#terminOdDodaj').val();
        $dataDo = $('#terminDoDodaj').val();

        if($dataOd !== '' && $dataDo !== '') {
            if (($dataOd === $dataDo)) {
                $godzinaOd = $('#godzinaOdDodaj').val();
                $godzinaDo = $('#godzinaDoDodaj').val();

                $arrayOd = $godzinaOd.split(":");
                $parseGodzinaOd = (parseInt($arrayOd[0], 10) * 60 * 60) + (parseInt($arrayOd[1], 10) * 60);

                $arrayDo = $godzinaDo.split(":");
                $parseGodzinaDo = (parseInt($arrayDo[0], 10) * 60 * 60) + (parseInt($arrayDo[1], 10) * 60);

                if (($parseGodzinaOd > $parseGodzinaDo) && ($godzinaDo !== '')) {
                    $('#godzinaOdDodaj').val('');
                    komunikatProgres('Godzina od nie może być późniejsza od godziny do','error');
                }
            }
        }
        if($dataOd === '' && $dataDo === ''){
            $('#godzinaDoDodaj').val('');
            $('#godzinaOdDodaj').val('');
            komunikatProgres('Godzina od nie może być późniejsza od godziny do','error');
        }

    });
    $('#godzinaDoDodaj').on('change',function() {

        $dataOd = $('#terminOdDodaj').val();
        $dataDo = $('#terminDoDodaj').val();

        if($dataOd !== '' && $dataDo !== ''){
            if( ($dataOd === $dataDo) ){
                $godzinaOd = $('#godzinaOdDodaj').val();
                $godzinaDo = $('#godzinaDoDodaj').val();

                $arrayOd = $godzinaOd.split(":");
                $parseGodzinaOd = (parseInt($arrayOd[0], 10) * 60 * 60) + (parseInt($arrayOd[1], 10) * 60);

                $arrayDo = $godzinaDo.split(":");
                $parseGodzinaDo = (parseInt($arrayDo[0], 10) * 60 * 60) + (parseInt($arrayDo[1], 10) * 60);

                if (($parseGodzinaOd > $parseGodzinaDo) && ($godzinaOd !== '')) {
                    $('#godzinaDoDodaj').val('');
                    komunikatProgres('Godzina do nie może być wcześniejsza od godziny od','error');
                }
            }
        }
        if($dataOd === '' && $dataDo === ''){
            $('#godzinaDoDodaj').val('');
            $('#godzinaOdDodaj').val('');
            komunikatProgres('Godzina do nie może być wcześniejsza od godziny od','error');
        }

    });

    // walidacja wykonawcy

    // generuje sie dynamiczna tabela z wykonawcami na podstawie wyboru wykonawców z selecta - całość zapisuje sie po klinieciu button zapisz
    $('#wykonawcaDodaj').on('change', function(){

        $idWykonawca = $(this).val();
        $wykonawcaText= $('#wykonawcaDodaj option:selected').text();

        $wykonawcaTbodyTr = $('.wykonawcaTbodyTr');

        for($i = 0; $wykonawcaTbodyTr.length > $i ; $i++){

            $wykonawca =  $wykonawcaTbodyTr[$i].firstChild.textContent;
            if($idWykonawca === $wykonawca) {
                $wykonawcaTbodyTr[$i].remove();
                 komunikatProgres('Wybrany wykonawca został już dodany','error');
            }
        }

        // var IdZgloszeniaWykonawca = '<td class="idZgloszeniaWykonawca" style="display: none" >' + item.IdZgloszeniaWykonawca + '</td>';
        var wykonawcaId = '<td class="idWykonawca" style="display: none" >' + $idWykonawca + '</td>';
        var wykonawca = '<th class="wykonawcaJS" scope="row">' + $wykonawcaText + '</th>';
        var usun = '<td  class="usunWykonawceTab"><button title="Usuń" type="button" class="usunWykonawceButton"><svg class="koszIcons" style="width: 1vw;height: 2vh"></svg></button></td>';

        $row = "<tr class='wykonawcaTbodyTr'>" +
            wykonawcaId +
            wykonawca +
            usun +
            "</tr>";

        $('.wykonawcaTbodyDodawanie').append($row);

        // ustawiamy na --wybierz-- ponieważ jak wybralismy jakiegos wykonawce to pojawiał sie on w tym okienku i
        // gdy ponownie chcielismy go wybrac to sie nie dało i np. dlatego nie dało sie wyswietlic komunikatu
        // że taki wykonawca jest już na liście
        $(this).val(0);
    });
    $('.wykonawcaTbodyDodawanie').on('click','.usunWykonawceButton', function(){
        $usunWykonawce = $(this).parent().parent().remove();
    });



    function walidacjaZgloszen() {

        if($klientErr === false) {
            $('#klientDodaj').css('border','1px solid red');
            $klientErr = false;
        } else {
            $('#klientDodaj').css('border','1px solid rgb(209, 205, 205)');
            $klientErr = true;
        }
        if($adresErr === false) {
            $('#adresDodaj').css('border','1px solid red');
            $adresErr = false;
        } else {
            $('#adresDodaj').css('border','1px solid rgb(209, 205, 205)');
            $adresErr = true;
        }
        if($kategoriaErr === false) {
            $('#kategoriaDodaj').css('border','1px solid red');
            $kategoriaErr = false;
        } else {
            $('#kategoriaDodaj').css('border','1px solid rgb(209, 205, 205)');
            $kategoriaErr = true;
        }
        if($opisErr === false) {
            $('#opisDodaj').css('border','1px solid red');
            $opisErr = false;
        } else {
            $('#opisDodaj').css('border','1px solid rgb(209, 205, 205)');
            $opisErr = true;
        }
        if($priorytetErr === false) {
            $('#priorytetDodaj').css('border','1px solid red');
            $priorytetErr = false;
        } else {
            $('#priorytetDodaj').css('border','1px solid rgb(209, 205, 205)');
            $priorytetErr = true;
        }

        if($klientErr === false || $adresErr === false || $kategoriaErr === false
            || $opisErr === false || $priorytetErr === false) {

            return false;

        } else {

            return true;
        }
    }


    $('#buttonZapiszZgloszenie').on('click',function(){

        $rezultat = walidacjaZgloszen();

        if($rezultat === true) {

            $idKlienta = $('#klientDodaj').val();
            $kategoriaDodaj = $('#kategoriaDodaj').val();
            $idAdres = $('#adresDodaj').val();
            $nrLokaluDodaj= $('#nrLokaluDodaj').val();
            // if($nrLokaluDodaj !== ''){
            //     $nrLokaluDodaj = '/'+$nrLokaluDodaj;
            // }
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
                    komunikatProgres('Dodano zgłoszenie','success');
                }
            })
        }  else {
            komunikatProgres('Uzupełnij wymagane dane','error');
        }
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

                    }
                })
            }

        }
    }



    // generuje sie dynamiczny select adresów w zależności od wybranego klienta
     function dynamicznyAdres($idKlienta) {

         return new Promise((resolve)=>{
            let klientDodajArr = {'idKlienta': $idKlienta};

            $url = $baseUrl + 'dynamicznyAdres/ajax';
            $.ajax({
                url: $url,
                type: 'POST',
                data: {tab: klientDodajArr},
                format: 'json',
                dataType: 'text',
                success: function (response) {
                    let json = JSON.parse(response);

                    $('#adresDynamiczny select').remove();
                    $('#adresDynamiczny div').remove();

                    $optionSelected = '<option selected="selected" value="0" disabled>--wybierz--</option>';
                    $div = '<div class="field-placeholder-zgloszenia"><span>Adres</span></div>';
                    $wynik = '';

                    for (var i = 0; json.adresSlownik.length > i; i++) {

                        $option = '<option value=' + json.adresSlownik[i]['IdAdres'] + '>' + json.adresSlownik[i]['Adres'] + ' </option>';

                        $wynik = $wynik + $option;
                    }

                    // ustawiamy na sztywno kolor red poniewaz jest to nowy obiekt i nie da sie odwołac do niego w walidacjach
                    $row = "<select id='adresDodaj' style='border: 1px solid red'>" +
                        $optionSelected +
                        $wynik +
                        "</select>" + $div;

                    $('#adresDynamiczny').append($row);

                    if(json.adresSlownik.length === 0){
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            })
         })
    };










    // ----------------------------------  EDYCJA ZGLOSZEN  ------------------------------------------------------



// WALIDACJE - edycja zgłoszenia
    // $('.zgloszeniaTbody').on('click','tr',function()  - tutaj takze jest walidacja


    // walidacje pojedyncze

    $('#klientEdytuj').on('change', function() {

        if ($('#klientEdytuj').val() !== null) {
            $('#klientEdytuj').css('border', '1px solid rgb(209, 205, 205)');
            $klientEdycjaErr = true;
        } else {
            $('#klientEdytuj').css('border', '1px solid red');
            $klientEdycjaErr = false;
        }
    })

    // po wywołaniu zdarzenia na selektorze "#klientEdytuj" wywołujemy funkcję dynamicznyAdres() a ona tworzy nowy obiekt
    // o id = adresEdycja, dlatego odwołujemy sie w tej walidacji do tego obiektu za pomocą zdarzenia oddelegowanego
    $('#adresDynamicznyEdycja').on('change','#adresEdytuj',function() {

        if( $('#adresEdytuj').val() !== null ) {
            $('#adresEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $adresEdycjaErr = true;
        } else {
            $('#adresEdytuj').css('border','1px solid red');
            $adresEdycjaErr = false;
        }
    })


    $('#opisEdytuj').on('change keyup',function() {

            if($('#opisEdytuj').val().length > 0) {
            $('#opisEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $opisEdycjaErr = true;
        } else {
            $('#opisEdytuj').css('border','1px solid red');
            $opisEdycjaErr = false;
        }
    })

    // walidacja daty zgłoszenia na edycji

    $('#terminOdEdytuj').on('change',function() {

        $dataOdEdycja = $('#terminOdEdytuj').val();
        $dataDoEdycja = $('#terminDoEdytuj').val();
        $godzinaOdEdycja = $('#godzinaOdEdytuj').val();
        $godzinaDoEdycja = $('#godzinaDoEdytuj').val();

        $arrayOd = $godzinaOdEdycja.split(":");
        $parseGodzinaOdEdycja = (parseInt($arrayOd[0], 10) * 60 * 60) + (parseInt($arrayOd[1], 10) * 60);
        $arrayDo = $godzinaDoEdycja.split(":");
        $parseGodzinaDoEdycja = (parseInt($arrayDo[0], 10) * 60 * 60) + (parseInt($arrayDo[1], 10) * 60);

        if(($dataOdEdycja > $dataDoEdycja) && ($dataDoEdycja !== '')) {
            $('#terminOdEdytuj').val('');
            $('#terminOdEdytuj').css('border','1px solid red');
            komunikatProgres('Wstaw prawidłową datę od','error');
        }

        if (($dataOdEdycja === $dataDoEdycja)) {

            if($parseGodzinaOdEdycja > $parseGodzinaDoEdycja){
                $('#godzinaDoEdytuj').val('');
                $('#godzinaOdEdytuj').val('');
            }
        }

        if( ( $dataOdEdycja === '' && $dataDoEdycja === '' ) && ( $godzinaOdEdycja !== '' || $godzinaDoEdycja !== '' ) ){
            $('#godzinaDoEdytuj').val('');
            $('#godzinaOdEdytuj').val('');
            komunikatProgres('Usunięto godziny realizacji','error');
        }

        if( ( ($dataOdEdycja === '' && $dataDoEdycja === '') || ($dataOdEdycja !== '' && $dataDoEdycja !== '') ) ){
            $('#terminOdEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $('#terminDoEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $dataOdEdycjaErr = true;
            $dataDoEdycjaErr = true;
        } else {
            if( $('#terminOdEdytuj').val() === '' ) {
                $('#terminOdEdytuj').css('border','1px solid red');
                komunikatProgres('Wstaw prawidłową datę od','error');
                $dataOdEdycjaErr = false;
            } else {
                $('#terminOdEdytuj').css('border','1px solid rgb(209, 205, 205)');
                $dataOdEdycjaErr = true;
            }
            if ( $('#terminDoEdytuj').val() === '' ) {
                $('#terminDoEdytuj').css('border','1px solid red');
                komunikatProgres('Wstaw prawidłową datę do','error');
                $dataDoEdycjaErr = false;
            } else {
                $('#terminDoEdytuj').css('border','1px solid rgb(209, 205, 205)');
                $dataDoEdycjaErr = true;
            }
        }

    });

    $('#terminDoEdytuj').on('change',function() {

        $dataOdEdycja = $('#terminOdEdytuj').val();
        $dataDoEdycja = $('#terminDoEdytuj').val();
        $godzinaOdEdycja = $('#godzinaOdEdytuj').val();
        $godzinaDoEdycja = $('#godzinaDoEdytuj').val();

        $arrayOd = $godzinaOdEdycja.split(":");
        $parseGodzinaOdEdycja = (parseInt($arrayOd[0], 10) * 60 * 60) + (parseInt($arrayOd[1], 10) * 60);
        $arrayDo = $godzinaDoEdycja.split(":");
        $parseGodzinaDoEdycja = (parseInt($arrayDo[0], 10) * 60 * 60) + (parseInt($arrayDo[1], 10) * 60);

        if(($dataOdEdycja > $dataDoEdycja) && ($dataOdEdycja !== '')) {
            $('#terminDoEdytuj').val('');
            $('#terminDoEdytuj').css('border','1px solid red');
            komunikatProgres('Wstaw prawidłową datę do','error');
        }

        if (($dataOdEdycja === $dataDoEdycja)) {
            if($parseGodzinaOdEdycja > $parseGodzinaDoEdycja){
                $('#godzinaDoEdytuj').val('');
                $('#godzinaOdEdytuj').val('');
                komunikatProgres('Godzina od nie może być późniejsza od godziny do','error');
            }
        }

        if( ( $dataOdEdycja === '' && $dataDoEdycja === '' ) && ( $godzinaOdEdycja !== '' || $godzinaDoEdycja !== '' ) ){
            $('#godzinaDoEdytuj').val('');
            $('#godzinaOdEdytuj').val('');
            komunikatProgres('Usunięto godziny realizacji','error');
        }

        if( ( ($dataOdEdycja === '' && $dataDoEdycja === '') || ($dataOdEdycja !== '' && $dataDoEdycja !== '') ) ){
            $('#terminOdEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $('#terminDoEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $dataOdEdycjaErr = true;
            $dataDoEdycjaErr = true;
        } else {
            if( $('#terminOdEdytuj').val() === '' ) {
                $('#terminOdEdytuj').css('border','1px solid red');
                komunikatProgres('Wstaw prawidłową datę od','error');
                $dataOdEdycjaErr = false;
            } else {
                $('#terminOdEdytuj').css('border','1px solid rgb(209, 205, 205)');
                $dataOdEdycjaErr = true;
            }
            if ( $('#terminDoEdytuj').val() === '' ) {
                $('#terminDoEdytuj').css('border','1px solid red');
                komunikatProgres('Wstaw prawidłową datę do','error');
                $dataDoEdycjaErr = false;
            } else {
                $('#terminDoEdytuj').css('border','1px solid rgb(209, 205, 205)');
                $dataDoEdycjaErr = true;
            }
        }

    });


    // walidacja godziny zgłoszenia na edycji

    $('#godzinaOdEdytuj').on('change',function() {

        $dataOdEdycja = $('#terminOdEdytuj').val();
        $dataDoEdycja = $('#terminDoEdytuj').val();

        $arrayOd = $godzinaOdEdycja.split(":");
        $parseGodzinaOdEdycja = (parseInt($arrayOd[0], 10) * 60 * 60) + (parseInt($arrayOd[1], 10) * 60);
        $arrayDo = $godzinaDoEdycja.split(":");
        $parseGodzinaDoEdycja = (parseInt($arrayDo[0], 10) * 60 * 60) + (parseInt($arrayDo[1], 10) * 60);

        if($dataOdEdycja !== '' && $dataDoEdycja !== '') {
            if (($dataOdEdycja === $dataDoEdycja)) {
                $godzinaOdEdycja = $('#godzinaOdEdytuj').val();
                $godzinaDoEdycja = $('#godzinaDoEdytuj').val();

                if (($parseGodzinaOdEdycja > $parseGodzinaDoEdycja) && ($parseGodzinaDoEdycja !== '')) {
                    $('#godzinaOdEdytuj').val('');
                    komunikatProgres('Godzina od nie może być późniejsza od godziny do','error');
                }
            }
        }
        if($dataOdEdycja === '' && $dataDoEdycja === ''){
            $('#godzinaDoEdytuj').val('');
            $('#godzinaOdEdytuj').val('');
            komunikatProgres('Godzina od nie może być późniejsza od godziny do','error');
        }

        if( ( $dataOdEdycja === '' && $dataDoEdycja === '' ) && ( $parseGodzinaOdEdycja !== '' || $parseGodzinaDoEdycja !== '' ) ){
            $('#godzinaDoEdytuj').val('');
            $('#godzinaOdEdytuj').val('');
            komunikatProgres('Usunięto godziny realizacji','error');
        }
    });

    $('#godzinaDoEdytuj').on('change',function() {

        $dataOdEdycja = $('#terminOdEdytuj').val();
        $dataDoEdycja = $('#terminDoEdytuj').val();

        $arrayOd = $godzinaOdEdycja.split(":");
        $parseGodzinaOdEdycja = (parseInt($arrayOd[0], 10) * 60 * 60) + (parseInt($arrayOd[1], 10) * 60);
        $arrayDo = $godzinaDoEdycja.split(":");
        $parseGodzinaDoEdycja = (parseInt($arrayDo[0], 10) * 60 * 60) + (parseInt($arrayDo[1], 10) * 60);

        if($dataOdEdycja !== '' && $dataDoEdycja !== ''){
            if( ($dataOdEdycja === $dataDoEdycja) ){
                $godzinaOdEdycja = $('#godzinaOdEdytuj').val();
                $godzinaDoEdycja = $('#godzinaDoEdytuj').val();

                if (($parseGodzinaOdEdycja > $parseGodzinaDoEdycja) && ($godzinaOdEdycja !== '')) {
                    $('#godzinaDoEdytuj').val('');
                    komunikatProgres('Godzina do nie może być wcześniejsza od godziny od','error');
                }
            }
        }
        if( ( $dataOdEdycja === '' && $dataDoEdycja === '' ) && ( $parseGodzinaOdEdycja !== '' || $parseGodzinaDoEdycja !== '' ) ){
            $('#godzinaDoEdytuj').val('');
            $('#godzinaOdEdytuj').val('');
            komunikatProgres('Usunięto godziny realizacji','error');
        }

    });


    // walidacja wykonawcy na edycji

    // generuje sie dynamiczna tabela z wykonawcami na podstawie wyboru wykonawców z selecta - całość zapisuje sie po klinieciu button zapisz
    $('#wykonawcaEdytuj').on('change', function(){

        $idWykonawca = $(this).val();
        alert('idwykon: ' + $idWykonawca);
        $wykonawcaText= $('#wykonawcaEdytuj option:selected').text();

        $wykonawcaTbodyTr = $('.wykonawcaTbodyTr');

        console.log($wykonawcaTbodyTr);



        for($i = 0; $wykonawcaTbodyTr.length > $i ; $i++){

            //$wykonawca2 =  $wykonawcaTbodyTr[$i].children[0].innerHTML;

            $wykonawca =  $wykonawcaTbodyTr[$i].children[0].innerHTML;
            console.log($wykonawca);
            if($idWykonawca === $wykonawca) {
                alert('widze');
                $wykonawcaTbodyTr[$i].remove();
                komunikatProgres('Wybrany wykonawca został już dodany','error');
            }
        }

        var wykonawcaId = '<td class="idWykonawca" style="display: none" >' + $idWykonawca + '</td>';
        var wykonawca = '<th class="wykonawcaJS" scope="row">' + $wykonawcaText + '</th>';
        var usun = '<td  class="usunWykonawceTab"><button title="Usuń" type="button" class="usunWykonawceButton"><svg class="koszIcons" style="width: 1vw;height: 2vh"></svg></button></td>';

        $row = "<tr class='wykonawcaTbodyTr'>" +
            wykonawcaId +
            wykonawca +
            usun +
            "</tr>";

        $('.wykonawcaTbodyEdycja').append($row);

        // ustawiamy na --wybierz-- ponieważ jak wybralismy jakiegos wykonawce to pojawiał sie on w tym okienku i
        // gdy ponownie chcielismy go wybrac to sie nie dało i np. dlatego nie dało sie wyswietlic komunikatu
        // że taki wykonawca jest już na liście
        $(this).val(0);
    });
    $('.wykonawcaTbodyEdycja').on('click','.usunWykonawceButton', function(){
        $usunWykonawce = $(this).parent().parent().remove();
    });


    function walidacjaZgloszenEdycja() {

        if($klientEdycjaErr === false) {
            $('#klientEdytuj').css('border','1px solid red');
            $klientEdycjaErr = false;
        } else {
            $('#klientEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $klientEdycjaErr = true;
        }
        if($adresEdycjaErr === false) {
            $('#adresEdytuj').css('border','1px solid red');
            $adresEdycjaErr = false;
        } else {
            $('#adresEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $adresEdycjaErr = true;
        }
        if($opisEdycjaErr === false) {
            $('#opisEdytuj').css('border','1px solid red');
            $opisEdycjaErr = false;
        } else {
            $('#opisEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $opisEdycjaErr = true;
        }

        if( ( $('#terminOdEdytuj').val() !== '' && $('#terminDoEdytuj').val() !== '' ) ||
            ( $('#terminOdEdytuj').val() === '' && $('#terminDoEdytuj').val() === '' ) ) {

            $('#terminOdEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $('#terminDoEdytuj').css('border','1px solid rgb(209, 205, 205)');
            $dataOdEdycjaErr = true;
            $dataDoEdycjaErr = true;
        } else {
            if( $('#terminOdEdytuj').val() === '' ) {
                $('#terminOdEdytuj').css('border','1px solid red');
                $dataOdEdycjaErr = false;
            }  else {
                $('#terminDoEdytuj').css('border','1px solid red');
                $dataDoEdycjaErr = false;
            }
        }


        if($klientEdycjaErr === false || $adresEdycjaErr === false || $opisEdycjaErr === false ||
            $dataOdEdycjaErr === false || $dataDoEdycjaErr === false ) {
            return false;
        } else {
            return true;
        }
    }




    // generuje sie dynamiczny select adresów w zależności od wybranego klienta
    $('#klientEdytuj').on('change', function() {

        $idKlienta = $(this).val();

        if($idKlienta){
            let klientDodajArr = {'idKlienta': $idKlienta};

            $url = $baseUrl + 'dynamicznyAdres/ajax';
            $.ajax({
                url: $url,
                type: 'POST',
                data: {tab: klientDodajArr},
                format: 'json',
                dataType: 'text',
                success: function (response) {
                    let json = JSON.parse(response);

                    $('#adresDynamicznyEdycja select').remove();
                    $('#adresDynamicznyEdycja div').remove();

                    $optionSelected = '<option selected="selected" value="0" disabled>--wybierz--</option>';
                    $div = '<div class="field-placeholder-zgloszenia"><span>Adres</span></div>';
                    $wynik = '';

                    for (var i = 0; json.adresSlownik.length > i; i++) {

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
        }
    });


    $adresDlaEdycji = ''; // potrzebne do wyświetlenia prawidłowego adresu w sekcji edycji zgłoszenia.
    $('.zgloszeniaTbody').on('click','tr',function() {

        $(".edytowanieZgloszenia").show();
        $(".dodawanieZgloszenia").hide();
        $('.zmianyKomentarze').hide();
        $('.wykonawcaTbodyTr').remove();


        $IdZgloszeniaTab = $(this).find('.IdZgloszeniaTab').text();
        $adresTab = $(this).find('.IdAdresTab').text();
        $klientTab = $(this).find('.IdKlientaTab').text();
        // zapis do inputa utworzonego w sekcji edytowania zgłoszenia - potrzebne do edycji danych po kliknieciu przycisku edytuj.
        $('#idZgloszeniaEdycja').val($IdZgloszeniaTab);
        $('#idZgloszeniaKomentarze').val($IdZgloszeniaTab);


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


                    var wykonawcaId = '<td class="idWykonawca" style="display: none" >' + item.IdUzytkownika + '</td>';
                    var IdZgloszeniaWykonawca = '<td class="idZgloszeniaWykonawca" style="display: none" >' + item.IdZgloszeniaWykonawca + '</td>';
                    var wykonawca = '<th class="wykonawcaJS" scope="row">' + item.Wykonawca + '</th>';
                    var usun = '<td  class="usunWykonawceTab"><button title="Usuń" type="button" class="usunWykonawceButton"><svg class="koszIcons" style="width: 1vw;height: 2vh"></svg></button></td>';

                    $row = "<tr class='wykonawcaTbodyTr'>" +
                        wykonawcaId +
                        IdZgloszeniaWykonawca +
                        wykonawca +
                        usun +
                        "</tr>";

                 //   sprawdzamy ' ' bo tak jest w select ( concat ma ' ' i wstawia sie pusty string jak nie ma zadnego wykonawcy i wyswietla sie tylko kosz )
                    if(json.wykonawcaArr[0]['Wykonawca'] !== ' '){
                    $('.wykonawcaTbodyEdycja').append($row);
                       }
                });


                // walidacja w tym miejscu bo najpierw ajax musi wypełnic w petlach powyżej pola odpowiednimi danymi na formularzu edycji
                $klientEdycjaErr = true;
                $adresEdycjaErr = true;
                if( $('#opisEdytuj').val() !== '' ||  $('#opisEdytuj').length > 0) {
                    $('#opisEdytuj').css('border','1px solid rgb(209, 205, 205)');
                    $opisEdycjaErr = true;
                } if($('#opisEdytuj').val() === '' || $('#opisEdytuj').val() === null || $('#opisEdytuj').length === 0) {
                    $('#opisEdytuj').css('border','1px solid red');
                    $opisEdycjaErr = false;
                }
                $dataOdEdycjaErr = true;
                $dataDoEdycjaErr = true;

            }
        })

        // wywołujemy to zdarzenie aby w sekcji edycji zgłoszenia dynamicznie ustawic adres
         $('#klientEdytuj').change();
    });



    $('#buttonEdytujZgloszenie').on('click',function(){

        $rezultat = walidacjaZgloszenEdycja();

        if($rezultat === true) {

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
                    komunikatProgres('Edytowano zgłoszenie','success');

                }
            })

        } else {
            komunikatProgres('Uzupełnij wymagane dane','error');
        }


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
        $('.zmianyKomentarze').hide();

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
        $('.zmianyKomentarze').hide();

        // $('#nrZgloszeniaFiltrHistoria').val('');
        // $('#dataDodaniaOdFiltrHistoria').val('');
        // $('#dataDodaniaDoFiltrHistoria').val('');
        // $('#planowanaRealizacjaFiltrHistoria').val('');
        // $('#adresFiltrHistoria').val('');
        // $('#klientFiltrHistoria').val('');
        // $('#wykonawcaFiltrHistoria').val('');
        // $('#kategoriaFiltrHistoria').val('');
        // $('#priorytetFiltrHistoria').val('');
        // $('#statusFiltrHistoria').val('');


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






















































