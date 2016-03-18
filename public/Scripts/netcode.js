/**
 * Created by Rik on 6-3-2016.
 */
var socket = io();
var netcheckspeed = 5;
var netcheckcounter = 0;
var then = new Date().getTime()

function syncMatch() {
    "use strict";
    var now = new Date().getTime();
    clientlooptime = now - then;
    then = now;
    syncfactor = clientlooptime / serverlooptime;
    //console.log("Client: " + clientlooptime + ", Server: " + serverlooptime)
}

function updateFromServer() {
    if (netcheckcounter >= netcheckspeed) {
        netcheckcounter = 0;
        socket.emit("checkstate", {})
    }
    else netcheckcounter++;
}

function keyDownHandler(e) {
    if (e.keyCode === 87) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == playerid) {
                socket.emit("keypressacc", {acc: true, id: playerid});
                objects[x].accelerating = true;
            }
        }
    }
    if (e.keyCode === 68) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == playerid) {
                socket.emit("keypressleft", {left: true, id: playerid});
                objects[x].leftrotating = true;
            }
        }
    }
    if (e.keyCode === 65) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == playerid) {
                socket.emit("keypressright", {right: true, id: playerid});
                objects[x].rightrotating = true;
            }
        }
    }
    if (e.keyCode === 32) {
        socket.emit("keypresssht", {sht: true, id: playerid});

        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == playerid) {
                objects[x].shooting = true;
            }
        }
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 87) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == playerid) {
                socket.emit("keypressacc", {acc: false, id: playerid});
                objects[x].accelerating = false;
            }
        }
    }
    if (e.keyCode === 68) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == playerid) {
                objects[x].leftrotating = false;
                socket.emit("keypressleft", {left: false, id: playerid});
            }
        }
    }
    if (e.keyCode === 65) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == playerid) {
                objects[x].rightrotating = false;
                socket.emit("keypressright", {right: false, id: playerid});
            }
        }
    }
    if (e.keyCode === 32) {
        for (var x = 0; x < objects.length; x++) {
            if (objects[x].id == playerid) {
                objects[x].shooting = false;
                socket.emit("keypresssht", {sht: false, id: playerid});
            }
        }
    }
}
socket.on("SyncCall", function (data) {
    "use strict";
    serverlooptime = data;
})

socket.on('playerid', function (data) {
    "use strict";
    playerid = data;
    console.log(playerid)
})

socket.on('returnstate', function (data) {
    "use strict";
    objects = [];
    projectiles = [];
    for (var x = 0; x < data.sendobjects.length; x++) {
        objects.push(new Player(
            data.sendobjects[x].id,
            data.sendobjects[x].x,
            data.sendobjects[x].y,
            data.sendobjects[x].acc,
            data.sendobjects[x].rot,
            data.sendobjects[x].imageurl,
            data.sendobjects[x].imgx,
            data.sendobjects[x].imgy,
            data.sendobjects[x].momx,
            data.sendobjects[x].momy,
            data.sendobjects[x].primaryattacktype,
            data.sendobjects[x].health,
            data.sendobjects[x].firetimer,
            data.sendobjects[x].flaretimer
            )
        )
    }
    for (var x = 0; x < data.sendprojectiles.length; x++) {
        projectiles.push(new Proj(
            data.sendprojectiles[x].x,
            data.sendprojectiles[x].y,
            data.sendprojectiles[x].acc,
            data.sendprojectiles[x].rot,
            data.sendprojectiles[x].imageurl
            )
        )
    }
    //else {
    //    projectiles[x].x = data.objects[x].x,
    //        objects[x].y = data.objects[x].y,
    //        objects[x].acc = data.objects[x].acc,
    //        objects[x].rot = data.objects[x].rot,
    //        objects[x].health = data.objects[x].health,
    //        objects[x].momx = data.objects[x].momx,
    //        objects[x].momy = data.objects[x].momy;
    //}

});

