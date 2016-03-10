/**
 * Created by Rik on 6-3-2016.
 */
var socket = io();
var netcheckspeed = 15;
var netcheckcounter = 0;
var then = new Date().getTime()

function syncMatch() {
    "use strict";
    var now = new Date().getTime();
    clientlooptime = now - then;
    then = now;
    syncfactor = clientlooptime / serverlooptime;
}

function updateFromServer() {
    if (netcheckcounter >= netcheckspeed) {
        netcheckcounter = 0;
        socket.emit("checkstate", {})
    }
    else netcheckcounter++;
}

socket.on("SyncCall", function (data) {
    "use strict";
    serverlooptime = data;
})

socket.on('returnstate', function (data) {
    "use strict";
    objects = [];
    projectiles = [];
    for (var x = 0; x < data.objects.length; x++) {
        objects.push(new Player(
            data.objects[x].x,
            data.objects[x].y,
            data.objects[x].acc,
            data.objects[x].rot,
            data.objects[x].imageurl,
            data.objects[x].imgx,
            data.objects[x].imgy,
            data.objects[x].momx,
            data.objects[x].momy,
            data.objects[x].primaryattacktype
            )
        )
    }
    for (var x = 0; x < data.projectiles.length; x++) {
        projectiles.push(new Proj(
            data.projectiles[x].x,
            data.projectiles[x].y,
            data.projectiles[x].acc,
            data.projectiles[x].rot,
            data.projectiles[x].imageurl
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

