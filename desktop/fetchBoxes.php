<?php
	include ("db.php");


	$toDo = $_REQUEST['action'];

	if ($toDo == "pickup") {
		$query = "SELECT * FROM tbl_DeliveryBoxes_207 WHERE Delivery_option = 'איסוף עצמי'";
		$result = mysqli_query($connection, $query);
		$dataArray = array();
		while ($row = mysqli_fetch_assoc($result)) {

			$dataArray[] = $row;
		}
		echo json_encode($dataArray);
		mysqli_free_result($result);
	}

	mysqli_close($connection);
?>
