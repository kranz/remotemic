const recorder = require('node-record-lpcm16')
const fs = require('fs')
 
const file = fs.createWriteStream('test.wav', { encoding: 'binary' })
 
recorder.record
    .start({
      sampleRateHertz: 16000,
      threshold: 0, //silence threshold
      recordProgram: 'rec', // Try also "arecord" or "sox"
      silence: '1.0', //seconds of silence before ending
    })
    .on('error', console.error)
    .pipe(file);