
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

function toggleSidebar(){
    document.getElementById('sidenav-left').classList.toggle('active');
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


$("#pages").focusin(function(){
    $("#pagesicon").css("transform" , "rotate(-90deg)");
});
$("#pages").focusout(function(){
    $("#pagesicon").css("transform" , "rotate(0deg)");
});

// $("#pages").click(function(){
//     $("#pagesicon").animate({
//         transform: "rotate(-90deg)"
//     });
// });

// $("#pages").focusout(function(){
//     $("#pagesicon").animate({
//         transform: "rotate(0deg)"
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