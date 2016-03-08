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

var objects = [];
var projectiles = [];
var effects = [];
var objectcounter = 0;

var accelerating = false,
    decelerating = false,
    leftrotating = false,
    rightrotating = false,
    shooting = false;

function startGame() {

    //objects.push(new Player(50, 50, 2, 0, "ship1sprite.png", "guns", 41, 26));

    // requestAnimationFrame(gameLoop);
}

startGame();

io.on('connection', function (socket) {
    console.log("User connect.");

    socket.on('keypress', function (data) {
        "use strict";
        accelerating = this.acc;
        decelerating = this.dec;
        leftrotating = this.lrt;
        rightrotating = this.rrt;
    })

    socket.on('checkstate', function (data) {
        "use strict";
        console.log(data);
        for (var x = 0; x < objects.length; x++) {
            if (data[x].id != objects[x].id) {
                objects.push(new PlayerDummy(
                    data[x].id,
                    data[x].x,
                    data[x].y,
                    data[x].acc,
                    data[x].rot,
                    data[x].health,
                    data[x].momx,
                    data[x].momy,
                    data[x].imageurl,
                    data[x].spriteselect,
                    data[x].imgx,
                    data[x].imgy
                ))
            }
            else {
                objects[x].x = data[x].x,
                    objects[x].y = data[x].y,
                    objects[x].acc = data[x].acc,
                    objects[x].rot = data[x].rot,
                    objects[x].health = data[x].health,
                    objects[x].momx = data[x].momx,
                    objects[x].momy = data[x].momy
            }
        }
        console.log(objects);
    });
});
http.listen(3000, function () {
    console.log("Server activated.")
});

app.use(express.static('public'));