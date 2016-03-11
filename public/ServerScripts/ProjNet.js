/**
 * Created by Rik on 3-3-2016.
 */
"use strict";
var mobj = require("./MovObjNet.js");

class Proj extends mobj.MovObj {
    constructor(x, y, acc, rot, imageurl, lifetime, damage) {
        super(x, y, acc, rot, imageurl);
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
            if (this.x > objects[x].x - 10 && this.x < objects[x].x + 10 && this.y > objects[x].y - 10 && this.y < objects[x].y + 10 && this.timer >= 20) {
                objects[x].health -= this.damage;
                projectiles.splice(this.index, 1);
                if (objects[x].health < 0) {
                    objects.splice(x, 1);
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
