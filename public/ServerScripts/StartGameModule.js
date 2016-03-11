/**
 * Created by Rik on 10-3-2016.
 */

var SCPS = require("../../SCPServer.js");
var plr = require("./PlayerNet.js");
var shipid = 0;

function instantiatePlayer() {
    "use strict";

    var startx = Math.random() * screenwidth;
    var starty = Math.random() * screenheight;

    objects.push(new plr.Player(shipid, startx, starty, 0.5, ".././Images/Ship1sprite.png", 0, "guns", 41, 26));
    shipid++;
    return shipid-1;
}

module.exports.instantiatePlayer = instantiatePlayer;

