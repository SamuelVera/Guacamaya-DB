document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

// $(document).ready(function(){
//       $('.modal').modal();
//     });
$(document).ready(function(){
  $('.tooltipped').tooltip();
});

// --------------------------------------------------------------------------------------------SI SE LE DA CLICK EN USA SE ABRE SU MAPA-------------------------------------------------------------------------------------------------------------------------//
  $("#us").click(function(){
  //   $.noConflict();
    // var instance = M.Modal.getInstance(elem);
    // instance.open();
    $('#us-options').modal('open');
});

// --------------------------------------------------------------------------------------------SI SE LE DA CLICK EN ALGUN ESTADO DESPLIEGA OPCIONES-------------------------------------------------------------------------------------------------------------------------//
$("#GA, #FL, #NY").each(function () {
  $(this).click(function(){
      $('#us-options').modal('close');
      $('#selection').modal('open');
  })
});