const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const ss = require('socket.io-stream');

io.on('connection', client => {
  const stream = ss.createStream();
  client.on('track', () => {
    const filePath = path.resolve(__dirname, './private', './track.wav');
    // get file info
    const stat = fileSystem.statSync(filePath);
    const readStream = fileSystem.createReadStream(filePath);
    // pipe stream with response stream
    readStream.pipe(stream);
    ss(client).emit('track-stream', stream, { stat });
  });
});

io.listen(8000);
app.listen(3000);