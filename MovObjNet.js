/**
 * Created by Rik on 3-3-2016.
 */
"use strict"
var obj = require("./ObjectNet.js");

module.exports = function () {
    class MovObj extends Object {

        constructor(x, y, acc, rot, imageurl) {
            super(x, y, imageurl);
            this.acc = acc;
            this.rot = rot;
            this.updateObject();
            this.drawObject();
            this.updateLogicMovObj();
        }

        updateLogicMovObj(delta) {
            if (delta != undefined) {
                this.x += Math.cos(radianfix * this.rot) * this.acc * delta / 1000;
                this.y += Math.sin(radianfix * this.rot) * this.acc * delta / 1000;
                if (this.x >= SCPCanvas.width) this.x -= SCPCanvas.width;
                if (this.x <= 0) this.x += SCPCanvas.width;
                if (this.y >= SCPCanvas.height) this.y -= SCPCanvas.height;
                if (this.y <= 0) this.y += SCPCanvas.height;
                if (this.rot >= 360) this.rot -= 360;
            }
        }

        updateObject(delta) {
            this.updateLogicMovObj(delta);
        }

        drawLogic() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot * radianfix);
            ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
            ctx.restore();
        }

        drawObject() {
            this.drawLogic()
        }
    }
}