/**
 * Created by Rik on 10-3-2016.
 */

function instantiatePlayer() {
    "use strict";

    var startx = Math.random() * screenwidth;
    var starty = Math.random() * screenheight;

    var plr = require("./PlayerNet.js");
    objects.push(new plr.Player(startx, starty, 5, 0, "Ship1sprite.png", "guns", 41, 26))


};