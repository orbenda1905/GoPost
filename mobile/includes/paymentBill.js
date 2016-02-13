
$(document).ready(function() {
    $(".electricForm").submit(function(e) {
		e.preventDefault();
		var billNum = $(".electricInput").val();
		$('body').fadeIn(200).append("<div class='waitingSign'></div>");
		$("body").append("<div id='fade'></div>");
		$("#fade").show();
		$.getJSON("data/bill.json", function(data) {
			$.each(data.electricity, function(k, v) {
				if (v.rec_Code == billNum) {
					displayInfo(v.rec_Code, v.total);
				}
			});
		});
		$(".waitingSign").remove();
		$("#fade").remove();
//        displayInfo("check");
    });
})

function displayInfo(billNum, amount) {
	var lightBox = $("<div id='light'></div>");
	lightBox.append("<h2>חברת חשמל - פרטי החשבונית</h2>");
	lightBox.append("<p>" + "חשבון דו חודשי"+"<br>" + "חוזה מספר - " + billNum + "<br>" +"<br>" +"<br>" +"חשבון לתקופה של 60 ימים"+ "<br>" +
                    "מ-18.9.15 עד 17.11.15" + "<br>" + "חיוב בגין צריכה - סה״כ 212 קוט״ש" + "</p><br>");
//	 "<h2>סה״כ לתשלום 158₪</h2>"
	lightBox.append("<h2>סה״כ לתשלום " + amount + "₪" + "</h2>" + "<h2> יש לשלם חשבון זה עד 4.12.15</h2>" + "<br>");
	var paragraph = $("<p></p>");
	lightBox.append(paragraph);
	lightBox.append("<br>");
	lightBox.append("<button class = 'scan'>ביטול</button>");
	lightBox.append("<button class = 'paymentElc'>לתשלום" + "<br>" + "<span class='credit'>(בכרטיס אשראי)</span>" + "</button>");

	$("body").prepend("<div id='fade'></div>");
	$("body").prepend(lightBox);
	$("#fade").on("click", function() {
		clearLIghtBox();
	});
	$(".scan").on("click", function() {
		clearLIghtBox();
	});
	$(".paymentElc").on("click", function() {
		window.location = "electricityBill.html?amount=" + amount;
	});
	$("#fade").show();
	lightBox.show();
}

function clearLIghtBox() {
	$("#fade").fadeOut(100, function() {
		$(this).remove();
	});
	$("#light").fadeOut(100, function() {
		$(this).remove();
	});
}
