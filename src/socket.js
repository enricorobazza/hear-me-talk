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

io.on('connection', socket => {
    socket.on('audioSend', (message)=>{
        // console.log(message);
        var array = JSON.parse(message);
        var datetime = new Date();
        var prevDateTime = new Date(array.time);

        var delay = Math.abs(datetime - prevDateTime);
        array.stime = datetime;
        // console.log(delay);

        io.emit('audioSend', JSON.stringify(array));
        // socket.emit('audioSend', 'message');
    })

    socket.on('timeSave', (message) => {
        console.log(message.id + ", time: "+message.time);
        pool.query(`INSERT INTO times(username, delay) VALUES('${message.id}', ${message.time})`);
    })
})

io.listen(8000);
app.listen(3000);