/**
 * Created by Rik on 24-2-2016.
 */

"use strict";


var objects = [];
var projectiles = [];
var effects = [];

var lastFrameTimeMs = 0,
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


function keyDownHandler(e) {
    if (e.keyCode == 87) {
        accelerating = true;
    }
    if (e.keyCode == 83) {
        decelerating = true;
    }
    if (e.keyCode == 68) {
        rightrotating = true;
    }
    if (e.keyCode == 65) {
        leftrotating = true;
    }
    if (e.keyCode == 32) {
        shooting = true;
    }

}

function keyUpHandler(e) {
    if (e.keyCode == 87) {
        accelerating = false;
    }
    if (e.keyCode == 83) {
        decelerating = false;
    }
    if (e.keyCode == 68) {
        rightrotating = false;
    }
    if (e.keyCode == 65) {
        leftrotating = false;
    }
    if (e.keyCode == 32) {
        shooting = false;
    }

}

function startGame() {

    objects.push(new Player(50, 50, 2, 0, "ship1sprite.png", "guns", 41, 26));

    requestAnimationFrame(gameLoop);
}


function update(delta) {
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
        update(delta);
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            delta = 0;
            break;
        }
    }
    draw();
    requestAnimationFrame(gameLoop);
}
startGame();