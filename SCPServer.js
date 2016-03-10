var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var io = require("socket.io")(http);

var main = require("./SCPMainNet.js");
var obj = require("./ObjectNet.js");
var mobj = require("./MovObjNet.js");
var plr = require("./PlayerNet.js");
var plrd = require("./PlayerDummyNet.js");
var prj = require("./ProjNet.js");
var flr = require("./FlareNet.js");
var sync = require("./SyncModule.js");
var startgame = require("./StartGameModule.js")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendfile('SCProject.html');
});

serverlooptime = 10;

objects = [];
projectiles = [];
effects = [];

idcounter = 0;
radianfix = Math.PI / 180;

screenwidth = 900;
screenheight = 500;

accelerating = false;
decelerating = false;
leftrotating = false;
rightrotating = false;
shooting = false;

function startGame() {
    process.nextTick(gameLoop);
}

startGame();

function update() {
    for (var x = 0; x < objects.length; x++) {
        objects[x].updateObject();
    }
    for (var x = 0; x < projectiles.length; x++) {
        projectiles[x].updateObject();
    }
    for (var x = 0; x < effects.length; x++) {
        effects[x].updateObject();
    }
}

function gameLoop() {
    update();

    setTimeout(gameLoop, 10);

    sync.SyncCall();

    io.sockets.emit("SyncCall", serverlooptime);
}

io.on('connection', function (socket) {
    console.log("User connect.");

    startgame.instantiatePlayer();

    socket.on('keypressacc', function (data) {
        accelerating = data.acc;
    });
    socket.on('keypressdec', function (data) {
        decelerating = data.dec;
    });
    socket.on('keypressleft', function (data) {
        leftrotating = data.left;
    });
    socket.on('keypressright', function (data) {
        rightrotating = data.right;
    });
    socket.on('keypresssht', function (data) {
        shooting = data.sht;
    });

    socket.on('checkstate', function () {
        "use strict";
        socket.emit('returnstate', {objects, projectiles});
    });
});
http.listen(3001, function () {
    console.log("Server activated.")
});

app.use(express.static('public'));