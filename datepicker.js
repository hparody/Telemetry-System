var active = false;
var lat_val = null;
var lng_val = null;
var fecha_val = null;
var id_val = null;
var lat_vector_table = [];
var lng_vector_table = [];
var fecha_vector_table = [];
var id_vector_table = [];
var currentValueDate = null;
var currentValueTime = null;

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
		currentValueDate = $("#datepicker_from").bfhdatepicker().val();
		$("#datepicker_to").bfhdatepicker().val(currentValueDate);
		$("#datepicker_to").bfhdatepicker({
			min: currentValueDate
		}); 
	});
	$("#timepicker_from").on("change.bfhtimepicker",function (e) {
		var currentValueTime = $("#timepicker_from").bfhtimepicker().val();
		$("#timepicker_to").bfhtimepicker().val(currentValueTime);
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
		fillTableVectors();
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
		var rowLength = oTable.rows.length; 
		for (j = 0; j < rowLength; j++){
			console.log(lat_vector_table[j]);
			console.log(id_vector_table[j]);
			console.log(lng_vector_table[j]);
			console.log(fecha_vector_table[j]);
			lat_val = lat_vector_table[j];
			lng_val = lng_vector_table[j];
			fecha_val = fecha_vector_table[j];
			id_val = id_vector_table[j];
			if (j > 0) {
				refresh_marker(lat_val,lng_val,fecha_val,id_val);
				point_marker(lat_val,lng_val);
			}
			if(j == 0){
				// DeleteCircles();
				clearMarkers();
				removePolyline();
				remove_point_marker();
				initVariablesAgain();  
			}
			if(j == (rowLength-1)){
				polyline();
			}
		}
	}else{
		alert("Por favor consulte primero el rango deseado");
	}
}
function fillTableVectors(){
	lat_vector_table = [];
	lng_vector_table = [];
	fecha_vector_table = [];
	id_vector_table = [];
	var oTable = document.getElementById("table-historics");
	var rowLength = oTable.rows.length; 
	for (i = 0; i < rowLength; i++){
		var oCells = oTable.rows.item(i).cells;
		id_vector_table.push(oCells.item(0).innerHTML);
		lat_vector_table.push(oCells.item(1).innerHTML);
		lng_vector_table.push(oCells.item(2).innerHTML);
		fecha_vector_table.push(oCells.item(3).innerHTML);
	}	
}