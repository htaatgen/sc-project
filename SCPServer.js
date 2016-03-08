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
    effects = [],
    idcounter = 0;

var screenwidth = 900,
    screenheight= 600;

var accelerating = false,
    decelerating = false,
    leftrotating = false,
    rightrotating = false,
    shooting = false;

function startGame() {

    objects.push(new plr.Player(50, 50, 2, 0, "ship1sprite.png", "guns", 41, 26));

    // requestAnimationFrame(gameLoop);
}

startGame();

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
        socket.emit('returnstate', objects)
    });
});
http.listen(3000, function () {
    console.log("Server activated.")
});

app.use(express.static('public'));