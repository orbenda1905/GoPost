var pickupBoxes;
var avlbleDrones;
var droneBoxes;

$(document).ready(function() {
	showCurrentDate();
	markCurrentPage(1);
	$.getJSON("data/addresses.json", function(data) {
		fillDashboard(data);
	});
	defineMotions();//define the click motions on each brick on the main menu
	setBricksLinks();
})

function setBricksLinks() {
//	setCourierLink();
	setPickupLink();
	setDroneLink();
}

function setDroneLink() {
	$(".drone").on("click", function() {
		var main = $("main");
		var waitingSign = $("<div class='cssload-container'>" +
									 "<div class='cssload-whirlpool'></div></div>");
		var fade = $("<div id='fade'></div>");
		fade.append(waitingSign);
		main.fadeIn(200).append(fade);
		$.getJSON("data/addresses.json", function(data) {
			fillDronePage(data);
		});
	});
}

function fillDronePage(json) {
	var main = $("main");
	var fade = $("#fade");
	$.get("ajax/dronePage.html", function(data) {
		fade.siblings().remove();
//		main.removeAttr("class");
		main.attr("class", "mainD");
		main.append(data);
		var boxNav = $(".boxNav");
		boxNav.children().first().children().first().children().first().attr("class", "active");
		var droneSide = $(".droneSide");
		$.each(json.availableDrones, function(k, v) {
			fillDroneSide(droneSide, v.droneNum);
		});
	});
	$("#fade").fadeOut(200, function() {
		$(this).remove();
	});
}

function fillDroneSide(htmlTag, droneNum) {
	var flyDrone = $("<section class='flyDrone'></div>");
	var circle = $("<div class='circle'></div>");
	circle.append("<p>" + droneNum + "</p>");
	flyDrone.append(circle);
	htmlTag.append(flyDrone);
}

function setPickupLink() {
	$(".pickup").on("click", function() {
		var main = $("main");
		var waitingSign = $("<div class='cssload-container'>" +
									 "<div class='cssload-whirlpool'></div></div>");
		var fade = $("<div id='fade'></div>");
		fade.append(waitingSign);
		main.fadeIn(200).append(fade);
		$.get("ajax/newPIckup.html", function(data) {
			fade.siblings().remove();
			main.attr("class", "mainP");
			main.append(data);
			setBoxNavTabs(0, 1, 2);
			markCurrentPage(2);
			loadPickupBoxes();
			setBoxNavLinks();
			setSearchOption();
			});
	});
}

function setSearchOption() {
	var form = $(".boxNav").children().first().next();
//	console.log(form.children().first().val());
	var input = form.children().first();
	form.bind("submit", {input: input}, function(e) {
		e.preventDefault();
//		var boxId = this.children().first().val();
		var value = input.val();
		checkBoxId(value);
		input.val("");
	});
}

function checkBoxId(boxId) {
	var i = 1;
	var check = 0;
	var mainContent = $(".mainContent");
	mainContent.empty()
	$.each(pickupBoxes, function(k, v) {
		if (v.deliveryId.search(boxId) > -1) {
			appendBox(v, mainContent, i);
			i++;
		}
	});
	setBoxNavTabs(4);
}

function setBoxNavLinks() {
	var tab = document.getElementsByClassName("boxNav")[0].getElementsByTagName("ul")[0].children;
	tab[0].onclick = function() {
		displayPickupBoxes("all");
		setBoxNavTabs(0, 1, 2);
	};
	tab[1].onclick = function() {
		displayPickupBoxes("loaded");
		setBoxNavTabs(1, 0, 2);
	};
	tab[2].onclick = function() {
		displayPickupBoxes("waiting");
		setBoxNavTabs(2, 0, 1);
	};
}

function setBoxNavTabs(pickedTab, notPicked1, notPicked2) {
	var tabs = document.getElementsByClassName("boxNav")[0].getElementsByTagName("ul")[0];
	if (pickedTab === 4) {
		tabs.children[0].children[0].removeAttribute("class");
		tabs.children[1].children[0].removeAttribute("class");
		tabs.children[2].children[0].removeAttribute("class");
		return;
	}
	tabs.children[pickedTab].children[0].setAttribute("class", "active");
	tabs.children[notPicked1].children[0].removeAttribute("class");
	tabs.children[notPicked2].children[0].removeAttribute("class");
}

function loadPickupBoxes() {
	$.get("fetchBoxes.php", {toDo: "pickup"}, function(data) {
		pickupBoxes = $.parseJSON(data);
		displayPickupBoxes("all");
	});
}

function displayPickupBoxes(action) {
	var mainContent = $(".mainContent");
	mainContent.empty();
	var i = 1;
	$.each(pickupBoxes, function(k, v) {
		if (action === "all") {
			appendBox(v, mainContent, i);
			i++;
		}
		else if (action === "loaded") {
			if (v.Loaded) {
				appendBox(v, mainContent, i);
				i++;
			}
		}
		else{
			if (!v.Loaded) {
				appendBox(v, mainContent, i);
				i++;
			}
		}
	});
	$("#fade").fadeOut(200, function() {
		$(this).remove();
	});
}

function appendBox(objVal, htmlTag, boxNum) {
	var status = "ממתינה";
	if (objVal.Loaded) {
		status = objVal.Loaded;
	}
	var box = $("<section class='box'></section>");
	box.append("<div class='circle'><p>" + boxNum + "</p></div>");
	var packageDel = $("<section class='packageDel'></section>");
	var packageNum = $("<div class='packageNum'></div>");
	packageNum.append("<p>" + objVal.deliveryId + "</p>");
	var form = $("<form action='#'></form>");
	var label = $("<label>סטטוס</label>");
	label.append("<input type='text' name='packageNumber' value='" + status + "' readonly>");
	form.append(label);
	packageDel.append(packageNum);
	packageDel.append(form);
	box.append(packageDel);
	htmlTag.append(box);
	if (status === "ממתינה") {
		boxStatusChanging(box.first(), objVal.deliveryId);
	}
}

function boxStatusChanging(box, boxId) {
	box.bind("click", {boxId: boxId, box: box}, function() {
		var light = $("<div id='light'></div>");
		var packageNum = $("<section class='packageNum'></section>");
		packageNum.append("<p>מספר חבילה - " + boxId + "</p>");
		light.append(packageNum);
		var form = $("<form class='lightForm' action='#'></form>");
		var section = $("<section></section>");
		var label = $("<label class='status'></label>");
		label.append("סטטוס");
		label.append("<input type='text' name='updateNumber' value='טעון' readonly>");
//		label.append("<div class='alertLine'></div>");
		section.append(label);
		form.append(section);
		light.append(form);
		form.append("<input type='submit' name='confirm' value='אשר'>");
		form.append("<button class='cancel'>בטל</button>");
		$(".mainP").prepend("<div id='fade'></div>");
		$("#fade").append(light);
		$(".cancel").on("click", function(e) {
			e.preventDefault();//default of "button" is submit!!! (cost us a lot of time)
			$("#fade").fadeOut(200, function() {
//				light.remove();
				$(this).remove();
			});
		});
		form.bind("submit", {boxId: boxId, box: box}, function(e) {
			e.preventDefault();
			$("#light").remove();
			$("#fade").append("<div class='cssload-container'>" +
							  "<div class='cssload-whirlpool'></div></div>");
			$.get("updateStatus.php", {action: "pickup", boxId: boxId}, function() {
				$.each(pickupBoxes, function(k, v) {
					if (v.deliveryId === boxId) {
						v.Loaded = 'טעונה';
					}
				});
				box.first().children().first().next().children().first().next().children().first().children().first().attr("value", "טעונה");
				$("#fade").fadeOut(200, function() {
					$(this).remove();
				});
			});
		});
	});
}

function defineMotions() {
	var courier = $(".courier");
	var drone = $(".drone");
	var package = $(".package");
	var report = $(".report");
	var pickup = $(".pickup");
	makeClickMotion(courier);
	makeClickMotion(drone);
	makeClickMotion(package);
	makeClickMotion(report);
	makeClickMotion(pickup);
}

function makeClickMotion(obj) {
	obj.mousedown(function() {
		$(this).css("box-shadow", "none");
	})
	.mouseup(function() {
		$(this).css("box-shadow", "5px 5px 5px #888888");
	})
	.css("cursor", "pointer");
}

function showCurrentDate(position) {
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	$(".date").html("<p>" + day + "." + month + "." + year + "</p>");
}

function markCurrentPage(position) {
	var aTag = document.getElementsByClassName("sideNav")[0];
	var size = aTag.children.length;
	for (var i = 0; i < size; i++) {
		if (i === position) {
			aTag.children[i].firstChild.style.borderColor = "#d6d6d6";
			aTag.children[i].firstChild.style.borderRadius = "3px";
			continue;
		}
		aTag.children[i].firstChild.style.borderColor = "#ca151d";
	}
	return;
	var a = document.getElementsByClassName("sideNav")[0].children[position].firstChild;
	a.style.borderColor = "#d6d6d6";
	a.style.borderRadius = "3px";
}

function fillDashboard(data) {
	var dataNav = document.getElementsByClassName("dataNav")[0].children;
	var dronePanel = document.getElementsByClassName("drone")[0].children;
	var courier = document.getElementsByClassName("courier")[0].children;
	var pickup = document.getElementsByClassName("pickup")[0].children;
	var boxes = document.getElementsByClassName("package")[0].children;
	var num = 1;
	$.each(data.dashboard, function(k, v) {
		//dataNav filling
		dataNav[0].children[0].children[0].innerHTML = v.boxes.total;
		dataNav[0].children[1].children[0].innerHTML = v.pickup.total;
		dataNav[0].children[2].children[0].innerHTML = v.drone.total;
		dataNav[0].children[3].children[0].innerHTML = v.delivery.total;

		//drone filling
		dronePanel[3].children[1].innerHTML = v.drone.waiting;
		dronePanel[4].children[1].innerHTML = v.drone.delivering;
		dronePanel[5].children[1].innerHTML = v.drone.delivered;

		//courier filling
		courier[3].children[1].innerHTML = v.delivery.available;
		courier[4].children[1].innerHTML = v.delivery.inShift;
		courier[5].children[1].innerHTML = v.delivery.delivered;
		courier[6].children[1].innerHTML = v.delivery.waiting;

		//pickup filling
		pickup[3].children[1].innerHTML = v.pickup.waiting;
		pickup[4].children[1].innerHTML = v.pickup.delivered;
		pickup[5].children[1].innerHTML = v.pickup.loaded;

		//boxes filling
//		console.log(boxes);
		boxes[3].children[1].innerHTML = v.boxes.waiting;
		boxes[4].children[1].innerHTML = v.boxes.total;
	});
}
