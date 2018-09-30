// Refresh for all data: table and map
var myInterval = setInterval(refresh, 2900);
var map;
var marker;
var path_vector = [];
var markers = [];
var paths=[];
var pathpoly = [];
var pointmarkerpath = [];
var pointmarkers = [];

function get_all_data(){
  var received_data = null;
    $.ajax({
      'async': false,
      'type': "POST",
      'global': false,
      'dataType': 'json',
      'url': "get_data.php",
      'success': function (data) {
          received_data = data;
      }
    }); 
  return received_data;
}

function refresh() {
  var coord = get_all_data();
  var ID = document.getElementById("ID"); 
  ID.textContent = coord[0];
  var Latitud = document.getElementById("Latitud"); 
  Latitud.textContent =  coord[1];
  var Longitud = document.getElementById("Longitud"); 
  Longitud.textContent = coord[2];
  var Fecha = document.getElementById("Fecha"); 
  Fecha.textContent = coord[3];
  if(coord[1] != "48.858093" && coord[1] != "-33.856159"){
    refresh_marker(coord[1], coord[2],coord[3]);
    point_marker(coord[1],coord[2]);
    removePolyline();
    polyline();
  }
}

function initMap() { 
  var coordinates = get_all_data();
  var lat_i = coordinates[1];
  var lng_i = coordinates[2];
  var fecha_i = coordinates[3];
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(lat_i, lng_i), 
    zoom: 15, 
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  if(lat_i != "48.858093" && lat_i != "-33.856159"){
    clearMarkers();
    path_vector.push(new google.maps.LatLng(lat_i, lng_i));
    var icon_base = 'http://34.230.52.250/';
    var marker = new google.maps.Marker({ 
      position: new google.maps.LatLng(lat_i, lng_i), 
      map: map,
      icon: icon_base + "marktruck_opt.png",
      title: "Position"
     });
    markers.push(marker);
    map.setCenter(new google.maps.LatLng(lat_i, lng_i)); 
    google.maps.event.addListener(marker,'click',function() {
      var infowindow = new google.maps.InfoWindow({
        content:"Latitud: " + lat_i + ", Longitud: " + lng_i + ", Fecha: " + fecha_i
      });
    infowindow.open(map,marker);
    });
  }
}

function refresh_marker(latitude, longitude,fecha) {
  clearMarkers();
  path_vector.push(new google.maps.LatLng(latitude, longitude));
  pathpoly.push(new google.maps.LatLng(latitude,longitude));
  var icon_base = 'http://34.230.52.250/';
  var marker = new google.maps.Marker({ 
    position: new google.maps.LatLng(latitude, longitude), 
    map: map,
    icon: icon_base + "marktruck_opt.png",
    title: "Position"
   });
  markers.push(marker);
  map.setCenter(new google.maps.LatLng(latitude, longitude)); 
  google.maps.event.addListener(marker,'click',function() {
    var infowindow = new google.maps.InfoWindow({
      content:"Latitud: " + latitude + ", Longitud: " + longitude + ", Fecha: " + fecha
    });
  infowindow.open(map,marker);
  });
}
function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
 function clearMarkers() {
        setMapOnAll(null);
      }

function polyline() {
  var flightPath = new google.maps.Polyline({
    path:pathpoly,
    strokeColor:"#1a1f26", // "#1a1f26"
    strokeOpacity:0.5,
    strokeWeight:5,
    map: map
  });
  paths.push(flightPath);
}

function removePolyline(){
  for (var i=0; i< paths.length;i++){
    paths[i].setMap(null);
  }
}

function point_marker(lat, lng){
  var pointSymbol = {
      // path: 'M -1,0 0,-1 1,0 0,1 z',
      path: 'M 0,0 m -1,0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0',
      strokeColor: '#33334d',
      fillColor: '#33334d',
      fillOpacity: 0.7,
      scale:3,
      strokeWeight: 0.2
    };
  pointmarkerpath.push(new google.maps.LatLng(lat, lng));
  var marker = new google.maps.Marker({ 
    position: new google.maps.LatLng(lat, lng),
    draggable: false, 
    map: map,
    icon: pointSymbol
   });
}