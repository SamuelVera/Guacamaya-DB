
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