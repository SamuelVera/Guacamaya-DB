$(document).ready(function() {
    $.noConflict();//AAAAAAAAAAAAAAAHHHHHHHHHHHHHH LA SOLUCION A TODOS MIS PROBLEMAS
    var elems = document.querySelectorAll('.tabs');
    var options = {
        duration: 300,
        onShow: null,
        swipeable: false
    };
    var instance = M.Tabs.init(elems, options);
    var table =$('#flights-table').DataTable( {
        columnDefs: [
            {
                targets: [ 0, 1, 2 ],
                className: 'mdl-data-table__cell--non-numeric'
            }
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "pagingType": "full",
        "dom": '<"#filter"f>rt<"footer-wrapper"<"#entries"l><"pagination-info"ip>><"clear">'
    } );
    var table2 =$('#employees-table').DataTable( {
        columnDefs: [
            {
                targets: [ 0, 1, 2 ],
                className: 'mdl-data-table__cell--non-numeric'
            }
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "pagingType": "full",
        "dom": '<"#filter"f>rt<"footer-wrapper"<"#entries"l><"pagination-info"ip>><"clear">'
    } );
    // document.getElementsByTagName("input").setAttribute('placeholder', 'Bucar');

    // var elems = document.querySelectorAll('select');
    // var instances = M.FormSelect.init(elems);
    // .placeholder = "Buscar";
} );

function applyWhenElementExists(selector, myFunction, intervalTime) {
    var interval = setInterval(function() {
      if (jQuery(selector).length > 0) {
         myFunction();
         clearInterval(interval);
      }
    }, intervalTime);
  };

 applyWhenElementExists("input", function(){
    var inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
        inputs[index].setAttribute('placeholder', 'Buscar');
    }
    $('#flights_length').addClass('input-field col s12');
    $('.paginate_button').addClass('waves-effect');

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    // var buttonPrevious = '<i class="material-icons">skip_previous<i>'
    // $('.flights_first').before(buttonPrevious);
   }, 50);

