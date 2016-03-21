/**
 * Created by Rik on 24-2-2016.
 */

'use strict';

var objects = [];
var projectiles = [];
var effects = [];

var playerid,
    syncfactor = 2.4,
    serverlooptime = 10,
    clientlooptime = 400,
    lastFrameTimeMs = 0,
    maxFPS = 60,
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


function clientUpdate() {
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
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            delta = 0;
            break;
        }
    }
    updateFromServer();
    syncMatch();
    clientUpdate();
    draw();
    requestAnimationFrame(gameLoop);
    updateSyncDisplay(syncfactor);
}

function startGame() {
    requestAnimationFrame(gameLoop);
}

startGame();