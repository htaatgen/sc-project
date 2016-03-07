/**
 * Created by Rik on 3-3-2016.
 */
"use strict";


class Proj extends MovObj {
    constructor(x, y, acc, rot, imageurl, lifetime, damage) {
        super(x, y, acc, rot, imageurl);
        this.updateObject();
        this.lifetime = lifetime;
        this.damage = damage;
        this.timer = 0;
    }

    updateObject(delta) {

        this.updateLogicMovObj(delta);

        if (this.lifetime <= this.timer) {
            projectiles.splice(this.index, 1);
        }
        else
            this.timer++;
        for (var x = 0; x < objects.length; x++) {
            if (this.x > objects[x].x - 10 && this.x < objects[x].x + 10 && this.y > objects[x].y - 10 && this.y < objects[x].y + 10 && this.timer >= 20) {
                objects[x].health -= this.damage;
                effects.push(new Flare(this.x, this.y, this.acc/10, this.rot, "explo1.png", 11, 11, 6));
                projectiles.splice(this.index, 1);
                if (objects[x].health < 0) {
                    effects.push(new Flare(objects[x].x, objects[x].y, objects[x].acc, objects[x].rot, "explo2.png", 82, 82, 8));
                    objects.splice(x, 1);

                }
            }
        }
    }
}
