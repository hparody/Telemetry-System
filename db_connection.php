<?php
function OpenCon(){			# Función para abrir la conexión a la base de datos
	$dbhost = "localhost";		# Nombre del host
 	$dbuser = "hemel";			# Nombre del usuario
 	$dbpass = "parody2324";	# Password del usuario
 	$db = "practice";			# Nombre de la base de datos 
 	$conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);	# Me conecto a la base de datos 
 	return $conn;	# Retorno la conección
}
 
function CloseCon($conn){	# Función para cerrar la conexión
 	$conn -> close();
}
   
?>
