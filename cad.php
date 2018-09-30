<?php
	function ExecuteQuery($sql,$name){
		$conn = OpenCon();
		if ($conn->query($sql) == true){
			return $name;
		} else {
			$error = "Error creating table: ".$conn->error;
			CloseCon($conn);
			return $error;
		}
	}

function ModifyColumn($table,$columnname,$datatype)
{
	$query = "ALTER TABLE ". $table."
	MODIFY COLUMN ". $columnname ." ".$datatype;
	
	$result = ExecuteQuery($query,"Column successfully modified");
	return $result;
}


function DropColumn($table,$columnname)
{
	$query = "ALTER TABLE ". $table."
	DROP COLUMN ". $columnname;
	
	$result = ExecuteQuery($query,"Column deleted successfully");
	return $result;
}

?>