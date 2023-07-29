"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._createListener = exports.createListener = void 0;
let oberknecht_utils_1 = require("oberknecht-utils");
let __1 = require("..");
let createWs_1 = require("./createWs");
let sendToWs_1 = require("./sendToWs");
let creatingWSPromise;
async function createListener(sym, topic, token_, callback) {
    if (creatingWSPromise)
        await creatingWSPromise;
    return new Promise(async (resolve, reject) => {
        let wsSym = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [sym, "wsNum"]);
        let token = token_ ?? __1.i.clientData[sym]._options.token;
        let wsTopics = [];
        if (wsSym)
            wsTopics = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [
                sym,
                "websockets",
                wsSym,
                "topics",
            ]);
        if (!wsSym || Object.keys(wsTopics).length >= 50) {
            creatingWSPromise = new Promise(async (resolve2) => {
                wsSym = await (0, createWs_1.createWs)(sym);
                resolve2();
                creatingWSPromise = undefined;
            });
            await creatingWSPromise;
        }
        (0, sendToWs_1.sendToWs)(sym, wsSym, {
            type: "LISTEN",
            data: {
                topics: [topic],
                auth_token: token,
            },
        })
            .then((response) => {
            let topics = [topic];
            let topicEventNames = [`ws:message:topic:${topic}`];
            topics.forEach((topic) => {
                (0, oberknecht_utils_1.addAppendKeysToObject)(__1.i.webSocketData, [sym, "websockets", wsSym, "topics", topic], {
                    extraArgs: [token],
                });
            });
            topics.forEach((topic) => {
                (0, oberknecht_utils_1.addAppendKeysToObject)(__1.i.webSocketData, [sym, "topics", topic], {
                    wsSym: wsSym,
                });
            });
            resolve({
                response: response,
                topics: topics,
                topicEventNames: topicEventNames,
                wsSym: wsSym,
            });
            if (callback && typeof callback === "function")
                __1.i.oberknechtEmitters[sym].on(topicEventNames[0], callback);
        })
            .catch(reject);
    });
}
exports.createListener = createListener;
function _createListener() {
    return createListener;
}
exports._createListener = _createListener;
