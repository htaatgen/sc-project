/**
 * Created by Rik on 3-3-2016.
 */
"use strict"
var mobj = require("./MovObjNet.js");
var SCPS = require("../../SCPServer.js");
var prj = require("./ProjNet.js");

class Player extends mobj.MovObj {

    constructor(id, x, y, acc, rot, imageurl, primaryattacktype, imgx, imgy, name, flaretype) {
        super(id, x, y, acc, rot, imageurl);
        this.firetimer = 0;
        this.rof = 50;
        this.primaryattacktype = primaryattacktype;
        this.momx = 0;
        this.momy = 0;
        this.imgx = imgx;
        this.imgy = imgy;
        this.id = id;
        this.accelerating = false;
        this.leftrotating = false;
        this.rightrotating = false;
        this.shooting = false;
        this.flaretimer = 0;
        this.name = name;
        this.flaretype = flaretype;
    }

    spawnProj(x, y, speed, imageurl, lifetime, damage) {
        projectiles.push(new prj.Proj(
            this.name,
            (Math.cos(radianfix * this.rot) * x) - (Math.sin(radianfix * -this.rot) * y) + this.x,
            (Math.sin(radianfix * this.rot) * x) - (Math.cos(radianfix * -this.rot) * y) + this.y,
            speed,
            this.rot,
            imageurl,
            lifetime,
            damage));
    }

    playerControls() {
        if (this.rightrotating == true) this.rot -= 2;
        if (this.leftrotating == true) this.rot += 2;
        if (this.accelerating == true) {
            if (this.flaretimer <= 0) {
                this.flaretimer = 5;
            }
            else {
                this.flaretimer--
            }
        }
    }

    playerPrimaryAttack() {
        if (this.shooting == true && this.firetimer <= 0) {
            this.firetimer = this.rof;
            switch (this.primaryattacktype) {
                case "Plasma Bolts":
                    this.spawnProj(20, 0, 2500, ".././Images/bolt.png", 150, 50);
                    this.rof = 20;
                    break;
                case "Autocannons":
                    this.spawnProj(20, 5, 2500, ".././Images/guns.png", 100, 5);
                    this.spawnProj(20, -5, 2500, ".././Images/guns.png", 100, 5);
                    this.rof = 6;
                    break;
                case "Laser Beam":
                    break;
                default:
                    this.spawnProj(20, 0, 2500, ".././Images/bolt.png", 150, 50);
                    this.rof = 20;
                    break;
            }
        }
        else this.firetimer--;
    }

    updateLogicMovObj() {
        if (this.accelerating == true) {
            this.momx += Math.cos(radianfix * this.rot) * this.acc / 10000;
            this.momy += Math.sin(radianfix * this.rot) * this.acc / 10000;
        }
        this.x += this.momx;
        this.y += this.momy;
        if (this.x >= screenwidth) this.x -= screenwidth;
        if (this.x <= 0) this.x += screenwidth;
        if (this.y >= screenheight) this.y -= screenheight;
        if (this.y <= 0) this.y += screenheight;
        if (this.rot >= 360) this.rot -= 360;

    }

    updateObject() {
        this.playerControls();
        this.playerPrimaryAttack();
        this.updateLogicMovObj()
    }
}

module.exports.Player = Player;