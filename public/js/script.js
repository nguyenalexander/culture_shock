$(function(){
  $('.dropdown').on('mouseenter',function(){
    $(this).children('.dropdown-menu').slideDown(200);
  });
  $('.dropdown').on('mouseleave',function(){
    $(this).children('.dropdown-menu').slideUp(200);
  });
  $('.language-toggle').on('click',function(e){
    console.log($(this).parent('.language').children('.modal'))
    $(this).parent('.language').children('.modal').modal('toggle')
  });
  $('#checkfilter').on('keyup', function(e) {
    if (e.which == 13){
      console.log('this works')
      e.preventDefault();
    }
    console.log('this works')
    e.preventDefault();
    var query = this.value;
    console.log(query)

    $('[class^="language-check"]').each(function(i, elem) {
      console.log(elem)
          if (elem.value.indexOf(query) != -1) {
              $(this).closest('label').show().children().show();
          }else{
              $(this).closest('label').hide().children().hide();
          }
    });
});

});


var drawMap = function(markers) {

  L.mapbox.accessToken = 'pk.eyJ1Ijoibmd1eWVuYWxleGFuZGVyIiwiYSI6Il93WXc2SjQifQ.u8x_VseaLesD3vof-EjOCA'

  var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/nguyenalexander.lofliff0/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });

  var map = L.map('map').addLayer(mapboxTiles)

   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      map.setView([position.coords.latitude, position.coords.longitude], 10);

    })
   }

   markers.forEach(function(marker) {
    console.log(marker);
    L.marker([marker.lat, marker.lng]).addTo(map).bindPopup(marker.name)
   })

}

// var drawMap = function(markers) {

// L.mapbox.accessToken = 'pk.eyJ1Ijoibmd1eWVuYWxleGFuZGVyIiwiYSI6Il93WXc2SjQifQ.u8x_VseaLesD3vof-EjOCA';
//     var map = L.mapbox.map('map', 'nguyenalexander.lofliff0')
//         .setView([-37.82, 175.215], 14);

//
// }

