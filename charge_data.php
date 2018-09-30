<?php
	include 'select_data.php';

		//$sql = "SELECT * FROM `coordenadas`"; 	# Esta es la consulta que voy a generar
		$sql = "SELECT ID,Latitud,Longitud,Fecha FROM coordenadas ORDER BY ID DESC LIMIT 1";
		$result = selectdata($sql);	
			# Llevo la consulta a la función select data para tomar los datos que deseo
		if($result != "zero"){			# Si la consulta me retornó cero significa que no obtuve datos, hubo algún 					 										# error, la base de datos aún está vacía
			while($row = $result->fetch_assoc()){
 				echo "<tr>";
 				echo "<td width=10%>" . $row['ID']. "</td>";
 				echo "<td width=25%>" . $row['Latitud']. "</td>";
 				echo "<td width=25%>" . $row['Longitud']. "</td>"; 
 				echo "<td>" . $row['Fecha']. "</td>"; 
 				echo "</tr>";
 			} 
		}
?>