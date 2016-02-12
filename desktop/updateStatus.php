<?php
	include ("db.php");

	$toDo = $_RESULT['action'];

	if ($toDo == "pickup") {
		$boxId = $_RESULT['boxId'];
		$query = "UPDATE tbl_DeliveryBoxes_207 SET Loaded = 'טעון' WHERE deliveryId = '$boxId'" ;
		mysqli_query($connection, $result);
	}

	mysqli_close($connection);
?>
