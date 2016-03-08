/**
 * Created by Rik on 3-3-2016.
 */
"use strict"


class Player extends MovObj {
    constructor(x, y, acc, rot, imageurl, primaryattacktype, imgx, imgy) {
        super(x, y, acc, rot, imageurl);
        this.firetimer = 0;
        this.rof = 50;
        this.shotready = true;
        this.primaryattacktype = primaryattacktype;
        this.momx = 0;
        this.momy = 0;
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
