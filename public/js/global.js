/*
*
*   komunikat progress bar
*
* */

function komunikatProgres($text,$successError) {

    if($successError === 'success'){
        $(".komunikatError").hide();
        $(".komunikat").show();
    } else {
        $(".komunikat").hide();
        $(".komunikatError").show();
    }

    $('.textKomunikatu').text($text);

    setTimeout(function(){

        if($successError === 'success'){
            $(".komunikat").hide();
        } else {
            $(".komunikatError").hide();
        }

    }, 4000);


    if($successError === 'success'){
        $elem = $(".progressBar");
    } else {
        $elem = $(".progressBarError");
    }

    $width = 1;
    $id = setInterval(frame, 40);
    function frame() {
        if ($width >= 100) {
            clearInterval($id);
        } else {
            $width++;
            $elem.css('width',$width + '%')
        }
    }
}