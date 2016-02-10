$(document).ready(function() {
	showCurrentDate();

})

function showCurrentDate() {
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	$(".date").html("<p>" + day + "." + month + "." + year + "</p>");
}
