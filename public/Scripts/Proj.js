/**
 * Created by Rik on 3-3-2016.
 */
"use strict";


class Proj extends MovObj {
    constructor(x, y, acc, rot, imageurl) {
        super(x, y, acc, rot, imageurl);
    }
    updateProjBehaviour() {
        //if (this.lifetime <= this.timer) {
        //    projectiles.splice(this.index, 1);
        //}
        //else
        //    this.timer++;
        for (var x = 0; x < objects.length; x++) {
            if (this.x > objects[x].x - 10 && this.x < objects[x].x + 10 && this.y > objects[x].y - 10 && this.y < objects[x].y + 10 && this.timer >= 1) {
                effects.push(new Flare(this.x, this.y, this.acc / 10, this.rot, ".././Images/explo1.png", 11, 11, 6));
                projectiles.splice(this.index, 1);
                if (objects[x].health < 0) {
                    effects.push(new Flare(objects[x].x, objects[x].y, objects[x].acc, objects[x].rot, ".././Images/explo2.png", 82, 82, 8));

                }
            }
        }
    }

    updateObject() {
        this.updateLogicMovObj();
        this.updateProjBehaviour();
    }
}

