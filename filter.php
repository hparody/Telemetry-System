<?php
	require_once 'select_data.php';
	$from_date = $_POST["from_date"]; 
	$to_date = $_POST["to_date"];
	$query = "SELECT * FROM coordenadas WHERE Fecha BETWEEN '$from_date' AND '$to_date' ORDER BY ID ASC";
	$result = select_data($query); 
	if($result != "zero"){			# Verify if the query was succesfull
		while($row = mysqli_fetch_array($result)){ 
			$ID = $row['ID'];
			$Fecha = $row['Fecha'];
			$lat = $row['Latitud'];
			$long = $row['Longitud'];
			echo '<tr align="center">
					<td width="10%">'.$ID.'</td>
					<td width="25%">'.$lat.'</td>
					<td width="25%">'.$long.'</td>
					<td width="30%">'.$Fecha.'</td>
				 </tr>';
		}
	}else{								
		$error = 'Query Error';
		echo $error;			# En ambos casos tengo que retornar coordenadas
	}
?>