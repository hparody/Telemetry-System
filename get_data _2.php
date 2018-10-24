<?php 
	require_once 'select_data.php';
	$sql = "SELECT ID,Latitud,Longitud,Fecha,Vehiculo FROM coordenadas GROUP BY Vehiculo HAVING Vehiculo='2' ORDER BY ID DESC LIMIT 1"; 	# Query we want to generate
	$result = select_data($sql);
	if($result != "zero"){			# Verify if the query was succesfull
		$row = $result->fetch_assoc();
		$comp = "00.00000";
		$ID = $row['ID'];
		$Fecha = $row['Fecha'];
		if($row['Latitud'] == $comp){ 	# Error by the Syrus: If the coordinates has not been get yet we show by default Eiffel Tower's 
										#coordinates
			$lat =48.858093;
			$long =2.294694;
			$coordenadas =  array($ID,$lat,$long,$Fecha);
		}else{							# If the query is succesfull I send the coordinates founded.
			$lat = $row['Latitud'];
			$long = $row['Longitud'];
			$coordenadas =  array($ID,$lat,$long,$Fecha);
		}
	}else{								# If the query was not succcesfull, Errors in the query, DataBase or more, we show Sidney Opera 										# House coordinates
		$ID =00;
		$Fecha = "XXXX-XX-XX XX:XX";
		$lat =-33.856159;
		$long =151.215256;
		$coordenadas =  array($ID,$lat,$long,$Fecha);
	}
	$json_coord = json_encode($coordenadas);
	echo $json_coord;			# En ambos casos tengo que retornar coordenadas
?>