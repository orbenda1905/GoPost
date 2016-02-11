///*-----floating menu script-----*/
//$(function($){
//        $('#menu').click(function(){
//        $('.responsiveMenu').toggleClass('expand');
//    });
//});

$(document).ready(function() {

	$('#menu').click(function(){
        $('.responsiveMenu').toggleClass('expand');
    });

	var boxId = $(location).attr("href").split("?")[1].split("=")[1];//getting the boxId from the url
	$(".selfPickup").attr("href", "pickup.html?boxId=" + boxId);
	var id = localStorage.getItem(boxId);
	var address = id.split(",")
	var city = address[1];
	var street = address[0].split(" ");
	$(".pickUpForm").children().first().children(1).val(boxId);
	var triple = document.getElementsByClassName("tripleInput");//We did this in JavaScript because Jquery is doing problems when trying to pick from an array of class name
	triple[0].value = city;
	triple[1].value = street[0] + " " + street[1];
	triple[2].value = street[2];
	$(".pickUpForm").submit(function(e) {
		e.preventDefault();
		$('body').fadeIn(200).append("<div class='waitingSign'></div>");
		$("body").append("<div id='fade'></div>");
		$("#fade").show();
		$.get("updateBox", {boxId: boxId, delivery: "selfPicking"}, function() {
			$('.waitingSign').fadeOut(200, function() {
				$('.waitingSign').remove();
				$("#fade").remove();
			});
			window.location.replace("index.html");
		});
	});
})
