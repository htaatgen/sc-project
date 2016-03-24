/**
 * Created by Rik on 3-3-2016.
 */
"use strict";
var mobj = require("./MovObjNet.js");
var flr = require("./FlareNet.js");

class Proj extends mobj.MovObj {
    constructor(id, x, y, acc, rot, imageurl, lifetime, damage) {
        super(x, y, acc, rot, imageurl);
        this.id = id;
        this.lifetime = lifetime;
        this.damage = damage;
        this.timer = 0;
    }

    updateProjBehaviour() {
        if (this.lifetime <= this.timer) {
            projectiles.splice(this.index, 1);
        }
        else
            this.timer++;
        for (var x = 0; x < objects.length; x++) {
            if (this.x > objects[x].x - 10 && this.x < objects[x].x + 10 && this.y > objects[x].y - 10 && this.y < objects[x].y + 10) {
                effects.push(new flr.Flare(this.x, this.y, this.acc / 10, this.rot, ".././Images/explo1.png", 11, 11, 6));
                objects[x].health -= this.damage;
                projectiles.splice(this.index, 1);
                if (objects[x].health < 0) {
                    effects.push(new flr.Flare(objects[x].x, objects[x].y, objects[x].acc, objects[x].rot, ".././Images/explo2.png", 82, 82, 8));
                    objects.splice(x, 1);
                    for (var x = 0; x < activeusers.length; x++) {
                        if (this.id == activeusers[x].name) {
                            activeusers[x].kills++
                        }
                    }
                }
            }
        }
    }

    updateObject() {
        this.updateLogicMovObj();
        this.updateProjBehaviour();
    }
}

module.exports.Proj = Proj
