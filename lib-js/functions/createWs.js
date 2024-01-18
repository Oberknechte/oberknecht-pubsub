"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWs = void 0;
const oberknecht_utils_1 = require("oberknecht-utils");
const __1 = require("..");
const oberknechtPubsubClient_1 = require("../types/oberknechtPubsubClient");
const ws_1 = require("ws");
const reconnecting_websocket_1 = __importDefault(require("reconnecting-websocket"));
const message_1 = require("../parser/message");
const sendToWs_1 = require("./sendToWs");
const createListener_1 = require("./createListener");
async function createWs(sym) {
    (0, oberknecht_utils_1.addAppendKeysToObject)(__1.i.webSocketData, [sym, "wsNum"], 1);
    const wsSym = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [sym, "wsNum"]);
    let isReconnect = false;
    let isResolved = false;
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
            if (!isResolved) {
                isResolved = true;
                resolve(wsSym);
            }
            (() => {
                if (!isReconnect)
                    return;
                let oldWsTopics = (0, oberknecht_utils_1.getKeyFromObject)(__1.i.webSocketData, [
                    sym,
                    "websockets",
                    wsSym,
                    "topics",
                ]) ?? {};
                Object.keys(oldWsTopics).forEach((topic) => {
                    let topicData = oldWsTopics[topic];
                    (0, createListener_1._createListener)()(sym, topic, topicData.extraArgs);
                });
            })();
        };
        ws.onmessage = (message) => {
            __1.i.oberknechtEmitters[sym].emit(`ws:${wsSym}:messageraw`, message);
            (0, message_1.messageHandler)(sym, wsSym, message.data);
        };
        ws.onerror = (e) => {
            (0, oberknecht_utils_1.log)(2, (0, oberknecht_utils_1.returnErr)(Error("WS Error", { cause: e }), false, true));
        };
        ws.onclose = (ev) => {
            (0, oberknecht_utils_1.log)(2, `WS Closed`, ev.code, ev.reason, ev.type);
            isReconnect = true;
            ws.reconnect();
        };
        function heartbeat() {
            (0, oberknecht_utils_1.addKeysToObject)(__1.i.webSocketData, [sym, "websockets", wsSym, "heartbeat", "interval"], "");
            __1.i.webSocketData[sym].websockets[wsSym].heartbeat.interval = setInterval(() => {
                (0, sendToWs_1.sendToWs)(sym, wsSym, { type: "PING" });
            }, oberknechtPubsubClient_1.heartbeatInterval);
        }
        heartbeat();
    });
}
exports.createWs = createWs;
