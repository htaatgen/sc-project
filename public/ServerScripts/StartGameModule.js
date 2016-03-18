/**
 * Created by Rik on 10-3-2016.
 */

var SCPS = require("../../SCPServer.js");
var plr = require("./PlayerNet.js");
var shipid = 0;
var shiptypeselector = 0;

function instantiatePlayer() {
    "use strict";

    var startx = Math.random() * screenwidth;
    var starty = Math.random() * screenheight;

    switch (shiptypeselector) {
        case 0:
            objects.push(new plr.Player(shipid, startx, starty, 0.5, ".././Images/Ship1sprite.png", 0, "guns", 41, 26));
            shiptypeselector++;
            break;
        case 1:
            objects.push(new plr.Player(shipid, startx, starty, 0.5, ".././Images/Ship2sprite.png", 0, "bolt", 41, 26));
            shiptypeselector++;
            break;
        case 2:
            objects.push(new plr.Player(shipid, startx, starty, 0.5, ".././Images/Ship3sprite.png", 0, "bolt", 35, 32));
            shiptypeselector = 0;
            break;
    }
    shipid++;
    return shipid - 1;
}

module.exports.instantiatePlayer = instantiatePlayer;

