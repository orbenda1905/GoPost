var Client = (function (pName, pId) {//class represents client
	var name = pName;
	var id = pId;

	this.getName = function () {
		return name;
	};

	this.getId = function () {
		return id;
	};
})

var Shani = new Client("שני", 123456789);

/*-----floating menu script-----*/
$(function($){
        $('#menu').click(function(){
        $('.responsiveMenu').toggleClass('expand');
    });
});


function info() {
	var info = document.getElementsByClassName('infoSts');
	var size = info.length;
		for (var i = 0; i < size; i++) {
			info[i].addEventListener("click", function() {
				window.scrollTo(0,0);
				document.getElementById('light').style.display='block';
				document.getElementById('fade').style.display='block';
			});
		}
		document.getElementById('fade').addEventListener("click", function() {
		document.getElementById('light').style.display='none';
		document.getElementById('fade').style.display='none';
		});
	}

	window.document.onkeydown = function (e){
		if (!e){
			e = event;
		}
		if (e.keyCode == 27){
			lightbox_close();
		}
}

function message() {
	var send = document.getElementsByClassName('sendButton')[0];
    send.addEventListener("click", function() {
        window.scrollTo(0,0);
        document.getElementById('light').style.display='block';
        document.getElementById('fade').style.display='block';
    });
    document.getElementById('fade').addEventListener("click", function() {
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
    });
}

function addBox(data) {
	var box = $("<section class='deliveryBox'></section>");
	var numberOfBoxes = $(".deliveryBox").length;
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
//			displayInfo(data.id);
			alert(data.id);
		});
		statusClass.append(infoBtn);
	}
	box.append(statusClass);
	box.append("<div class='clear'></div>");
	$("main").append(box);
}

function deliveryList() {
	$("#deliveryAdding").submit(function(e) {
		e.preventDefault();
		var boxId = $(".packageId").val();
		$.get("addBox.php", {pId: Shani.getId(), boxId: boxId}, function(data) {
			var json = $.parseJSON(data);
			console.log(json);
			if (json.exist === "no") {
//				notExist(boxId);
				alert("box number " + boxId + " not exist");
				return;
			}
			addBox(json);
		});
	});
}
