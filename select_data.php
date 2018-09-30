<?php
	require_once 'db_connection.php'; # Script que realiza la conección a la base de datos
	function select_data($sql){
		$conn = OpenCon(); # Abro la conexión a la base de datos desde el php que importé	
		$result = $conn->query($sql);  # Realiza la consulta que le han encargalo $sql, en este caso selecciona el dato
		if($result){ 					# Si hay resultado en la consulta, la rutina continúa
			if($result->num_rows > 0){	# Si el número de filas es mayor que cero, esto es, si encontró un resultado
				return $result;			# retorno lo encontrado, la fila que encontré
			}else{
				return "zero";			# Si no hay resultados encontrados, retorno cero
			}
		}else{
			return $result->error;		# Si no hubo resultado en la consulta, retorno que hubo un error al realizar la consulta
		}
	}
?>