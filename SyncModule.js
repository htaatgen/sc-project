/**
 * Created by Rik on 10-3-2016.
 */

var then = new Date().getTime(),
    serverlooptime = 1;

function SyncCall() {
    "use strict";

    var now = new Date().getTime();
    serverlooptime = now - then;
    then = now;

    socket.emit("SyncCall", serverlooptime);

    console.log(serverlooptime);
}

module.exports.SyncCall = SyncCall();