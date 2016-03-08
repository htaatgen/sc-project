/**
 * Created by Rik on 3-3-2016.
 */
"use strict"
var obj = require("./ObjectNet.js");
var SCPS = require("./SCPServer.js");

var screenwidth = SCPS.screenwidth,
    screenheight = SCPS.screenheight;
var radianfix = Math.PI / 180;

class MovObj extends obj.Object {

    constructor(x, y, acc, rot, imageurl) {
        super(x, y, imageurl);
        this.acc = acc;
        this.rot = rot;
        this.updateObject();
        this.updateLogicMovObj();
    }

    updateLogicMovObj() {
        this.x += Math.cos(radianfix * this.rot) * this.acc;
        this.y += Math.sin(radianfix * this.rot) * this.acc;
        if (this.x >= screenwidth) this.x -= screenwidth;
        if (this.x <= 0) this.x += screenwidth;
        if (this.y >= screenheight) this.y -= screenheight;
        if (this.y <= 0) this.y += screenheight;
        if (this.rot >= 360) this.rot -= 360;

    }

    updateObject() {
        this.updateLogicMovObj();
    }
}

module.exports.MovObj = MovObj;