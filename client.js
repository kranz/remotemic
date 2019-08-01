'use strict';

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'it-IT';


function microphoneStream(encoding, sampleRateHertz, languageCode) {
  const WebSocket = require('websocket-stream');
  const recorder = require('node-record-lpcm16');
  const fs = require('fs')
 
  const file = fs.createWriteStream('test.wav', { encoding: 'binary' })

  const ws = new WebSocket('ws://192.168.254.161:8080');
  recorder.record({
      sampleRateHertz: sampleRateHertz,
      threshold: 0, //silence threshold
      recordProgram: 'rec', // Try also "arecord" or "sox"
      silence: '1.0', //seconds of silence before ending
  })
  .stream()
  .on('error', console.error)
  .pipe(ws);
  
  console.log('Listening, press Ctrl+C to stop.');
  
  
//  ws.on('open', function open(data,request) {
//    ws.send(data);
//  });
  
  
  ws.socket.on('message', function incoming(data) {
    console.log(data);
  });
}

microphoneStream(encoding, sampleRateHertz, languageCode) 