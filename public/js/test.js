

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {direction: "left"})});

    $(".responsive-table tr").click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        var value=$(this).find('td:first').html();
        alert(value);
     });
     
     $('.action').on('click', function(e){
         alert($(".responsive-table tr.selected td:first").html());
     });

