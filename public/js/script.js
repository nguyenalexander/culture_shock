$(document).ready(function() {
    $( '.dropdown' ).hover(
        function(){
            $(this).children('.dropdown-menu').slideDown(200);
        },
        function(){
            $(this).children('.dropdown-menu').slideUp(200);
        }
    );
});