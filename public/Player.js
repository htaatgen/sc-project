/**
 * Created by Rik on 3-3-2016.
 */
"use strict";


class Player extends MovObj {
    constructor(id, x, y, acc, rot, imageurl, imgx, imgy, momx, momy, primaryattacktype, health,flaretimer,firetimer) {
        super(x, y, acc, rot, imageurl);
        this.imgx = imgx;
        this.imgy = imgy;
        this.momx = momx;
        this.momy = momy;
        this.primaryattacktype = primaryattacktype;
        this.firetimer = firetimer;
        this.rof = 50;
        this.shotready = true;
        this.spriteselect = 0;
        this.id = id;
        this.accelerating = false;
        this.leftrotating = false;
        this.rightrotating = false;
        this.shooting = false;
        this.health = health;
        this.flaretimer = flaretimer;
    }

    spawnFlare(x, y, imageurl, imgx, imgy, imgtotal) {
        effects.push(new Flare(
            (Math.cos(radianfix * this.rot) * x) - (Math.sin(radianfix * -this.rot) * y) + this.x,
            (Math.sin(radianfix * this.rot) * x) - (Math.cos(radianfix * -this.rot) * y) + this.y,
            this.acc + 500,
            imageurl,
            this.rot - 180,
            imgx,
            imgy,
            imgtotal));
    }

    spawnProj(x, y, speed, imageurl) {
        projectiles.push(new Proj(
            (Math.cos(radianfix * this.rot) * x) - (Math.sin(radianfix * -this.rot) * y) + this.x,
            (Math.sin(radianfix * this.rot) * x) - (Math.cos(radianfix * -this.rot) * y) + this.y,
            speed,
            this.rot,
            imageurl))
    }

    playerPrimaryAttack() {
        if (this.shooting == true && this.firetimer <= 0) {
            this.firetimer = this.rof;
            switch (this.primaryattacktype) {
                case "bolt":
                    this.spawnProj(20, 0, 2500, "bolt.png", 150, 50);
                    this.rof = 20;
                    break;
                case "guns":
                    this.spawnProj(20, 5, 2500, "guns.png", 100, 5);
                    this.spawnProj(20, -5, 2500, "guns.png", 100, 5);
                    this.rof = 6;
                    break;
                case "beam":
                    break;
                default:
                    this.spawnProj(20, 0, 2500, "bolt.png", 150, 50);
                    this.rof = 20;
                    break;
            }
        }
        else this.firetimer--;
    }

    playerControls() {
        if (this.rightrotating == true) {
            this.rot -= 2 * syncfactor;
        }
        if (this.leftrotating == true) {
            this.rot += 2 * syncfactor;
        }
        if (this.accelerating == true) {
            if (this.health <= 50) {
                this.spriteselect = 3;
            }
            else {
                this.spriteselect = 2;
            }
            if (this.flaretimer <= 0) {
                this.spawnFlare(-20, 8, "explo1.png", 11, 11, 6);
                this.spawnFlare(-20, -8, "explo1.png", 11, 11, 6);
                this.flaretimer = 3;
            }
            else {
                this.flaretimer--
            }
        }
        if (this.accelerating != true) {
            if (this.health <= 50) this.spriteselect = 1;
            else this.spriteselect = 0;

        }
    }

    updateLogicMovObj() {
        if (this.accelerating == true) {
            this.momx += Math.cos(radianfix * this.rot) * this.acc * syncfactor / 10000;
            this.momy += Math.sin(radianfix * this.rot) * this.acc * syncfactor / 10000;
        }
        this.x += this.momx * syncfactor;
        this.y += this.momy * syncfactor;
        if (this.x >= SCPCanvas.width) this.x -= SCPCanvas.width;
        if (this.x <= 0) this.x += SCPCanvas.width;
        if (this.y >= SCPCanvas.height) this.y -= SCPCanvas.height;
        if (this.y <= 0) this.y += SCPCanvas.height;
        if (this.rot >= 360) this.rot -= 360;

    }

    updateObject() {
        this.playerControls();
        this.playerPrimaryAttack();
        this.updateLogicMovObj()
    }

    drawLogic() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot * radianfix);
        ctx.drawImage(this.image, this.spriteselect * this.imgx, 0, this.imgx, this.imgy, -(this.imgx / 2), -(this.imgy / 2), this.imgx, this.imgy);
        ctx.restore();
    }
}
