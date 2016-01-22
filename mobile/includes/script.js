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
