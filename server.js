const WebSocket = require('websocket-stream');
const fs = require ('fs');
var stream = require('stream');
const speech = require('@google-cloud/speech');

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'it-IT';

const wss = WebSocket.createServer({host: 'remotemic', port: 8090},handle);

function timestamp() {
  var y = new Date();
  return y.toString().substr(16,9)+y.getMilliseconds()
}

var comune = "";

function handle(stream)  {
	stream.pipe(recognizeStream);
  stream.on('close', function (){

  }).on('error', function() {

  })
}

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
  enable_word_time_offsets: true
};

const request = {
  config,
  interimResults: true, //Get interim results from stream
};

// Creates a client
const client = new speech.SpeechClient();

const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', (data) => {
    comune = data.results[0] && data.results[0].alternatives[0]
        ? `${timestamp()}-<LETTO>: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`;
    // process.stdout.write(comune);

  });

wss.on('connection', function connection(ws) {
  let msg = "CONNESSIONE DA CLIENT"
  console.log(msg);
  ws.send(msg);
  ws.on('message', function incoming(message) {
    if (comune.length>0) {
      comune = comune.replace("<LETTO>",timestamp())
      console.log(comune);
      ws.send(comune);
      comune="";
    }
  }).on('close', function () {
    console.log("FINITO")
  }).on('error',function (err) {
    console.log("errorazzo:")
  });
});
