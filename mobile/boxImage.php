<?php
	include ("db.php");
     $sql = "SELECT * FROM tbl_DeliveryBoxes_207_img";

     // the result of the query
     $result = mysql_query("$sql") or die("Invalid query: " . mysql_error());

     // close the db link
     mysql_close($link);
?>
