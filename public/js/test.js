
// INICIALIZACION DE LOS BOTONES FLOTANTES
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.fixed-action-btn');
//     var instances = M.FloatingActionButton.init(elems, {direction: "left"})});

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
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
// INICIALIZACIOON DE LOS COLLAPSIBLES
  var elems1 = document.querySelectorAll('.collapsible');
  var instances1 = M.Collapsible.init(elems1);
});

// $(document).ready(function(){
//     // $.noConflict();
//     $('.sidenav').sidenav();

//     $('.collapsible').collapsible();
//   });

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


     // <-----------------------------------------------------------------------------------------------------------MODAL EN MAPA PARA SELECCIONAR SEDE DE AEREOLINEA--------------------------------------------------------------------------------------------------------------------->


  // <-----------------------------------------------------------------------------------------------------------MAPA EN VISTA DE AEREOLINEA--------------------------------------------------------------------------------------------------------------------->
//    function myMap() {
//     var mapProp= {
//       center:new google.maps.LatLng(51.508742,-0.120850),
//       zoom:5,
//     };
//     var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
//     }


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