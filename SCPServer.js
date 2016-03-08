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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendfile('SCProject.html');
});

var objects = [],
    projectiles = [],
    effects = [];

idcounter = 0;

var updatespeed = 2;

screenwidth = 900;
screenheight = 600;

var accelerating = false,
    decelerating = false,
    leftrotating = false,
    rightrotating = false,
    shooting = false;

function startGame() {

    objects.push(new plr.Player(50, 50, 2, 0, "ship1sprite.png", "guns", 41, 26));
    console.log(objects);
   // process.nextTick(gameLoop);
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
    setTimeout(gameLoop, updatespeed);
    //if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
    //    process.nextTick(gameLoop);
    //    return;
    //}
    //delta += timestamp - lastFrameTimeMs;
    //lastFrameTimeMs = timestamp;
    //
    //var numUpdateSteps = 0;
    //while (delta >= timestep) {
    //    update(delta);
    //    delta -= timestep;
    //    if (++numUpdateSteps >= 240) {
    //        delta = 0;
    //        break;
    //    }
    //}
    //draw();
    //requestAnimationFrame(gameLoop);
}


io.on('connection', function (socket) {
    console.log("User connect.");

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
        update(1);
        socket.emit('returnstate', objects);
    });
});
http.listen(3001, function () {
    console.log("Server activated.")
});

app.use(express.static('public'));