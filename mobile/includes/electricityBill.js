
$(document).ready(function() {
    $(".electricForm").submit(function(e) {
        e.preventDefault();
        displayInfo("check")
    });
})

function displayInfo(data) {
	var lightBox = $("<div id='light'></div>");
	lightBox.append("<h2>התשלום בוצע בהצלחה !</h2>");
	var paragraph = $("<p></p>");
	lightBox.append(paragraph);
	lightBox.append("<br>");
	lightBox.append("<button class = 'confirm'>אישור</button>");
	$("body").prepend("<div id='fade'></div>");
	$("body").prepend(lightBox);
	$("#fade").on("click", function() {
		$("#light").remove();
		$("#fade").remove();
	});
	$("#fade").show();
	lightBox.show();
}
