




$(document).ready(function () {

    /*
    *    zmienne globalne
    * */
    $baseUrl = $('#baseUrl').val();
    $(".komunikat").hide();
    $(".komunikatError").hide();

    let locale = 'pl'
    let order = $.fn.dataTable.ext.type.order
    delete order['string-pre']
    order['string-asc'] = function(a, b) {return a.localeCompare(b, locale)}
    order['string-desc'] = function(a, b) {return b.localeCompare(a, locale)}
    var table = $('#table_id').DataTable( {
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Polish.json"
        }
    });


    $('#id').keyup( function() {

        $.fn.dataTable.ext.search.push(
            function( settings, data, dataIndex ) {

                var id = $('#id').val();
                var searchId = data[0] || 0; // use data for the age column

                if (id === searchId) {
                    return true;
                } if(id === null || id === ''){
                    return true;
                }
                else {
                    return false;
                }

                // if (id === searchId) {
                //     return true;
                // } return id === null || id === '';
            }
        );

        table.draw();
    } );



});

