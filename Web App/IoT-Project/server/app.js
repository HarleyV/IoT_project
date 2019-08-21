const app         = require('express')();
const express     = require('express');
const http        = require('http').createServer(app);
const io          = require('socket.io')(http);
const mqtt        = require('mqtt');

var admin = require("firebase-admin");

var serviceAccount = require("../server/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iot-coffee-maker-6b1a7.firebaseio.com"
});

var db = admin.firestore();

const client = mqtt.connect("mqtt://192.168.60.101");
//const client = mqtt.connect("mqtt://192.168.1.2");
//const client = mqtt.connect("mqtt://192.168.1.162");

http.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});

client.on('connect', () => {
    console.log("mqtt client connected");

    client.subscribe('add_device');
    client.subscribe('add_user');
    client.subscribe('setup_device');
    client.subscribe('error');
});

client.on('message', (topic, message) => {

    if(topic === "add_device"){
        console.log(message);
        let device = JSON.parse(message);
        
        console.log(device);
        db.collection("devices").doc(device.clientID).set(device);
    }

    if(topic === "add_user"){
        let data = JSON.parse(message);
        console.log(data);

        db.collection("users").doc(data.uid).update({
            devices: admin.firestore.FieldValue.arrayUnion(data.clientID)
        });
    }

    if(topic == "setup_device"){
        let clientID = message;
        console.log("Recieved Mesage: " + clientID);
        db.collection("devices").doc(clientID.toString()).get().then((doc) => {
            client.publish(clientID + "/setup", JSON.stringify(doc.data().users));
        });
    }

    if(topic === "error"){
        //console.log(message);
    }
});

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('disconnect', () => {
        console.log("user disconnected");
    })

    socket.on("add_new_device", (clientID, password, uid) => {
        let obj = {
            clientID: clientID,
            password: password,
            uid: uid
        };

        let message = JSON.stringify(obj);
        console.log("Sending message: " + message);
        client.publish(clientID + '/register', message);
    });

    socket.on("publish_mqtt", (topic, message) => {
        client.publish(topic, message);
    })
});

io.on('disconnect', () => {
    console.log("User Disconnected");
});