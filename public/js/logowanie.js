$(document).ready(function () {

    /*
    *    zmienne globalne
    * */


    $baseUrl = '';





    /*
    *    Walidacje
    * */

    
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












