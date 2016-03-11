/**
 * Created by Rik on 10-3-2016.
 */

var then = new Date().getTime();

function SyncCall() {
    "use strict";

    var now = new Date().getTime();
    serverlooptime = now - then;
    then = now;

}

module.exports.SyncCall = SyncCall;