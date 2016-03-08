/**
 * Created by Rik on 3-3-2016.
 */
"use strict"


class Player extends MovObj {
    constructor(id, x, y, acc, rot, imageurl, imgx, imgy) {
        super(id, x, y, acc, rot, imageurl);
        this.imgx = imgx;
        this.imgy = imgy;
        this.spriteselect = 0;
    }

    drawLogic() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot * radianfix);
        ctx.drawImage(this.image, this.spriteselect * this.imgx, 0, this.imgx, this.imgy, -(this.imgx / 2), -(this.imgy / 2), this.imgx, this.imgy);
        ctx.restore();
    }
}
