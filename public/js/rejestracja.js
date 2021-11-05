$(document).ready(function () {

    /*
    *    zmienne globalne
    * */


    $baseUrl = '';



    /*
      *    drag and drop
      * */

    const image_drop_area = document.querySelector("#image_drop_area");
    var uploaded_image; // możemy odczytac ten plik/zdjecie w tagu <img  src="scieżka zapisana w uploaded_image" />

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



$('#submitRejestracja').click(function(){

    $('#filesDropAndDrag').val(uploaded_image);
})


    /*
  *    Walidacje
  * */



    // walidacja hasła - sprawdzanie czy hasło i powtórzone hasło są takie same

    $('#pierwszeHaslo,#drugieHaslo').on('keyup', function() {

        $pierwszeHaslo= $('#pierwszeHaslo').val();
        $drugieHaslo= $('#drugieHaslo').val();

        if ($pierwszeHaslo==$drugieHaslo) {
            $('#submitRejestracja').attr('disabled',false);

        } else {
            $('#submitRejestracja').attr('disabled',true);
        }
    });



    // zamiana pierwszych liter na wielkie, następne litery małe

    function capitalizeFirstLetter($daneZFormularza,$this) {

        $pierwszaDuzaLitera = $daneZFormularza.charAt(0).toUpperCase() + $daneZFormularza.slice(1).toLowerCase();
        $this.val($pierwszaDuzaLitera);
    }

    $('.daneZFormularza').on('change', function() {

        $this=$(this);
        $daneZFormularza= $(this).val();
        capitalizeFirstLetter($daneZFormularza,$this);
    });


});



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