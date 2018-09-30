var active = false;
var lat_val = null;
var lng_val = null;
var fecha_val = null;
var id_val = null;

$(document).ready(function() {
	$("#datepicker_from").bfhdatepicker({
		format: 'y-m-d',
		max: 'today',
		input:'form-control',
	}); 
	$("#datepicker_to").bfhdatepicker({
		format: 'y-m-d',
		max: 'today',
		input:'form-control'
	});
	
	$("#timepicker_from").bfhtimepicker();
	$("#timepicker_to").bfhtimepicker();

	$("#datepicker_from").on("change.bfhdatepicker", function (e) {
		var currentValue = $("#datepicker_from").bfhdatepicker().val();
		$("#datepicker_to").bfhdatepicker().val(currentValue);
		$("#datepicker_from").bfhdatepicker({
			min:'2018-09-14'
		});
	});
});

function getValues(){
    var fromDate = $("#datepicker_from").bfhdatepicker().val();
    var fromHour = $("#timepicker_from").bfhtimepicker().val();
    var toDate = $("#datepicker_to").bfhdatepicker().val();
    var toHour = $("#timepicker_to").bfhtimepicker().val();
    var from_Date_Time = fromDate + ' ' + fromHour;
    var to_Date_Time = toDate + ' ' + toHour;
    if(from_Date_Time!= '' && to_Date_Time != '') {
		$.ajax({
		  'async': false,  
		  'type': "POST",
		  'global': false,
		  'dataType': 'html',
  		  'url': "filter.php",  
		  'data':{from_date:from_Date_Time, to_date:to_Date_Time},  
		  'success':function(data) {
		  if (data != "Query Error") {  
		   	$('#body_historics').html(data);
		   	active = true;
		   }else{
		   	alert("No se encontraron datos en este rango de tiempo. Por favor modifique las fechas de inicio y fin.");
		   	active = false;
		   }
		  }  
     	});
    }else {  
    	alert("Please Select Date and Time");  
    }
}
function plot_path(){
	if (active) {
		lat_val = null;
		lng_val = null;
		fecha_val = null;
		id_val = null;
		DeleteCircles();
		var oTable = document.getElementById("table-historics");

		//gets rows of table
		var rowLength = oTable.rows.length; 
		for (i = 0; i < rowLength; i++){
		   //gets cells of current row
		   var oCells = oTable.rows.item(i).cells;
		   //gets amount of cells of current row
		   var cellLength = oCells.length;
		   //loops through each cell in current row
		   	for(var j = 0; j < cellLength; j++){
		      /* get your cell info here */
		      /* var cellVal = oCells.item(j).innerHTML; */
		      if (j == 1) {
		      	lat_val = oCells.item(j).innerHTML;
		      }
		      if (j == 2) {
		      	lng_val = oCells.item(j).innerHTML;
		      }
		      if (j == 3) {
		      	fecha_val = oCells.item(j).innerHTML;
		      }
		      if (j == 0){
		      	id_val = oCells.item(j).innerHTML;
		      }
		    }
		   if (i > 0) {
		   	refresh_marker(lat_val,lng_val,fecha_val,id_val);
		   	point_marker(lat_val,lng_val);
		   }
		   if(i == 0){
		   	//DeleteCircles();
		   	clearMarkers();
		   	removePolyline();
		   	remove_point_marker();
		   }
		   if(i == (rowLength-1)){
		   	polyline();
		   }
		}
	}else{
		alert("Por favor consulte primero el rango deseado");
	}
}