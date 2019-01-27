

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {direction: "left"})});

    $(".responsive-table").click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        var value=$(this).find('td:first').html();
        alert(value);
     });
     
     $('.ok').on('click', function(e){
         alert($(".responsive-table.selected td:first").html());
     });
