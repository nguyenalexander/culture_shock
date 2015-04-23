$(function(){
  $('.dropdown').on('mouseenter',function(){
    $(this).children('.dropdown-menu').slideDown(200);
  });
  $('.dropdown').on('mouseleave',function(){
    $(this).children('.dropdown-menu').slideUp(200);
  });
  $('.language-toggle').on('click',function(e){
    $(this).parent('.language').children('.modal').modal('toggle')
  });
  $('#checkfilter').on('keyup', function(e) {
    if (e.which == 13){
      e.preventDefault();
    }
    e.preventDefault();
    var query = this.value;

    $('[class^="language-check"]').each(function(i, elem) {
          if (elem.value.indexOf(query) != -1) {
              $(this).closest('label').show().children().show();
          }else{
              $(this).closest('label').hide().children().hide();
          }
    });
});

  $('.about-button').on('click',function(){
    $(window).scrollTo($('#about'),800);
  })
});


var drawMap = function(markers) {

  L.mapbox.accessToken = 'pk.eyJ1Ijoibmd1eWVuYWxleGFuZGVyIiwiYSI6Il93WXc2SjQifQ.u8x_VseaLesD3vof-EjOCA'

  var map = L.mapbox.map('map')
    .addLayer(L.mapbox.tileLayer('nguyenalexander.lofliff0'));

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    map.setView([position.coords.latitude, position.coords.longitude], 10);
    })
   }

  var cluster = new L.MarkerClusterGroup();

  for (var i = 0; i < markers.length; i++) {
    var a = markers[i];
    var title = a['username'];
    var marker = L.marker(new L.LatLng(a['lat'],a['lng']), {
      icon: L.mapbox.marker.icon({'marker-symbol':'post', 'marker-color':'0044FF'}),
      title: title
    });
    marker.bindPopup(title);
    cluster.addLayer(marker);
  }

  map.addLayer (cluster)

  function onmove() {
    var inBounds = [],
        bounds = map.getBounds();
    cluster.eachLayer(function(marker) {
        if (bounds.contains(marker.getLatLng())) {
            inBounds.push(marker.options.title);
        }
    });
    document.getElementById('coordinates').innerHTML = inBounds.join('\n');
  }

  map.on('move', onmove);
  onmove();
}







  ////////////////////////////////////////////////////////

  // var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/nguyenalexander.lofliff0/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
  //     attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  // });

  // var map = L.map('map').addLayer(mapboxTiles)

   // if (navigator.geolocation) {
   //  navigator.geolocation.getCurrentPosition(function(position) {
   //    map.setView([position.coords.latitude, position.coords.longitude], 10);

   //  })
   // }







// Since featureLayer is an asynchronous method, we use the `.on('ready'`
// call to only use its marker data once we know it is actually loaded.



//   all_user_markers = [];

//   markers.forEach(function(marker) {
//     var user_markers = L.mapbox.featureLayer({
//       type: 'Feature',
//       geometry: {
//           type: 'Point',
//           coordinates: [
//             marker.lng,
//             marker.lat
//           ]
//       },
//       properties: {
//           title: marker.username,
//           'marker-size': 'large'
//       }
//     });
//     all_user_markers.push(user_markers);
//   });

//   all_user_markers.forEach(function(user) {
//     user['_geojson'] = new L.MarkerClusterGroup(function(e){
//         e.target.eachLayer(function(layer) {
//         e.addLayer(layer);
//     });
//     })
//     // L.mapbox.featureLayer(user['_geojson'], function(e){


//     //   console.log('this is the callback',e)
//     // // The clusterGroup gets each marker in the group added to it
//     // // once loaded, and then is added to the map
//     // var clusterGroup = new L.MarkerClusterGroup();

//     // console.log('This is the cluster group',clusterGroup)
//     map.addLayer(user['_geojson']);
//     });
//   // })


// }

// var drawMap = function(markers) {

// L.mapbox.accessToken = 'pk.eyJ1Ijoibmd1eWVuYWxleGFuZGVyIiwiYSI6Il93WXc2SjQifQ.u8x_VseaLesD3vof-EjOCA';
//     var map = L.mapbox.map('map', 'nguyenalexander.lofliff0')
//         .setView([-37.82, 175.215], 14);

//
// }

