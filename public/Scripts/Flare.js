/**
 * Created by Rik on 3-3-2016.
 */

"use strict"

class Flare extends MovObj {
    constructor(x, y, acc, rot, imageurl, imgx, imgy, imgtotal) {
        super(x, y, acc, imageurl, rot);
        this.imgx = imgx;
        this.imgy = imgy;
        this.imgtotal = imgtotal;
        this.animcycle = 0;
    }

    drawLogic() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot * radianfix);
        ctx.drawImage(this.image, this.animcycle * this.imgx, 0, this.imgx, this.imgy, -(this.imgx / 2), -(this.imgy / 2), this.imgx, this.imgy);
        ctx.restore();
    }

    updateLogicFlare() {
        if (this.animcycle >= this.imgtotal) {
            effects.splice(this.index, 1);
        }
        else this.animcycle++;
    }

    updateObject(delta) {
        this.updateLogicFlare();
        this.updateLogicMovObj(delta);
    }

}