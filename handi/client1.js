const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  var standard_input = process.stdin;
  standard_input.setEncoding('utf-8');
  console.log("Dimmi qualcosa...");
  standard_input.on('data', function (data) {

    // User input exit.
    if(data === 'exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        // Print user input in console.
        console.log('Sto inviando : ' + data);
		ws.send(data);
    }
});


});

ws.on('message', function incoming(data) {
  console.log(data);
});