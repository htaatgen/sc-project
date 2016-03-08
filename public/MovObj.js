/**
 * Created by Rik on 3-3-2016.
 */
"use strict"

class MovObj extends Object {
    constructor(id, x, y, acc, rot, imageurl) {
        super(id, x, y, imageurl);
        this.acc = acc;
        this.rot = rot;
        this.drawObject();
    }

    drawLogic() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot * radianfix);
        ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
        ctx.restore();
    }

    drawObject() {
        this.drawLogic()
    }
}