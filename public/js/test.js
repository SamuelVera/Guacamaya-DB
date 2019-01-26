function toggleSidebar(){
    // document.getElementById("sidenav-left").classList.toggle('active');

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav-left');
        var instances = M.Sidenav.init(elems, options);
      });
    
}