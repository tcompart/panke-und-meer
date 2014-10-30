/*globals google*/
! function () {
  function initialize() {
    var mapCanvas = document.getElementById('map_canvas');
    var latLong = new google.maps.LatLng(52.632640, 13.495620);
    var mapOptions = {
      center: latLong,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

    new google.maps.Marker({
      position: latLong,
      map: map,
      title: 'Panke & Meer'
    });
  }

  if (typeof google !== 'undefined') {
    google.maps.event.addDomListener(window, 'load', initialize);
  }
}();