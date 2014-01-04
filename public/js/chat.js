window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://zyles.com');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
	var currentdate = new Date(); 
	
 
    socket.on('message', function (data) {
        if(data.message) {			
		
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].when;
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
			
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = sendMessage = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
			var datetime = "("
				+ (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate() + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + ") ";
		
            var text = field.value;
            socket.emit('send', { message: text, username: name.value, when: datetime});
			field.value = "";
        }
    };
	
	$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});

	$("input").focus(function() {
  this.value = "";
});
 
}