<?php

	include ("db.php");

	$boxId = $_REQUEST["boxId"];
	$deliveryOption = $_REQUEST["delivery"];

	$query = null;

	if ($deliveryOption == "selfPicking") {
		$query = "UPDATE tbl_DeliveryBoxes_207 SET Delivery_option = 'איסוף עצמי' WHERE deliveryId = '$boxId'";
	}

	if ($deliveryOption == "drone") {//not realy in use
		$query = "UPDATE tbl_DeliveryBoxes_207 SET Delivery_option = 'רחפן' WHERE deliveryId = '$boxId'";
	}

	if ($deliveryOption == "deliveryGuy") {//not realy in use
		$query = "UPDATE tbl_DeliveryBoxes_207 SET Delivery_option = 'שליח' WHERE deliveryId = '$boxId'";
	}

	mysqli_query($connection, $query);

	mysqli_close($connection);
?>
