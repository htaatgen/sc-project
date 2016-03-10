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

    socket.emit("playerid", startgame.instantiatePlayer());

    socket.on('keypressacc', function (data) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == data.id) {
                objects[x].accelerating = data.acc;
            }
        }
    });
    socket.on('keypressleft', function (data) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == data.id) {
                objects[x].leftrotating = data.left
            }
        }
    });
    socket.on('keypressright', function (data) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == data.id) {
                objects[x].rightrotating = data.right
            }
        }
    });
    socket.on('keypresssht', function (data) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == data.id) {
                objects[x].shooting = data.sht
            }
        }
    });

    socket.on('checkstate', function () {
        "use strict";
        var sendobjects = [];
        var sendprojectiles = [];
        for (var x = 0; x < objects.length; x++) {
            sendobjects[x] = {};
            sendobjects[x].id = objects[x].id;
            sendobjects[x].x = objects[x].x;
            sendobjects[x].y = objects[x].y;
            sendobjects[x].acc = objects[x].acc;
            sendobjects[x].rot = objects[x].rot;
            sendobjects[x].imageurl = objects[x].imageurl;
            sendobjects[x].imgx = objects[x].imgx;
            sendobjects[x].imgy = objects[x].imgy;
            sendobjects[x].momx = objects[x].momx;
            sendobjects[x].momy = objects[x].momy;
            sendobjects[x].primaryattacktype = objects[x].primaryattacktype;
            sendobjects[x].health = objects[x].health;
        }
        for (var x = 0; x < projectiles.length; x++) {
            sendprojectiles[x] = {};
            sendprojectiles[x].x = projectiles[x].x;
            sendprojectiles[x].y = projectiles[x].y;
            sendprojectiles[x].acc = projectiles[x].acc;
            sendprojectiles[x].rot = projectiles[x].rot;
            sendprojectiles[x].imageurl = projectiles[x].imageurl;
        }
        socket.emit('returnstate', {sendobjects, sendprojectiles});
    });
})
;
http.listen(3001, function () {
    console.log("Server activated.")
});

app.use(express.static('public'));