<?php
include 'cad.php';
include 'db_connection.php';
 
$sql = "CREATE TABLE coordenadas(
ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
Latitud VARCHAR(30) NOT NULL,
Longitud VARCHAR(30) NOT NULL,
Fecha VARCHAR(30)
)";
 
$result = ExecuteQuery($sql,"Table Created Successfully");
 
echo $result;
?>