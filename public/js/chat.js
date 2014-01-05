window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://zyles.com');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");		
 
    socket.on('message', function (data) {
        if(data.message) {		
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username  + messages[i].entrydate : 'Zyles') + ': </b>' ;
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
			
        } else {
            console.log("There is a problem:", data);
        }
    });
 
	//sendmessage event
    sendButton.onclick = sendMessage = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
		
		//add current date time
			var currentdate = new Date(); 
			var datetime = "("
				+ (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate() + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + ") ";
		
            var text = field.value;
            socket.emit('send', { message: text, username: name.value, entrydate: datetime });
			field.value = "";
        }
    };
	
	//send message when enter key is pressed at the message
	$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});

	//clean up message field
	$("#field").focus(function() {
  this.value = "";
});
 
	//toggle chat div
	$("#trigger").click(function(){	
	$("#chatwindow").toggle();
	});
}