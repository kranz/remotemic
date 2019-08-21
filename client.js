'use strict';

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'it-IT';
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');


function microphoneStream(encoding, sampleRateHertz, languageCode) {
  const WebSocket = require('websocket-stream');
  const recorder = require('node-record-lpcm16');
  const fs = require('fs')
 
  const file = fs.createWriteStream('test.wav', { encoding: 'binary' })
  const ws = new WebSocket('ws://192.168.254.161:8080');

  standard_input.on('data', function(data) {
    switch(data) 
    {
      case 'r\n':
        console.log('Listening, s + Enter to stop.');
        recorder.record({
          sampleRateHertz: sampleRateHertz,
          threshold: 0, //silence threshold
          recordProgram: 'rec', // Try also "arecord" or "sox"
          silence: '1.0', //seconds of silence before ending
        })
        .stream()
        .on('error', console.error)
        .pipe(ws);
      break;
      case 's\n':
        console.log('Stop recording');
        recorder.stop();
      break;
      case 'q\n':
        recorder.stop();
        ws.close();
        console.log('Stop recording and transmitting. BYE');
        process.exit();
      break;
      default:
        console.log('...zzo vuoi?');
      break;
    }
  })

  ws.socket.on('message', function incoming(data) {
    console.log(data);
  });
}

microphoneStream(encoding, sampleRateHertz, languageCode) 