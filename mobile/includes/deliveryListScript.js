var Client = function (pName, pId) {//class represents client
	var name = pName;
	var id = pId;
	this.getName = function () {
		return name;
	};
	this.getId = function () {
		return id;
	};
};

var Shani = new Client("שני", 123456789);
var boxes = new Array();

/*-----floating menu script-----*/
$(function($){
        $('#menu').click(function(){
        $('.responsiveMenu').toggleClass('expand');
    });
});

$(document).ready(function() {
	$("#deliveryAdding").submit(function(e) {
		e.preventDefault();
		$('body').fadeIn(200).append("<div class='waitingSign'></div>");
		var boxId = $(".packageId").val();
		$("body").append("<div id='fade'></div>");
		$("#fade").show();
		$.get("addBox.php", {pId: Shani.getId(), boxId: boxId}, function(data) {
			$('.waitingSign').fadeOut(200, function() {
				$('.waitingSign').remove();
				$("#fade").remove();
			});
			var json = $.parseJSON(data);
			if (json.exist === "no") {
				var fade = $("<div id='lightFade'></div>");
				var lightBox = $("<div id='light'></div>");
				lightBox.append("<h2>" + "שגיאה!!" + "</h2>");
				lightBox.append("<p>החבילה המבוקשה אינה קיימת במאגר</p><p>אנא בדוק שהקלדת את הקוד במדויק</p>");
				fade.on("click", function() {
					$("#lightFade").remove();
					$("#light").remove();
				});
				$("body").append(fade);
				$("body").append(lightBox);
				fade.show();
				lightBox.show();
				return;
			}
			var boxNumOnList = boxes[json.id]
			if (boxNumOnList) {
				var fade = $("<div id='fade'></div>");
				var light = $("<div id='light'></div>");
				light.append("<h2>" + "שגיאה!" + "</h2>");
				light.append("<p>החבילה המבוקשה קיימת כבר במאגר בנוכחי</p>");
				$("body").append(fade);
				$("body").append(light);
				fade.show();
				light.show();
				fade.on("click", function() {
					fade.remove();
					light.remove();
				});
				return;
			}
			localStorage.setItem(json.id, json.office);
			addBox(json);
		});
	});
})

function addBox(data) {
	var box = $("<section class='deliveryBox'></section>");
	var numberOfBoxes = $(".deliveryBox").length;
	boxes[data.id] = numberOfBoxes + 1;
	box.append("<div class='rec'><p>" + (numberOfBoxes+1) + "</p></div>");
	var infoSection = $("<section class='info'></section>");
	infoSection.append("<p><b>שולח: </b>" + data.from + "</p>" +
								"<p><b>סטטוס: </b>" + data.status + "</p>");
	box.append(infoSection);

    /*tom code */
    box.append("<div class='tiltLine'></div>");
	var statusClass = $("<div class='status'></div>");
	if (data.status === "מוכן") {
		var option = data.option;
		var readySts = $("<a class='readySts' href=pickupOptions.html?boxId=" + data.id + "></a>");
		statusClass.append(readySts);
		if (option) {
			readySts.on("click", function(e) {
				e.preventDefault();
				var fade = $("<div id='lightFade'></div>");
				var lightBox = $("<div id='light'></div>");
				lightBox.append("<h2>" + "שגיאה!!" + "</h2>");
				lightBox.append("<p>לחבילה המבוקשת כבר עודכן אמצעי איסוף</p><p>אמצעי האיסוף הוא - " + option + "</p>");
				fade.on("click", function() {
					$("#lightFade").remove();
					$("#light").remove();
				});
				$("body").append(fade);
				$("body").append(lightBox);
				fade.show();
				lightBox.show();
			});
		}
	}else {
		var infoBtn = $("<a class='infoSts' href='#'></a>");
		infoBtn.on("click", function() {
			displayInfo(data);
		});
		statusClass.append(infoBtn);
	}
	box.append(statusClass);
	box.append("<div class='clear'></div>");
	$("main").append(box);
}

function displayInfo(data) {
	var lightBox = $("#light");
	if (lightBox.length === 0){
		lightBox = $("<div id='light'></div>");
	}
	lightBox.append("<h2>פרטי החבילה</h2>" + "<br>");
	lightBox.append("<p>" + "דואר רשום מספר - " + data.id + "<br>" +
				  				"השולח - " + data.from + "<br>" +
				  				"נמען - מקס שיין, רחובות<br>" + "</p><br>");
	lightBox.append("<h2>פרטי יחידת הדואר לאיסוף</h2>" + "<br>");
	var paragraph = $("<p></p>");
	paragraph.append(data.office + "<br>");
	paragraph.append("שעות פתיחה:<br>");
	paragraph.append("ימים א׳, ב׳, ה׳ - 08:00 - 19:00<br>");
	paragraph.append("ימים ג׳, ד׳, ו׳ - 08:00- 13:00");
	lightBox.append(paragraph);
	lightBox.append("<br>");
	lightBox.append("<button class = 'scan'>אשר</button>");
	lightBox.append("<button class = 'camera'></button>");
	if ($("#fade").length === 0) {
		$("body").prepend("<div id='fade'></div>");
	}

	$("body").prepend(lightBox);
	$(".scan").on("click", function() {
		clearLIghtBox();
	});
	$(".camera").on("click",{data: data}, function() {
		displayImage(data);
	});
	$("#fade").on("click", function() {
		clearLIghtBox();
	});
	$("#fade").show();
	lightBox.show();
}

function displayImage(data) {

	$("#light").empty();
	$("#light").empty();
	$("#light").append("<img class='boxImage' title='box image' alt='box image' src='images/boxImage.png'>");
	$("#light").append("<button class='confirm'>חזור</button>");
	$(".confirm").on("click", {data: data}, function() {
		$("#light").empty();
		displayInfo(data);
	});
}

function clearLIghtBox() {
	$("#fade").fadeOut(100, function() {
		$(this).remove();
	});
	$("#light").fadeOut(100, function() {
		$(this).remove();
	});
}
