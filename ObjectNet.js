/**
 * Created by Rik on 24-2-2016.
 */

'use strict';
var SCPS = require("./SCPServer.js");
    class Object {
        constructor(x, y, imageurl) {
            this.x = parseInt(x);
            this.y = parseInt(y);
            this.imageurl = imageurl;
            this.health = 100;
            this.id = SCPS.idcounter;
            SCPS.idcounter++;
        }
    }
module.exports.Object = Object;