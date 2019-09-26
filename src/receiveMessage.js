const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

const app = require('express')();
const http = require('http').createServer(app);
// const io = require('socket.io')(http);

client.on('connect', () => {
    client.subscribe('message')
})

// var messageGlobal = "default";

client.on('message', (topic, message) => {
    //console.log('received message %s %s', topic, message)
    if(topic == "message"){ 
        // messageGlobal.push(message.toString());
        // socket.broadcast.emit('message', message);
        // io.sockets.emit('message', message);
        console.log("Received message: " + message.toString());
    }
})


// io.on('connection', socket => {
//     // socket.on('subscribeToTimer', (interval) => {
//     //     // console.log('client is subscribing to timer with interval ', interval);
//     //     // setInterval(() => {
//     //     //     socket.emit('timer', messageGlobal);
//     //     // }, interval);
//     // });
// })

app.get('/', (req, res) => {
    res.send('ok');
})

// io.listen(8000);
http.listen(3002);