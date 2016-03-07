/**
 * Created by Rik on 7-3-2016.
 */


class PlayerDummy extends Player() {
    constructor(id, x, y, acc, rot, health, momx, momy, imageurl, spriteselect, imgx, imgy) {
        super(x, y, acc, rot, health, momx, momy, imageurl, spriteselect, imgx, imgy)
        this.id = id;
    }
    updateObject(delta) {
        this.updateLogicMovObj(delta)
    }

}