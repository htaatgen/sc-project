/**
 * Created by Rik on 3-3-2016.
 */

"use strict"

class Flare extends MovObj {
    constructor(x, y, acc, rot, imageurl, imgx, imgy, imgtotal) {
        super(x, y, acc, rot, imageurl);
        this.imgx = imgx;
        this.imgy = imgy;
        this.imgtotal = imgtotal;
        this.drawObject();
        this.animcycle = 0;
        this.id = -1;

    }

    drawLogic() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot * radianfix);
        ctx.drawImage(this.image, this.animcycle * this.imgx, 0, this.imgx, this.imgy, -(this.imgx / 2), -(this.imgy / 2), this.imgx, this.imgy);
        ctx.restore();
        if (this.animcycle >= this.imgtotal)  effects.splice(this.index, 1);
        else this.animcycle++;
    }

}