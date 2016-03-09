/**
 * Created by Rik on 3-3-2016.
 */
"use strict"


class Player extends MovObj {
    constructor(id, x, y, rot, imageurl, imgx, imgy, momx, momy) {
        super(id, x, y, rot, imageurl);
        this.imgx = imgx;
        this.imgy = imgy;
        this.momx = momx;
        this.momy = momy;
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
