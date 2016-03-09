/**
 * Created by Rik on 3-3-2016.
 */
"use strict";


class Player extends MovObj {
    constructor(x, y, acc, rot, imageurl, imgx, imgy, momx, momy) {
        super(x, y, acc, rot, imageurl);
        this.imgx = imgx;
        this.imgy = imgy;
        this.momx = momx;
        this.momy = momy;
        this.spriteselect = 0;
    }

    spawnFlare(x, y, imageurl, imgx, imgy, imgtotal) {
        effects.push(new Flare(
            (Math.cos(radianfix * this.rot) * x) - (Math.sin(radianfix * -this.rot) * y) + this.x,
            (Math.sin(radianfix * this.rot) * x) - (Math.cos(radianfix * -this.rot) * y) + this.y,
            this.acc + 500,
            imageurl,
            this.rot-180,
            imgx,
            imgy,
            imgtotal));
    }

    playerControls() {
        if (accelerating == true) {
            if (this.health <= 50) {
                this.spriteselect = 3;
            }
            else {
                this.spriteselect = 2;
            }
            this.spawnFlare(-20, 8, "explo1.png", 11, 11, 6);
            this.spawnFlare(-20, -8, "explo1.png", 11, 11, 6);
        }
        if (rightrotating == true) {
            this.rot -= 2;
        }
        if (leftrotating == true) {
            this.rot += 2;
        }
        if (accelerating != true) {
            if (this.health <= 50) this.spriteselect = 1;
            else this.spriteselect = 0;

        }
    }

    updateLogicMovObj() {
        this.playerControls();
        if (accelerating == true) {
            this.momx += Math.cos(radianfix * this.rot) * this.acc / 1000;
            this.momy += Math.sin(radianfix * this.rot) * this.acc / 1000;
        }
        this.x += this.momx;
        this.y += this.momy;
        if (this.x >= SCPCanvas.width) this.x -= SCPCanvas.width;
        if (this.x <= 0) this.x += SCPCanvas.width;
        if (this.y >= SCPCanvas.height) this.y -= SCPCanvas.height;
        if (this.y <= 0) this.y += SCPCanvas.height;
        if (this.rot >= 360) this.rot -= 360;

    }

    drawLogic() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot * radianfix);
        ctx.drawImage(this.image, this.spriteselect * this.imgx, 0, this.imgx, this.imgy, -(this.imgx / 2), -(this.imgy / 2), this.imgx, this.imgy);
        ctx.restore();
    }
}
