/**
 * Created by Rik on 3-3-2016.
 */
"use strict"
var obj = require("./ObjectNet.js");
var SCPS = require("./SCPServer.js");

var screenwidth = SCPS.screenwidth,
    screeheight = SCPS.screenheight;

class MovObj extends obj.Object {

    constructor(x, y, acc, rot, imageurl) {
        super(x, y, imageurl);
        this.acc = acc;
        this.rot = rot;
        this.updateObject();
        this.updateLogicMovObj();
    }

    updateLogicMovObj(delta) {
        if (delta != undefined) {
            this.x += Math.cos(radianfix * this.rot) * this.acc * delta / 1000;
            this.y += Math.sin(radianfix * this.rot) * this.acc * delta / 1000;
            if (this.x >= screenwidth) this.x -= screenwidth;
            if (this.x <= 0) this.x += screenwidth;
            if (this.y >= screeheight) this.y -= screeheight;
            if (this.y <= 0) this.y += screeheight;
            if (this.rot >= 360) this.rot -= 360;
        }
    }

    updateObject(delta) {
        this.updateLogicMovObj(delta);
    }
}

module.exports.MovObj = MovObj;