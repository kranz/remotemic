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
	var target = fs.createWriteStream('testalo.wav', { encoding: 'binary' });
	stream.pipe(recognizeStream);
  stream.on('close', function (){
    target.end();
  }).on('error', function() {
    target.end();
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
    process.stdout.write(comune);

  });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    ws.send("bip bip!")
    if (message=="ENDCHUNK") {
      console.log(message);
      setTimeout(() => {
        ws.send(comune);
      }, 1000)
    }
  }).on('close', function () {
    console.log("FINITO")
  }).on('error',function (err) {
    console.log("errorazzo:")
  });
});
