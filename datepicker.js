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
var pickerDateFrom = null;
var pickerDateTo = null;
var pickerHourFrom = null;
var pickerHourTo = null;

$(document).ready(function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var min = today.getMinutes();
	var currentDateTime = yyyy +"-" + mm + "-" + dd + " " + hh + ":" + min;
	var currentDate = yyyy +"-" + mm + "-" + dd +" 23:59";
	var endDate = moment().startOf('hour').add(32, 'hour');
	$('input[name="daterange"]').daterangepicker({
		opens: 'center',
		minDate: "2018-09-05 00:00",
		maxDate: currentDate,
		timePickerIncrement: 10,
		minYear: 2018,
		maxYear: yyyy,
		timePicker24Hour: true,
		timePicker: true,
		autoApply: true,
		startDate: currentDateTime,
		endDate: endDate,
		locale: {
			format: 'YYYY-MM-DD HH:mm'
		}
	});

	$("slider").bfhslider({

	});
});

$('#daterange').on('apply.daterangepicker', function(ev, picker) {
	pickerDateTimeFrom = picker.startDate.format('YYYY-MM-DD HH:mm');
	pickerDateTimeTo = picker.endDate.format('YYYY-MM-DD HH:mm');
});

function getValues(){
    var from_Date_Time = pickerDateTimeFrom;
    var to_Date_Time = pickerDateTimeTo;
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