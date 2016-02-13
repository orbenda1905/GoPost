<?php
	include ("db.php");

	$toDo = $_REQUEST['action'];

	if ($toDo == "pickup") {

		$boxId = $_REQUEST['boxId'];

		$query = "UPDATE tbl_DeliveryBoxes_207 SET Loaded = 'טעונה' WHERE deliveryId = '$boxId'" ;
		mysqli_query($connection, $query);
	}

	mysqli_close($connection);
?>
