'use strict';

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'it-IT';
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');
var record = 'r\n';
var stop = 's\n';
var quit = 'q\n'
if (process.platform === 'win32') {
  record = 'r\r\n';
  stop = 's\r\n';
  quit = 'q\r\n'
}

function microphoneStream(encoding, sampleRateHertz, languageCode) {
  const WebSocket = require('websocket-stream');
  const recorder = require('node-record-lpcm16');
  const fs = require('fs')
 
  const file = fs.createWriteStream('test.wav', { encoding: 'binary' })
  console.log('Inserire r+INVIO per registrare, s + INVIO to stoppare, q + INVIO per terminare.');

/*  var recording = recorder.record({
          sampleRateHertz: sampleRateHertz,
          threshold: 0, //silence threshold
          recordProgram: 'sox', // Try also "arecord" or "sox"
          silence: '1.0', //seconds of silence before ending
        })

  var ws = new WebSocket('ws://192.168.254.161:8090');
*/
  var recording;
  var ws;
  recording = recorder.record({
     sampleRateHertz: sampleRateHertz,
     threshold: 0, //silence threshold
     recordProgram: 'sox', // Try also "arecord" or "sox"
     silence: '1.0', //seconds of silence before ending
  })
  ws = new WebSocket('ws://192.168.254.161:8090');

  standard_input.on('data', function(data) {
    switch(data) 
    {
      case record:
        console.log('Listening, s + Enter to stop.');
        recording
          .stream()
          .on('error', console.error)
         .pipe(ws);
      break;
      case stop:
        console.log('Stop recording');
        ws.socket.send("ENDCHUNK")
      break;
      case quit:
        recording.stop();
        console.log('Stop recording and transmitting. BYE');
        process.exit();
      break;
      default:
        console.log('HAI SCRITTO <'+ data + '>??? ...zzo vuoi?');
      break;
    }
    ws.socket.on('message', function incoming(data) {
      console.log(data);
    });
  })

}

microphoneStream(encoding, sampleRateHertz, languageCode) 