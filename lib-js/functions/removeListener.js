"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeListener = void 0;
const oberknecht_utils_1 = require("oberknecht-utils");
const __1 = require("..");
const sendToWs_1 = require("./sendToWs");
function removeListener(sym, topic) {
    return new Promise((resolve, reject) => {
        let topicDatas = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [sym, "topics"]) ?? [];
        let topicData = topicDatas?.[Object.keys(topicDatas).filter((a) => a === topic)[0]];
        if (!topicData)
            return reject(Error("Topic not found in subscribed topics"));
        let wsSym = topicData.wsSym;
        (0, sendToWs_1.sendToWs)(sym, wsSym, {
            type: "UNLISTEN",
            data: {
                topics: [topic],
            },
        })
            .then((r) => {
            let wsTopics = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [
                sym,
                "websockets",
                wsSym,
                "topics",
            ]) ?? {};
            let wsTopicsNew = Object.keys(wsTopics)
                .filter((a) => a !== topic)
                .map((a) => wsTopics[a]);
            (0, oberknecht_utils_1.addKeysToObject)(__1.i.webSocketData, [sym, "websockets", wsSym, "topics"], wsTopicsNew);
            let wsAllTopics = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [sym, "topics"]) ?? {};
            let wsAllTopicsNew = Object.keys(wsAllTopics)
                .filter((a) => a !== topic)
                .map((a) => wsAllTopics[a]);
            (0, oberknecht_utils_1.addKeysToObject)(__1.i.webSocketData, [sym, "topics"], wsAllTopicsNew);
            resolve({
                response: r,
                topics: (0, oberknecht_utils_1.convertToArray)(topic),
            });
        })
            .catch(reject);
    });
}
exports.removeListener = removeListener;
