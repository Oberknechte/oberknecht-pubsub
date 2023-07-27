"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeListener = void 0;
let oberknecht_utils_1 = require("oberknecht-utils");
let __1 = require("..");
let sendToWs_1 = require("./sendToWs");
function removeListener(sym, topic) {
    return new Promise((resolve, reject) => {
        let topicDatas = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [sym, "topics"]) ?? [];
        let topicData = topicDatas.filter((a) => a[1][0] === topic)[0];
        if (!topicData)
            return reject(Error("Topic not found in subscribed topics"));
        let wsSym = topicData[0];
        (0, sendToWs_1.sendToWs)(sym, wsSym, {
            type: "UNLISTEN",
            data: {
                topics: [topic],
            },
        })
            .then((r) => {
            resolve({
                response: r,
                topics: (0, oberknecht_utils_1.convertToArray)(topic),
            });
        })
            .catch(reject);
    });
}
exports.removeListener = removeListener;