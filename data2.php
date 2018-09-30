<?php
	$servername = "localhost";
    $username = "hemel";
    $password = "parody2324";
    $dbname = "practice";
    // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
       	// Check connection
        if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        } 
        $sql = "SELECT ID, Latitud, Longitud, Fecha FROM coordenadas ORDER BY ID DESC LIMIT 1";
        $resultado = $conn->query($sql);
        $fila = mysqli_fetch_row($resultado);

        $result = json_encode($fila);  
        echo $result;
        $conn->close();      
?>

