const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

io.on('connection', socket => {
    socket.on('audioSend', (message)=>{
        // console.log(message);
        io.emit('audioSend', message);
        // socket.emit('audioSend', 'message');
    })
})

io.listen(8000);
app.listen(3000);