var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var io = require("socket.io")(http);

var SCPMain.js


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendfile('SCProject.html');
});

var objects = [];
var effects = [];
var objectcounter = 0;


io.on('connection', function (socket) {
    console.log("User connect.");

    socket.on('gamestate', function (data) {
        for (var x = 0; x < objects.length; x++) {
            if (data[x].id != objects[x].id) {
                objects.push(data[x])
            }
            else {
                objects[x] = data[x];
            }
        }
        socket.broadcast.emit('returnstate', objects);
        console.log(objects);
    });

    socket.on('requestid', function (fn) {
        fn(objectcounter);
        console.log("Id request, given:" + objectcounter);
        objectcounter++
    })
});
http.listen(3000, function () {
    console.log("Server activated.")
});

app.use(express.static('public'));