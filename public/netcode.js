/**
 * Created by Rik on 6-3-2016.
 */
var socket = io();
var idcounter = 0;

socket.on('initialstate', function (data) {
});

socket.on('returnstate', function (data) {
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

socket.on('requestid', function () {
    socket.emit("sendid", {id: idcounter})
    idcounter++;
});

function requestId() {
    "use strict";
    socket.emit("requestid", function (data) {
        console.log(data)
        return data;
    })
}

function updateGameState() {
    var sendObjects = [];
    for (var x = 0; x < objects.length; x++) {
        sendObjects[x] = objects[x].playerNetData()
    }
    socket.emit("gamestate", sendObjects);
}
