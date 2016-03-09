/**
 * Created by Rik on 6-3-2016.
 */
var socket = io();
var netcheckspeed = 30;
var netcheckcounter = 0;

socket.on('initialstate', function (data) {
});

function update() {
    if (netcheckcounter >= netcheckspeed) {
        netcheckcounter = 0;
        socket.emit("checkstate", {})
    }
    else netcheckcounter++;
}

socket.on('returnstate', function (data) {
    "use strict";
    objects = [];
    projectiles = [];
    effects = [];
    for (var x = 0; x < data.objects.length; x++) {
        objects.push(new Player(
            data.objects[x].id,
            data.objects[x].x,
            data.objects[x].y,
            data.objects[x].acc,
            data.objects[x].rot,
            data.objects[x].imageurl,
            data.objects[x].imgx,
            data.objects[x].imgy
            )
        )
    }
    for (var x = 0; x < data.projectiles.length; x++) {
        projectiles.push(new Proj(
            data.projectiles[x].id,
            data.projectiles[x].x,
            data.projectiles[x].y,
            data.projectiles[x].acc,
            data.projectiles[x].rot,
            data.projectiles[x].imageurl
            )
        )
    }
    for (var x = 0; x < data.effects.length; x++) {
        effects.push(new Flare(
            data.effects[x].id,
            data.effects[x].x,
            data.effects[x].y,
            data.effects[x].acc,
            data.effects[x].rot,
            data.effects[x].imageurl,
            data.effects[x].imgx,
            data.effects[x].imgy,
            data.effects[x].imgtotal
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

