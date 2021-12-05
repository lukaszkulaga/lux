$(document).ready(function () {

    /*
    *    zmienne globalne
    * */
    $baseUrl = $('#baseUrl').val();


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

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);



    $("#edycjaDanych").on('click',function() {

        $zdjecie = uploaded_image;

        $nazwaUzytkownika = $('#nazwaUzytkownika').val();
        $imie = $('#imie').val();
        $nazwisko = $('#nazwisko').val();
        $email = $('email').val();

        let arr = {'nazwaUzytkownika':$nazwaUzytkownika, 'imie':$imie, 'nazwisko':$nazwisko, 'email':$email, 'zdjecie':$zdjecie};

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

                        console.log(el);

                        $imie= el.Imie;
                        $zdjecie = el.Zdjecie;

                        $('#imie').val($imie);
                        document.querySelector("#image_drop_area").style.backgroundImage = `url(${$zdjecie})`;


                    })
            }
        });
    });
    
});
































