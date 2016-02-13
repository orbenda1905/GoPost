
$(document).ready(function() {
    $(".pickUpForm").submit(function(e) {
        e.preventDefault();
        displayInfo("check")
    });
})

function displayInfo(data) {
	var lightBox = $("<div id='light'></div>");
	lightBox.append("<h2>החבילה תיטען למכונה בסניף המבוקש <br> תודה ויום טוב !</h2>");
	var paragraph = $("<p></p>");
	lightBox.append(paragraph);
	lightBox.append("<br>");
	$("body").prepend("<div id='fade'></div>");
	$("body").prepend(lightBox);
	$("#fade").on("click", function() {
		$("#light").remove();
		$("#fade").remove();
	});
	$("#fade").show();
	lightBox.show();
}
