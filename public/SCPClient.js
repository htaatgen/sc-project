/**
 * Created by Rik on 24-2-2016.
 */

"use strict";


var objects = [];
var projectiles = [];
var effects = [];

var lastFrameTimeMs = 0,
    maxFPS = 60,
    netupdatecounter = 0,
    netupdatefreq = 200,
    delta = 1,
    timestep = 1000 / 60,
    radianfix = Math.PI / 180,
    accelerating = false,
    decelerating = false,
    leftrotating = false,
    rightrotating = false,
    shooting = false;

var SCPCanvas = document.getElementById("SCPCanvas");
var ctx = SCPCanvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if (e.keyCode == 87) socket.emit("keypressacc", {acc: true});
    if (e.keyCode == 83) socket.emit("keypressdec", {dec: true});
    if (e.keyCode == 68) socket.emit("keypressleft", {left: true});
    if (e.keyCode == 65) socket.emit("keypressright", {right: true});
    if (e.keyCode == 32) socket.emit("keypresssht", {sht: true});
}

function keyUpHandler(e) {
    if (e.keyCode == 87) socket.emit("keypressacc", {acc: false});
    if (e.keyCode == 83) socket.emit("keypressdec", {dec: false});
    if (e.keyCode == 68) socket.emit("keypressleft", {left: false});
    if (e.keyCode == 65) socket.emit("keypressright", {right: false});
    if (e.keyCode == 32) socket.emit("keypresssht", {sht: false});
}

function startGame() {
    requestAnimationFrame(gameLoop);
}

function clientUpdate(delta) {
    for (var x = 0; x < objects.length; x++) {
        objects[x].updateObject(delta);
    }
    for (var x = 0; x < projectiles.length; x++) {
        projectiles[x].updateObject(delta);
    }
    for (var x = 0; x < effects.length; x++) {
        effects[x].updateObject(delta);
    }
}

function draw() {
    ctx.clearRect(0, 0, SCPCanvas.width, SCPCanvas.height);
    for (var x = 0; x < objects.length; x++) {
        objects[x].drawObject();
    }
    for (var x = 0; x < projectiles.length; x++) {
        projectiles[x].drawObject();
    }
    for (var x = 0; x < effects.length; x++) {
        effects[x].drawObject();
    }
}

function gameLoop(timestamp) {
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(gameLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    var numUpdateSteps = 0;
    while (delta >= timestep) {
        update();
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            delta = 0;
            break;
        }
    }
    clientUpdate(delta);
    draw();
    requestAnimationFrame(gameLoop);
}
startGame();