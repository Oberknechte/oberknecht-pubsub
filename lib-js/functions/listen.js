"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
let oberknecht_utils_1 = require("oberknecht-utils");
let __1 = require("..");
let createWs_1 = require("./createWs");
let sendToWs_1 = require("./sendToWs");
async function listen(sym, topic) {
    return new Promise(async (resolve, reject) => {
        let wsSym = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [sym, "wsSym"]);
        // check if subscriptions are maxed
        if (!wsSym)
            wsSym = await (0, createWs_1.createWs)(sym);
        (0, sendToWs_1.sendToWs)(sym, wsSym, {
            type: "LISTEN",
            data: {
                topics: [topic],
                auth_token: __1.i.clientData[sym]._options.token,
            },
        })
            .then(resolve)
            .catch(reject);
    });
}
exports.listen = listen;
