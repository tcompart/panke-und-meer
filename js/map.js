/*globals google*/
function initialize() {
  var mapCanvas = document.getElementById('map_canvas');
  var latLong = new google.maps.LatLng(52.632640, 13.495620);
  var mapOptions = {
    center: latLong,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  var marker = new google.maps.Marker({
    position: latLong,
    map: map,
    title: 'Panke & Meer'
  });
}

var google = google || null;
if (google !== null) {
  google.maps.event.addDomListener(window, 'load', initialize);
}