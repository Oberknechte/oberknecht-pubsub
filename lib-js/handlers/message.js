"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = void 0;
let __1 = require("..");
function messageHandler(sym, wsSym, messageRaw) {
    let message = JSON.parse(messageRaw);
    console.log("🚀 ~ file: message.ts:10 ~ message:", message);
    __1.i.oberknechtEmitters[sym].emit([`ws:${wsSym}:message`, `ws:${wsSym}:message:${message.nonce}`], message);
    switch (message.type) {
        case "RESPONSE": {
        }
    }
}
exports.messageHandler = messageHandler;
