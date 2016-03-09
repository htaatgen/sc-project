/**
 * Created by Rik on 24-2-2016.
 */

'use strict';

class Object {

    constructor(id, x, y, imageurl) {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.image = new Image();
        this.image.src = imageurl;
        this.health = 100;
        this.id = id;
    }

    drawObject() {
        ctx.drawImage(this.image, this.x, this.y);
    }
}


