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
			console.log(json);
			if (json.exist === "no") {
//				notExist(boxId);
				var fade = $("<div id='lightFade'></div>");
				var lightBox = $("<div id='light'></div>");
				lightBox.append("<p>החבילה המבוקשה אינה קיימת במאגר</p><br><p>אנא בדוק שהקלדת את הקוד במדויק</p>");
				fade.on("click", function() {
					lightBox.remove();
					fade.remove();
				});
				$("body").append(fade);
				$("body").append(lightBox);
				fade.show();
				lightBox.show();
				return;
			}
			var boxNumOnList = boxes[json.id]
			if (boxNumOnList) {
				alert("box exist");
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
	var statusClass = $("<div class='status'></div>");
	if (data.status === "מוכן") {
		statusClass.append("<a class='readySts' href=pickupOptions.html?boxId=" + data.id + "></a>");
	}else {
		var infoBtn = $("<a class='infoSts' href='#'></a>");
		infoBtn.on("click", function() {
			displayInfo(data);
//			alert(data.id);
		});
		statusClass.append(infoBtn);
	}
	box.append(statusClass);
	box.append("<div class='clear'></div>");
	$("main").append(box);
}

function displayInfo(data) {
	var lightBox = $("<div id='light'></div>");
	lightBox.append("<h2>פרטי החבילה</h2>");
	lightBox.append("<p>" + "דואר רשום מספר - " + data.id + "<br>" +
				  				"השולח - " + data.from + "<br>" +
				  				"נמען - מקס שיין, רחובות<br>" + "</p><br>");
	lightBox.append("<h2>פרטי יחידת הדואר לאיסוף</h2>");
	var paragraph = $("<p></p>");
	paragraph.append(data.office + "<br>");
	paragraph.append("שעות פתיחה:<br>");
	paragraph.append("ימים א׳, ב׳, ה׳ - 08:00 - 19:00<br>");
	paragraph.append("ימים ג׳, ד׳, ו׳ - 08:00- 13:00");
	lightBox.append(paragraph);
	lightBox.append("<br>");
	lightBox.append("<button class = 'scan'>אשר</button>");
	lightBox.append("<button class = 'camera'></button>");
	$("body").prepend("<div id='fade'></div>");
	$("body").prepend(lightBox);
	$(".scan").on("click", function() {
		$("#light").remove();
		$("#fade").remove();
	});
	$("#fade").on("click", function() {
		$("#light").remove();
		$("#fade").remove();
	});
	$("#fade").show();
	lightBox.show();
}
