$(document).ready(function () {

    /*
    *    zmienne globalne
    * */
    $baseUrl = $('#baseUrl').val();
    $(".komunikat").hide();
    $(".komunikatError").hide();

    /*
        *    drag and drop
        * */

    const image_drop_area = document.querySelector("#image_drop_area");
    var uploaded_image=''; // możemy odczytac ten plik/zdjecie w tagu <img  src="scieżka zapisana w uploaded_image" />

// Event listener for dragging the image over the div
    image_drop_area.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        // Style the drag-and-drop as a "copy file" operation.
        event.dataTransfer.dropEffect = 'copy';
    });

// Event listener for dropping the image inside the div
    image_drop_area.addEventListener('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
        fileList = event.dataTransfer.files;

        document.querySelector("#file_name").textContent = fileList[0].name;

        readImage(fileList[0]);
    });

// Converts the image into a data URI
    readImage = (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            uploaded_image = event.target.result;
            document.querySelector("#image_drop_area").style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(file);
    }


/* wersja z otwórz plik   -  dodawanie zdjecia */


// function handleFileSelect(evt) {
//     var files = evt.target.files; // FileList object
//
//     // Loop through the FileList and render image files as thumbnails.
//     for (var i = 0, f; f = files[i]; i++) {
//
//
//
//         // Only process image files.
//         if (!f.type.match('image.*')) {
//             continue;
//         }
//
//         var reader = new FileReader();
//
//         // Closure to capture the file information.
//         reader.onload = (function(theFile) {
//             return function(e) {
//
//                 var span = document.createElement('span');
//                 span.innerHTML = ['<img class="thumb" style="" src="', e.target.result,
//                     '" title="', escape(theFile.name), '"/>'].join('');
//                 document.getElementById('list').insertBefore(span, null);
//
//                 uploaded_image = e.target.result;
//             };
//         })(f);
//
//         // Read in the image file as a data URL.
//         reader.readAsDataURL(f);
//
//     }
//
//
// }
//
// document.getElementById('files').addEventListener('change', handleFileSelect, false);



    let walidacjaTelefonu = true;
    let walidacjaEmail = true;

    $('#telefon').keyup(function() {

        walidacjaTelefonu = false;

        $getTel = $('#telefon').val();

        if($getTel.length === 3){
            $getTel = $getTel + '-';
            $('#telefon').val($getTel);
        }
        if($getTel.length === 7){
            $getTel = $getTel + '-';
            $('#telefon').val($getTel);
        }




        let pattern = /[0-9]{3}-[0-9]{3}-[0-9]{3}/;



        
        let validacjaTelefonuPattern = pattern.test($getTel);


        if(validacjaTelefonuPattern === true){
            walidacjaTelefonu = true;
            $(this).css('border','1px solid rgb(209, 205, 205)');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat');
        } else {
            $(this).css('border','1px solid red');
            $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadź prawidłowy nr telefonu');
        }
    });

    function validateEmail($email) {
        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return pattern.test( $email );
    }

    $('#email').keyup(function(){

        walidacjaEmail = false;

        $getEmail= $(this).val();
        $walidacjaEmailPattern = validateEmail($getEmail);

       if($walidacjaEmailPattern === true) {
           walidacjaEmail = true;
           $(this).css('border','1px solid rgb(209, 205, 205)');
           $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/success.svg") no-repeat');
       } else {
           $(this).css('border','1px solid red');
           $(this).parent().parent().find('.errorSuccess').show().css('background','url("../icons/error.svg") no-repeat').attr('title','wprowadź prawidłowy e-mail');
       }
    });

    $("#edycjaDanych").on('click',function() {

        if ( walidacjaTelefonu === true && walidacjaEmail === true) {

            if(uploaded_image === ''){
                $zdjecie = $('#filesDropAndDrag').val();
            } else {
                $('#filesDropAndDrag').val(uploaded_image);
                $zdjecie = $('#filesDropAndDrag').val();
            }

            $email = $('#email').val();
            $nrTelefonu= $('#telefon').val();

            let arr = {'email':$email, 'zdjecie':$zdjecie, 'telefon':$nrTelefonu};

            $url = $baseUrl + 'stronaUzytkownika/ajax';
            $.ajax({
                url: $url,
                type: 'POST',
                data: {tab: arr},
                format: 'json',
                dataType: 'text',
                success: function (response) {
                    var json = JSON.parse(response);

                    json.daneUzytkownika.forEach(el => {
                        $edycjaEmail = el.Email;
                        $edycjaTelefon = el.NumerTelefonu;
                        $zdjecie = el.Zdjecie;

                        $('#email').val($edycjaEmail);
                        $('#telefon').val($edycjaTelefon);
                    })

                    komunikatProgres('Zapisano zmiany','success');
                }
            });
        } else {

            if (walidacjaTelefonu === false && walidacjaEmail === false) {
                komunikatProgres('Nieprawidłowe dane','error');
            } else if (walidacjaTelefonu === false) {
                komunikatProgres('Podany numer telefonu jest nieprawidłowy','error');
            } else if (walidacjaEmail === false) {
                komunikatProgres('Podany e-mail jest nieprawidłowy','error');
            }
        }
    });

});



































