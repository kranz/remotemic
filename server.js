const WebSocket = require('websocket-stream');
const fs = require ('fs');
var stream = require('stream');

const wss = WebSocket.createServer({host: '192.168.254.161', port: 8090},handle);

function handle(stream)  {
	var target = fs.createWriteStream('testalo.wav', { encoding: 'binary' });
	stream.pipe(target);	
  stream.on('close', function (){
    target.end();
  }).on('error', function() {
    target.end();
  })
}


var response = "vanni a pigiâlo into cû ";

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
	 	console.log('ricevuti %s bytes', message.length);
    console.log('sent back: %s', message.length);
  	ws.send(`${response} ${message.length} vòtte`);
	  
  }).on('close', function () {
    console.log("FINITO")
  	
  }).on('error',function (err) {
    console.log("error:",err)
  });
});
