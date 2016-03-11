/**
 * Created by Rik on 24-2-2016.
 */

'use strict';
var scps = require("../../SCPServer.js");


    class Object {
        constructor(x, y, imageurl) {
            this.x = x;
            this.y = y;
            this.imageurl = imageurl;
            this.health = 100;
            this.id = idcounter;
            idcounter++;
        }
    }
module.exports.Object = Object;