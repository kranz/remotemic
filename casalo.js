var stdin = process.stdin;

// Set input character encoding.
stdin.setEncoding('utf-8');

var record = 'r\n';
var stop = 's\n';
var quit = 'q\n'
if (process.platform === 'win32') {
  record = 'r\r\n';
  stop = 's\r\n';
  quit = 'q\r\n'
}

stdin.on('data', function(data) {
  switch(data) {
   case record:
     console.log("devo registrare");
     break;
   case stop:
     console.log("devo fermare");
     break;
   case quit:
     console.log("devo terminare il programma");
     break;
   default:
     process.exit();
     break;
  }
})

