const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
var response = "piggialo in to pané";

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
  	message = message.replace(/\n$/, '');
    console.log('received:', message);
    console.log('ricevuti %s bytes', message.length);
  	switch(message) {
  		case 'something':
  			console.log("message1=",message);
  			response = "for nothing";
  			break;
  		case 'pippo':
  			console.log("message2=",message);
  			response = "si fa le pippe";
  			break;
  		default:
  			console.log("message3=",message);
  			response = "ragnarok rulez!"
  			break;
  	}
    console.log('sent back: %s', response);
	ws.send(response);
  });

});
