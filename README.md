# remotemic
remote mic version of Google Speech API sample.
Audio is streamed via WebSockets to a server where it is passed to Google Speech API, trscribed and the result is sent back to the client via the same websocket.
# files

there are only two files: *client.js* and *server.js*
# prerequisites
this is a node.js application

 - node.js version >= 10.16.3 
 - git (not mandatory but **very recommended**)
 - NPM packages:
	 - node-record-lpcm16
	 - websocket-stream
	 - stream
	 - @google-cloud/speech
	 