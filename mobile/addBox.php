<?php
	include ("db.php");

	$clientId = $_REQUEST['pId'];
	$boxId = $_REQUEST['boxId'];

	$query = "SELECT * FROM tbl_DeliveryBoxes_207 WHERE deliveryId = '$boxId' AND personId = $clientId";
	$result = mysqli_query($connection, $query);

	$answer = null;

	if (mysqli_num_rows($result) === 0) {
		$answer =  array("exist" => "no");
	} else {
		$row = mysqli_fetch_assoc($result);
		$from = $row['From'];
		$status = $row['Status'];
		$office = $row['Office_branch'];
		$status = $row['Status'];
		$answer = array("exist" => "yes",
						"id" => $boxId,
						"from" => $from,
						"office" => $office,
						"status" => $status);
		mysqli_free_result($result);
	}
	echo json_encode($answer);
	mysqli_close($connection);
?>
