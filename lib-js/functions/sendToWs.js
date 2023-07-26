"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToWs = void 0;
let oberknecht_utils_1 = require("oberknecht-utils");
let __1 = require("..");
function sendToWs(sym, wsSym, data) {
    return new Promise((resolve, reject) => {
        let dat = (0, oberknecht_utils_1.recreate)(data);
        let messageID = (dat.nonce = `${Date.now()}-${(0, oberknecht_utils_1.createID)(10)}`);
        // console.log("ws ->", JSON.stringify(dat));
        __1.i.webSockets[sym][wsSym].send(JSON.stringify(dat));
        __1.i.oberknechtEmitters[sym].once(`ws:${wsSym}:message:${messageID}`, (r) => {
            resolve(r);
        });
    });
}
exports.sendToWs = sendToWs;
