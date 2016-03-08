/**
 * Created by Rik on 3-3-2016.
 */

"use strict"
var mobj = require("./MovObjNet.js");

class Flare extends mobj.MovObj {
    constructor(x, y, acc, rot, imageurl, imgx, imgy, imgtotal) {
        super(x, y, acc, rot, imageurl);
        this.imgx = imgx;
        this.imgy = imgy;
        this.imgtotal = imgtotal;
        this.animcycle = 0;
        this.id = -1;

    }
}
module.exports.Flare = Flare;