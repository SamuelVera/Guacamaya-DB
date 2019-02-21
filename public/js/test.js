
// INICIALIZACION DE LOS BOTONES FLOTANTES
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {direction: "left"})});

    // $(".responsive-table tr").click(function(){
    //     $(this).addClass('selected').siblings().removeClass('selected');
    //     var value=$(this).find('td:first').html();
    //     alert(value);
    //  });
     
    //  $('.action').on('click', function(e){
    //      alert($(".responsive-table tr.selected td:first").html());
    //  });

     //REGRESA LA FECHA ACTUAL PARA SETEARLA COMO MIN AL MOMENTO DE AGREGAR VUELO
function actualDate() {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
return today;
}

// INICIALIZACION DEL SIDENAV
$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// INICIALIZACIOON DE LOS COLLAPSIBLES
$(document).ready(function(){
    $('.collapsible').collapsible();
 });

//CUANDO SE LE DE CLICK A UN TITULO DEL SIDENAV CAMBIARÁ EL ESTILO DE SU COLLAPSIBLE QUE TIENE ADENTRO
$(".collapsible-header").click(function(){
        $(".collapsible-body").css("border-bottom" , "1px solid rgba(0,0,0,0.2)");
        $(".collapsible-body").css("background-color" , "#f2f2f2");
});

//ESTO ES PARA CMABIAR LAS FLECHAS QUE ESTÁN EN LOS COLLAPSIBLE EN EL SIDENAV PARA QUE CAMBIEN CUANDO SE LE DE CLICK O PIERDAN/GANEN EL FOCO
$("#pages").focusin(function(){
    $("#pagesicon").addClass("focusin").removeClass("focusout");
});
$("#pages").focusout(function(){
    // $("#pagesicon").addClass("focusout");
    // $(".chevron").switchClass("focusin", "focusout")
    $("#pagesicon").addClass("focusout").removeClass("focusin");
});

// <-----------------------------------------------------------------------------------------------------------VISTA DE USER--------------------------------------------------------------------------------------------------------------------->
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel.carousel-slider');
    var instance = M.Carousel.init( elems, {
        fullWidth: true,
        indicators: true
    });
  });

  $(document).ready(function(){
    $('.slider').slider();
  });

  // <-----------------------------------------------------------------------------------------------------------VISTA DE ADMIN--------------------------------------------------------------------------------------------------------------------->
//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json
  $(document).ready(function() {
    $.noConflict();//AAAAAAAAAAAAAAAHHHHHHHHHHHHHH LA SOLUCION A TODOS MIS PROBLEMAS
    var table =$('#flights').DataTable( {
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

// $("#pages").focusin(function(){
//     $("#pagesicon").css("transform" , "rotate(-90deg)");
// });
// $("#pages").focusout(function(){
//     $("#pagesicon").css("transform" , "rotate(0deg)");
// });

// $("#pages").click(function(){
//     $("#pagesicon").animate({
//         step: function () {
//             $(this).css('-webkit-transform', 'rotate(-90deg)')
//         }
//     });
// });

// $(".collapsible-header").click(function(){
//     $(".chevron").animate({
//         step: function () {
//             $(this).css('-webkit-transform', 'rotate(0deg)')
//         }
//     });
// });
// $(".collapsible-header").click(function(){
//     $(".chevron").css("transform" , "rotate(-90deg)");
// });
// $(".collapsible-header").click(function(){
//     $(".chevron").css("transform" , "rotate(-90deg)");
// });
// $(".collapsible-header").click(function(){
//     $(".chevron").css("transform" , "rotate(-90deg)");
// });