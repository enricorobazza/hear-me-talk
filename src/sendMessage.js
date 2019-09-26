const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

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
    socket.on('messageSend', (message)=>{
        console.log("Received from socket:" + message);
        console.log("Sending via MQTT: " + message);
        client.publish('message', message);
        // socket.broadcast.emit('message', message);
    })
})


client.on('connected', () => {

})

app.post('/send', (req, res) => {
    client.publish('message', req.body.message);
    console.log("Sending message:" + req.body.message);
    res.send({enviado:"ok"});
})

io.listen(8001);
app.listen(3000);