// Refresh for all data: table and map
var map;
var marker;
var path_vector = [];
var markers = [];
var sw=0;
var lat,auxlat,datei,r;
var lng,auxlng;
var lats=[];
var lngs=[];
var intlats=[];
var intlngs=[];
var intlat=[];
var intlng=[];
var fechas=[];
var idx=1;
var windows=[];
var dates=[];
var paths=[];
var pointmarkerpath = [];
var pointmarker_vector = [];
var pointmarkers = [];
var pathpoly = [];
var circles =[];
var w=0;
var l1,l2;
var id_vector = [];
var lat_vector = [];
var lng_vector = [];
var fecha_vector = [];
var ltis,lngis,dates_filtered,id_filtered;

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
	var marker = new google.maps.Marker({ 
    position: new google.maps.LatLng(lat, lng),
    draggable: false, 
    map: map,
    icon: pointSymbol
   });
  pointmarkerpath.push(new google.maps.LatLng(lat, lng));
  pointmarker_vector.push(marker);
}

function remove_point_marker(){
  pointmarkerpath = [];
  for (var i = 0; i < (pointmarker_vector.length); i++){
    pointmarker_vector[i].setMap(null);
  }
}

function refresh_marker(latitude, longitude, fecha,id) {
  clearMarkers();
  //DrawCircle();
  l1=latitude;
  l2=longitude;
  path_vector.push(new google.maps.LatLng(latitude, longitude));
  pathpoly.push(new google.maps.LatLng(latitude,longitude));
  id_vector.push(id);
  fechas.push(fecha);
  //fechas.forEach(function(elemento,indice,array){
    //var auxfecha=String(elemento);
    //dates.push(auxfecha);
  //});
  var icon_base = 'http://34.230.52.250/';
  var marker = new google.maps.Marker({ 
    position: new google.maps.LatLng(latitude, longitude),
    draggable: true, 
    map: map,
    icon: icon_base + "marktruck_opt.png",
    title: "Position"
   });
  markers.push(marker);
  map.setCenter(new google.maps.LatLng(latitude, longitude)); 
  google.maps.event.addListener(marker, 'dragend', function(evt){
      changeMarkerPosition(auxlat,auxlng,marker);
      CloseWindows();
      DrawCircle();
      var infowindow = new google.maps.InfoWindow({
        content:"Latitud: " + String(auxlat) + ", Longitud: " + String(auxlng) + ", Fecha: " + datei
       });
      windows.push(infowindow)
      infowindow.open(map,marker);
  });
  google.maps.event.addListener(marker,'drag', function(evt){
       DrawCircle();
       lat=evt.latLng.lat().toFixed(5);
       lng=evt.latLng.lng().toFixed(5);
       var ltlng=CheckCoordinatesMatches(lat,lng);
       var lm=ltlng.indexOf(",");
       var f =ltlng.indexOf(";");
       auxlat=parseFloat(ltlng.substring(0,lm));
       auxlng=parseFloat(ltlng.substring(lm+1,f));
       datei=ltlng.substring(f+1)
  });
  google.maps.event.addListener(marker, 'click', function(evt){
      var infowindow = new google.maps.InfoWindow({
        content:"Latitud: " + evt.latLng.lat().toFixed(5) + ", Longitud: " + evt.latLng.lng().toFixed(5) + ", Fecha: " + fechas[idx]
      });
      infowindow.open(map,marker);
  });
  path_vector.forEach(function (elemento, indice, array) {
    var aux=String(elemento);
    var ini=aux.indexOf("(");
    var com=aux.indexOf(",");
    var fin=aux.indexOf(")");
    lats.push(aux.substring(ini+1,com));
    lngs.push(aux.substring(com+1,fin));
});
}

function CheckCoordinatesMatches(latitudd,longitudd) {
  var distances=[];
  var la=parseFloat(latitudd);
  var ln=parseFloat(longitudd);
  lngs.forEach(function(elemento,indice,array){
        intlngs.push(parseFloat(elemento));
        })
  lats.forEach(function(elemento,indice,array){
        intlats.push(parseFloat(elemento));
        })
        for (var i = 0; i < lats.length; i++) {
        distances.push(DerivateDistance(la,ln,intlats[i],intlngs[i]));
        }
  var min=Math.min(...distances);

  function findMinDistance(element) {
    return element == min;
  }
  var idx=distances.findIndex(findMinDistance);
  var lngi=lngs[idx];
  var lati=lats[idx];
  var date=fechas[idx];
  return lati+","+lngi+";"+date;

}

function DerivateDistance(lat1,lon1,lat2,lon2){
  var R = 6371e3; // metres
  var fi1 = ToRadian(lat1);
  var fi2 = ToRadian(lat2);
  var dfi = ToRadian(lat2-lat1);
  var dlanda = ToRadian(lon2-lon1);

  var a = Math.sin(dfi/2) * Math.sin(dfi/2) +
          Math.cos(fi1) * Math.cos(fi2) *
          Math.sin(dlanda/2) * Math.sin(dlanda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d;
}

function ToRadian(deg) {
  return deg * Math.PI / 180;
}

function setMapOnAll(map) {
  path_vector = [];
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

 function clearMarkers() {
  setMapOnAll(null);
}

function CloseWindows(map) {
  for (var i = 0; i < windows.length; i++) {
    windows[i].close();
  }
}

function changeMarkerPosition(ltud,lgtud,marker) {
  var myLatlng = new google.maps.LatLng(ltud,lgtud);
  marker.setPosition(myLatlng);
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
  pathpoly=[];
  for (var i = 0; i < (paths.length); i++){
    paths[i].setMap(null);
  }
}
function DrawCircle(){
  DeleteCircles();
  r=parseFloat(document.getElementById("slider").value);
  if (w==0){
    var coord=new google.maps.LatLng(l1, l2);
    w=1;
  }else{
    var coord=new google.maps.LatLng(auxlat, auxlng);
  }
  //var coord=new google.maps.LatLng(auxlat, auxlng);
  var Circle = new google.maps.Circle({
    strokeColor: '#1242F3',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#1242F3',
    fillOpacity: 0.35,
    map: map,
    center: coord,
    radius: r
  });
  circles.push(Circle);
  MeasureDistance(auxlat,auxlng,r);
}
function DeleteCircles(){
  for (i=0;i<circles.length;i++){
    circles[i].setMap(null);
  }
}
function MeasureDistance(longbase,latbase,r){
  var distances=[];
  dates_filtered=[];
  id_filtered=[];
  ltis=[];
  lngis=[];
  for (var i = 0; i < lats.length; i++) {
    distances.push(DerivateDistance(longbase,latbase,intlats[i],intlngs[i]));
    if (distances[i]<r){
      ltis.push(lats[i]);
      lngis.push(lngs[i]);
      dates_filtered.push(dates[i]);
      id_filtered.push(id_vector[i]);
    }
  }
  filter_table();
}

function filter_table(){
  var lat_received =  ltis; var lng_received = lngis;
  var fecha_received = dates_filtered; var id_received = id_filtered; 
  var oTable = document.getElementById("table-historics");
  var rowLength = oTable.rows.length;
  var id_val = null;
  var id_to_mark = []; var id_saved = [];
  length_received = id_received.length;
  var i = 0; var j = 0;
  while(i<id_received.length){
    j = 0;
    while(j < rowLength){
      var oCells = oTable.rows.item(j).cells;
      id_val = oCells.item(0).innerHTML;
      if(id_received[i] == id_val){
        id_to_mark[i] = id_val; 
        id_saved[i] = j;
        j = rowLength;
      }else{
        j = j+1;
      }
    }
    i = i+1;
  }
  for(m = 1;m<rowLength;m++){
    var y = document.getElementById("table-historics").rows[m];
    y.style.backgroundColor = "white";
  }
  for(k=0;k<id_saved.length;k++){
    var y = document.getElementById("table-historics").rows[id_saved[k]];
    y.style.backgroundColor = "lightBlue";
  }
    


}
