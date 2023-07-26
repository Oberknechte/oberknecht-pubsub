"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListener = void 0;
let oberknecht_utils_1 = require("oberknecht-utils");
let __1 = require("..");
let createWs_1 = require("./createWs");
let sendToWs_1 = require("./sendToWs");
async function createListener(sym, topic, callback) {
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
            .then((response) => {
            let topics = [`ws:message:topic:${topic}`];
            resolve({
                response: response,
                topics: topics,
            });
            if (callback && typeof callback === "function")
                __1.i.oberknechtEmitters[sym].on(topics[0], callback);
        })
            .catch(reject);
    });
}
exports.createListener = createListener;
