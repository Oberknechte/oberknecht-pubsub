"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWs = void 0;
let oberknecht_utils_1 = require("oberknecht-utils");
let __1 = require("..");
let oberknechtPubsubClient_1 = require("../types/oberknechtPubsubClient");
let ws_1 = require("ws");
const reconnecting_websocket_1 = __importDefault(require("reconnecting-websocket"));
let message_1 = require("../parser/message");
let sendToWs_1 = require("./sendToWs");
async function createWs(sym) {
    (0, oberknecht_utils_1.addAppendKeysToObject)(__1.i.webSocketData, [sym, "wsNum"], 1);
    const wsSym = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [sym, "wsNum"]);
    return new Promise((resolve, reject) => {
        (0, oberknecht_utils_1.addKeysToObject)(__1.i.webSocketData, [sym, "websockets", wsSym], {
            topics: [],
        });
        let ws = new reconnecting_websocket_1.default(oberknechtPubsubClient_1.wsAddress, [], { WebSocket: ws_1.WebSocket });
        if (!__1.i.webSockets[sym])
            __1.i.webSockets[sym] = {};
        __1.i.webSockets[sym][wsSym] = ws;
        ws.onopen = () => {
            __1.i.oberknechtEmitters[sym].emit(`ws:${wsSym}:open`, "");
            resolve(wsSym);
        };
        ws.onmessage = (message) => {
            __1.i.oberknechtEmitters[sym].emit(`ws:${wsSym}:messageraw`, message);
            (0, message_1.messageHandler)(sym, wsSym, message.data);
        };
        ws.onerror = (e) => {
            console.error("ws error", e);
        };
        ws.onclose = () => {
            console.log("ws closed");
            // ws.reconnect();
        };
        function heartbeat() {
            (0, oberknecht_utils_1.addKeysToObject)(__1.i.webSocketData, [sym, "websockets", wsSym, "heartbeat", "interval"], setInterval(() => {
                (0, sendToWs_1.sendToWs)(sym, wsSym, { type: "PING" });
            }, oberknechtPubsubClient_1.heartbeatInterval));
        }
        // heartbeat();
    });
}
exports.createWs = createWs;
