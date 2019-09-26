const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


client.on('connected', () => {

})

app.post('/send', (req, res) => {
    client.publish('message', req.body.message);
    console.log("Sending message:" + req.body.message);
    res.send({enviado:"ok"});
})

app.listen(3000);