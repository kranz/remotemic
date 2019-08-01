const WebSocket = require('websocket-stream');
const fs = require ('fs');
var stream = require('stream');

const wss = WebSocket.createServer({host: '192.168.254.161', port: 8080},handle);

function handle(stream)  {
	var target = fs.createWriteStream('testalo.wav', { encoding: 'binary' });
	stream.pipe(target);	
}


var response = "piggialo in to pané";

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
	console.log(message);
  	console.log('ricevuti %s bytes', message.length);
    console.log('sent back: %s', message.length);
	ws.send(`${response} ${message.length} volte`);
	  
  }).on('close', function () {
  	file.end();
  });
});
