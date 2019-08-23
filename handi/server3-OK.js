const WebSocket = require('websocket-stream');
const fs = require ('fs');
var stream = require('stream');
const speech = require('@google-cloud/speech');

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'it-IT';

const wss = WebSocket.createServer({host: '192.168.254.161', port: 8090},handle);
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
  interimResults: false, //Get interim results from stream
};

// Creates a client
const client = new speech.SpeechClient();

const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', (data) => {
    comune = data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`;
//    process.stdout.write(comune);

  });

wss.on('connection', function connection(ws) {
  console.log("CONNESSIONE DA CLIENT");
  ws.on('message', function incoming(message) {
    if (comune.length>0) {
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
