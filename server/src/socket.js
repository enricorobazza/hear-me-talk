const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'enricorobazza',
    host: 'localhost',
    database: 'hearmetalk',
    port: 5432
})

senders = [];

io.on('connection', socket => {
    socket.on('register', (message)=>{
        senders.push(message);
    })

    socket.on('audioSend', (array)=>{
        // console.log(message);
        var datetime = new Date();
        var prevDateTime = new Date(array.time);

        var delay = Math.abs(datetime - prevDateTime);
        array.stime = datetime;
        // console.log(delay);

        io.emit('audioSend'+array.username, array);
        // socket.emit('audioSend', 'message');
    })

    socket.on('timeSave', (message) => {
        console.log(`${message.username} listening to ${message.listenTo} with delay: ${message.delay}`);
        pool.query(`INSERT INTO times(username, listento, delay, sdelay) VALUES('${message.username}', '${message.listenTo}',${message.delay}, ${message.sDelay})`);
    })
})

io.listen(8000);
app.listen(3001);