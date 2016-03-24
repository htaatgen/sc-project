/**
 * Created by Rik on 10-3-2016.
 */

var SCPS = require("../../SCPServer.js");
var plr = require("./PlayerNet.js");
var shipid = 0;

function instantiatePlayer(shiptype, name, guntype) {
    "use strict";

    var startx = Math.random() * screenwidth;
    var starty = Math.random() * screenheight;

    switch (shiptype) {
        case "Grey Delta":
            objects.push(new plr.Player(shipid, startx, starty, 0.5, ".././Images/Ship1sprite.png", 0, guntype, 41, 26, name, 0));
            break;
        case "Green Invert":
            objects.push(new plr.Player(shipid, startx, starty, 0.5, ".././Images/Ship2sprite.png", 0, guntype, 41, 26, name, 1));
            break;
        case "Red Disc":
            objects.push(new plr.Player(shipid, startx, starty, 0.5, ".././Images/Ship3sprite.png", 0, guntype, 35, 32, name, 2));
            break;
    }
    shipid++;
    return shipid - 1;
}


module.exports.instantiatePlayer = instantiatePlayer;
