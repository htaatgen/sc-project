var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var http = require('http').Server(app);
var io = require("socket.io")(http);
var path = require('path');

var main = require("./public/ServerScripts/SCPMainNet.js");
var obj = require("./public/ServerScripts/ObjectNet.js");
var mobj = require("./public/ServerScripts/MovObjNet.js");
var plr = require("./public/ServerScripts/PlayerNet.js");
var prj = require("./public/ServerScripts/ProjNet.js");
var flr = require("./public/ServerScripts/FlareNet.js");
var sync = require("./public/ServerScripts/SyncModule.js");
var startgame = require("./public/ServerScripts/StartGameModule.js")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, 'public'));

app.use(express.static('public'));

serverlooptime = 10;

objects = [];
projectiles = [];
effects = [];
users = [];

users.push({
    name: "Rik",
    password: "P",
    gamesplayed: 20,
    victories: 12,
    signup: "10-10-2015",
    shiptype: "Red Disc",
    guntype: "Plasma Bolts"
});

idcounter = 0;
radianfix = Math.PI / 180;

screenwidth = 900;
screenheight = 500;

activeusers = [];
var gameactive = false;


function startGame() {
    setImmediate(gameLoop);
}

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
    //for (var x = 0; x < activeusers.length; x++) {
    //    if (activeusers[x].timeout == 0) {
    //        activeusers.splice(x, 1);
    //    }
    //    else {
    //        activeusers[x].timeout--;
    //    }
    //}
}

function gameLoop() {

    update();

    setTimeout(gameLoop, 10);

    sync.SyncCall();

    io.sockets.emit("SyncCall", serverlooptime);

}


io.on('connection', function (socket) {

    function getCookie(cname) {
        var name = cname + "=";
        var ca = socket.handshake.headers.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    for (var x = 0; x < users.length; x++) {
        if (users[x].name == getCookie("SCPName")) {
            socket.emit("playerid", startgame.instantiatePlayer(users[x].shiptype,getCookie("SCPName"), users[x].guntype));
            for (var x = 0; x < activeusers.length; x++) {
                if (activeusers[x].name == getCookie("SCPName")) {
                }
                else {
                    activeusers.push({name: getCookie("SCPName"), timeout: 20, kills: 0, deaths: 0})
                }
            }
            if (activeusers.length == 0) {
                activeusers.push({name: getCookie("SCPName"), timeout: 20, kills: 0, deaths: 0})
            }
        }
    }

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

    socket.on('checkstate', function (data) {
        "use strict";
        var checkalive = false;
        var sendobjects = [];
        var sendprojectiles = [];
        var sendeffects = [];

        for (var x = 0; x < activeusers.length; x++) {
            if (getCookie("SCPName") == activeusers[x].name) {
                activeusers[x].timeout = 20;
            }
        }
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == data) {
                checkalive = true;
            }
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
            sendobjects[x].firetimer = objects[x].firetimer;
            sendobjects[x].flaretimer = objects[x].flaretimer;
            sendobjects[x].flaretype = objects[x].flaretype;
        }

        if (checkalive == false) {
            for (var x = 0; x < users.length; x++) {
                if (users[x].name == getCookie("SCPName")) {
                    socket.emit("playerid", startgame.instantiatePlayer(users[x].shiptype, getCookie("SCPName"), users[x].guntype));
                }
            }
            for (var x = 0; x < activeusers.length; x++) {
                if (activeusers[x].name == getCookie("SCPName")) {
                    activeusers[x].deaths++;
                }
            }
        }

        for (var x = 0; x < projectiles.length; x++) {
            sendprojectiles[x] = {};
            sendprojectiles[x].x = projectiles[x].x;
            sendprojectiles[x].y = projectiles[x].y;
            sendprojectiles[x].acc = projectiles[x].acc;
            sendprojectiles[x].rot = projectiles[x].rot;
            sendprojectiles[x].imageurl = projectiles[x].imageurl;
        }

        for (var x = 0; x < effects.length; x++) {
            sendeffects[x] = {};
            sendeffects[x].x = effects[x].x;
            sendeffects[x].y = effects[x].y;
            sendeffects[x].acc = effects[x].acc;
            sendeffects[x].rot = effects[x].rot;
            sendeffects[x].imageurl = effects[x].imageurl;
            sendeffects[x].imgx = effects[x].imgx;
            sendeffects[x].imgy = effects[x].imgy;
            sendeffects[x].imgtotal = effects[x].imgtotal;
        }

        socket.emit('returnstate', {sendobjects, sendprojectiles, sendeffects, activeusers});
    });
})

app.get('/', function (req, res) {
    res.sendFile('LoginScreen.html', {root: __dirname + "/public/"});
});

app.get('/UserScreen', function (req, res) {
    res.sendFile('userscreen.html', {root: __dirname + "/public/"});
});

app.get('/GameScreen', function (req, res) {
    res.sendFile('SCProject.html', {root: __dirname + "/public/"});
});

app.post("/Login", function (req, res) {
    for (var x = 0; x < users.length; x++) {
        if (users[x].name == req.body.name && users[x].password == req.body.password) {
            res.cookie('SCPName', req.body.name).send('Cookie is set for ' + req.body.name);
            res.sendFile('UserScreen.html', {root: __dirname + "/public/"});
        }
        else {
            res.status(304).send("Name not found!")
        }
    }
});

app.post("/Register", function (req, res) {
    var available = true;
    for (var x = 0; x < users.length; x++) {
        if (users[x].name == req.body.name) {
            available = false;
            res.status(304).send("Name not available!")
        }
    }
    if (available == true) {
        users.push({
            name: req.body.name,
            password: req.body.password,
            gamesplayed: 0,
            victories: 0,
            signup: new Date(),
            shiptype: "Grey Delta",
            guntype: "Autocannons"
        })
        res.cookie('SCPName', req.body.name).send('Cookie is set for ' + req.body.name);
        res.sendFile('UserScreen.html', {root: __dirname + "/public/"});
    }
});

app.get("/LoadUserData", function (req, res) {
    "use strict";
    for (var x = 0; x < users.length; x++) {
        if (users[x].name == req.cookies.SCPName) {
            res.send(users[x])
        }
    }
})

app.post("/UpdateUserData", function (req, res) {
    "use strict";
    for (var x = 0; x < users.length; x++) {
        if (users[x].name == req.cookies.SCPName) {
            users[x].shiptype = req.body.shiptype;
            users[x].guntype = req.body.guntype;
            res.status(200).send("Values succesfully updated.")
        }
    }
})

app.get("/StartAsHost", function (req, res) {
    "use strict";
    if (gameactive == false) {
        console.log("Starting new game for " + req.cookies.SCPName + ".");
        startGame();
        gameactive = true;
    }
    else {
        res.status(304).send("Game already underway!")
    }
})

http.listen(process.env.PORT || 5000, function () {
    console.log("Star Arena server activated.")
});
