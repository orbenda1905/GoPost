var Client = function (pName, lName, pId) {//class represents client
	var fName = pName;
	var lastName = lName;
	var id = pId;

	this.getFirstName = function () {
		return fName;
	};
	this.getLastName = function() {
		return lastName;
	}
	this.getId = function () {
		return id;
	};
};

var Mazal = new Client("מזל", "ניסמוב", "302945241");

$(document).ready(function() {
	$('#menu').click(function(){
        $('.responsiveMenu').toggleClass('expand');
    });
	var amount = $(location).attr("href").split("?")[1].split("=")[1];
	fillForm(amount);
    $(".electricForm").submit(function(e) {
        e.preventDefault();
        displayInfo(amount);
    });
})

function fillForm(amount) {
	var fields = document.getElementsByClassName("field");
	fields[0].value = Mazal.getFirstName();
	fields[1].value = Mazal.getLastName();
	fields[2].value = Mazal.getId();
	document.getElementsByClassName("bill")[0].innerHTML = amount + "₪";
}

function displayInfo(amount) {
	var lightBox = $("<div id='light'></div>");
	lightBox.append("<h2>התשלום בוצע בהצלחה !</h2>");
	lightBox.append("<br>");
	lightBox.append("<button class = 'confirm'>אישור</button>");
	$("body").prepend("<div id='fade'></div>");
	$("body").prepend(lightBox);
	$("#fade").on("click", function() {
		window.location.replace("home.html");
	});
	$(".confirm").on("click", function() {
		window.location.replace("home.html");
	});
	$("#fade").show();
	lightBox.show();
}
