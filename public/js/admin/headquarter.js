$(document).ready(function () {
    $.noConflict(); //AAAAAAAAAAAAAAAHHHHHHHHHHHHHH LA SOLUCION A TODOS MIS PROBLEMAS
    // INICIALIZACIÓN DE TABS
    var elems = document.querySelectorAll('.tabs');
    // var instance = M.Tabs.init(elems, options);
    // INICIALIZACIÓN DE FLOATING ACTION BUTTONS
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);

    //INICIALIZACION DE MODALES
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);


    var table = $('#flights-table').DataTable({
        columnDefs: [{
            targets: [0, 1, 2],
            className: 'mdl-data-table__cell--non-numeric'
        }],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "pagingType": "full",
        "dom": '<"#filter"f>rt<"footer-wrapper"<"#entries"l><"pagination-info"ip>><"clear">'
    });
    var table2 = $('#employees-table').DataTable({
        columnDefs: [{
            targets: [0, 1, 2],
            className: 'mdl-data-table__cell--non-numeric'
        }],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "pagingType": "full",
        "dom": '<"#filter"f>rt<"footer-wrapper"<"#entries"l><"pagination-info"ip>><"clear">'
    });
    // document.getElementsByTagName("input").setAttribute('placeholder', 'Bucar');

    // var elems = document.querySelectorAll('select');
    // var instances = M.FormSelect.init(elems);
    // .placeholder = "Buscar";

    var nav = $('nav');
    $(window).on('scroll', function () {
        var tabsOffsetTop = $('.tabs').offset().top;
        if ($(window).scrollTop() >= tabsOffsetTop) {
            nav.css('box-shadow ', '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)');
            nav.css('-webkit-box-shadow', '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)');
        } else if ($(window).scrollTop() <= tabsOffsetTop / 2) {
            nav.css('box-shadow ', 'none');
            nav.css('-webkit-box-shadow', 'none');
        }
    });
});

function applyWhenElementExists(selector, myFunction, intervalTime) {
    var interval = setInterval(function () {
        if (jQuery(selector).length > 0) {
            myFunction();
            clearInterval(interval);
        }
    }, intervalTime);
};

applyWhenElementExists("input", function () {
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


// PARA LA SELECCION DE FILAS DE LA TABLA
$("table tr").click(function(){

    if(!$(this).hasClass('selected')){
        $(this).addClass('selected').siblings().removeClass('selected');    
        var value=$(this).find('td:first').html();
        alert(value);    
        
        var btnEdit = $('#edit');
        var btnDelete = $('#delete');
    
        btnEdit.css('transform', 'translateX(0%)');
        btnDelete.css('transform', 'translateX(0%)');
    }else{
        $(this).removeClass('selected').siblings().removeClass('selected');    
        var value=$(this).find('td:first').html();
        alert(value);    
        
        var btnEdit = $('#edit');
        var btnDelete = $('#delete');
    
        btnEdit.css('transform', 'translateX(200%)');
        btnDelete.css('transform', 'translateX(200%)');
    }


 });
 
 $('.ok').on('click', function(e){
     alert($("table tr.selected td:first").html());
 });