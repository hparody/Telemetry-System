<?php 
	require 'db_connection.php';
	require 'cad.php';

	$conn = OpenCon();
	echo "Database Connected Successfully <br>";
	mysqli_query($conn,"RENAME TABLE `" . "VAS" . "` TO `" . "Coordenadas" . "`" );

	CloseCon($conn);
?>
