/**
 * Created by Rik on 3-3-2016.
 */
"use strict"
var mobj = require("./MovObjNet.js");

module.exports = function () {
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
            this.updateObject();
            this.playerControls();
            this.playerPrimaryAttack();
        }

        spawnProj(x, y, accadjust, imageurl, lifetime, damage) {
            projectiles.push(new Proj(
                (Math.cos(radianfix * this.rot) * x) - (Math.sin(radianfix * -this.rot) * y) + this.x,
                (Math.sin(radianfix * this.rot) * x) - (Math.cos(radianfix * -this.rot) * y) + this.y,
                this.acc + accadjust,
                this.rot,
                imageurl,
                lifetime,
                damage));
        }

        spawnFlare(x, y, rotadjust, imageurl, imgx, imgy, imgtotal) {
            effects.push(new Flare(
                (Math.cos(radianfix * this.rot) * x) - (Math.sin(radianfix * -this.rot) * y) + this.x,
                (Math.sin(radianfix * this.rot) * x) - (Math.cos(radianfix * -this.rot) * y) + this.y,
                this.acc + 50,
                this.rot - rotadjust,
                imageurl,
                imgx,
                imgy,
                imgtotal));
        }

        playerControls() {
            if (accelerating == true) {
                if (this.health <= 50) this.spriteselect = 3;
                else this.spriteselect = 2;
                this.spawnFlare(-20, 8, 180, "explo1.png", 11, 11, 6);
                this.spawnFlare(-20, -8, 180, "explo1.png", 11, 11, 6);
            }
            if (rightrotating == true) this.rot += 2;
            if (leftrotating == true) this.rot -= 2;
            if (accelerating != true) {
                if (this.health <= 50) this.spriteselect = 1;
                else this.spriteselect = 0;
            }
        }

        playerPrimaryAttack() {

            if (shooting == true && this.shotready == true) {
                switch (this.primaryattacktype) {
                    case "bolt":
                        this.spawnProj(20, 0, 250, "bolt.png", 150, 50);
                        this.rof = 20;
                        break;
                    case "guns":
                        this.spawnProj(20, 5, 250, "guns.png", 100, 5);
                        this.spawnProj(20, -5, 250, "guns.png", 100, 5);
                        this.rof = 6;
                        break;
                    case "beam":
                        break;
                    default:
                        projectiles.push(new Proj(this.x, this.y, this.acc + 150, this.rot, "bolt.png", 100, 10));
                        this.rof = 6;
                }
                this.shotready = false;
            }
            if (this.firetimer <= 0) {
                this.firetimer = this.rof;
                this.shotready = true;
            }
            this.firetimer--;
        }

        updateLogicMovObj(delta) {
            if (delta != undefined) {
                if (accelerating) {
                    this.momx += Math.cos(radianfix * this.rot) * this.acc * delta / 1000;
                    this.momy += Math.sin(radianfix * this.rot) * this.acc * delta / 1000;
                }
                this.x += this.momx;
                this.y += this.momy;
                if (this.x >= SCPCanvas.width) this.x -= SCPCanvas.width;
                if (this.x <= 0) this.x += SCPCanvas.width;
                if (this.y >= SCPCanvas.height) this.y -= SCPCanvas.height;
                if (this.y <= 0) this.y += SCPCanvas.height;
                if (this.rot >= 360) this.rot -= 360;
            }
        }

        updateObject(delta) {
            this.playerControls();
            this.playerPrimaryAttack();
            this.updateLogicMovObj(delta)
        }

        drawLogic() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot * radianfix);
            ctx.drawImage(this.image, this.spriteselect * this.imgx, 0, this.imgx, this.imgy, -(this.imgx / 2), -(this.imgy / 2), this.imgx, this.imgy);
            ctx.restore();
        }

        playerNetData() {
            return {
                id: this.id,
                x: this.x,
                y: this.y,
                acc: this.acc,
                rot: this.rot,
                health: this.health,
                momx: this.momx,
                momy: this.momy,
                imageurl: this.imageurl,
                spriteselect: this.spriteselect,
                imgx: this.imgx,
                imgy: this.imgy
            };
        }
    }
}