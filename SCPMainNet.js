/**
 * Created by Rik on 24-2-2016.
 */

"use strict";

var netupdatecounter = 0,
    netupdatefreq = 200,
    delta = 1,
    radianfix = Math.PI / 180


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

//function gameLoop(timestamp) {
//    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
//      //  requestAnimationFrame(gameLoop);
//        return;
//    }
//    delta += timestamp - lastFrameTimeMs;
//    lastFrameTimeMs = timestamp;
//
//    var numUpdateSteps = 0;
//    while (delta >= timestep) {
//        update(delta);
//        delta -= timestep;
//        if (++numUpdateSteps >= 240) {
//            delta = 0;
//            break;
//        }
//    }


    //draw();


    //requestAnimationFrame(gameLoop);
    //if (netupdatecounter >= netupdatefreq) {
    //    updateGameState();
    //    netupdatecounter = 0;
    //}
    //else netupdatecounter++;
//}
