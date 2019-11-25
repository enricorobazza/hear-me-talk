const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

client.on('connect', () => {
    client.subscribe('message')
})

var messageGlobal = "";
var lastEmitted = "";

client.on('message', (topic, message) => {
    //console.log('received message %s %s', topic, message)
    if(topic == "message"){ 
        // messageGlobal.push(message.toString());
        // socket.broadcast.emit('message', message);
        // io.sockets.emit('message', message);
        messageGlobal = message.toString();
        console.log("Received from MQTT: " + message.toString());
    }
})


io.on('connection', socket => {
    socket.on('subscribeToMessage', (val)=>{
        setInterval(()=>{
            if(lastEmitted != messageGlobal){
                console.log("Sending via Socket: " + messageGlobal);
                socket.emit('messages', messageGlobal);
                lastEmitted = messageGlobal;
            }
        }, 1000);
    })

    // socket.on('message', (message)=>{
    //     console.log(message);
    //     socket.broadcast.emit('message', message);
    // })
})

app.get('/', (req, res) => {
    res.send('ok');
})

io.listen(8000);
http.listen(3002);