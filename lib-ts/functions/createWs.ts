import {
  addAppendKeysToObject,
  addKeysToObject,
  getKeyFromObject,
  log,
  returnErr,
} from "oberknecht-utils";
import { i } from "..";
import {
  heartbeatInterval,
  oberknechtPubsubClientSym,
  wsAddress,
} from "../types/oberknechtPubsubClient";
import { WebSocket } from "ws";
import reconnectingWebSocket from "reconnecting-websocket";
import { messageHandler } from "../parser/message";
import { sendToWs } from "./sendToWs";
import { _createListener } from "./createListener";

export async function createWs(sym: oberknechtPubsubClientSym) {
  addAppendKeysToObject(i.webSocketData, [sym, "wsNum"], 1);
  const wsSym = getKeyFromObject(i.webSocketData, [sym, "wsNum"]);
  let isReconnect = false;
  let isResolved = false;

  return new Promise((resolve, reject) => {
    addKeysToObject(i.webSocketData, [sym, "websockets", wsSym], {
      topics: [],
    });

    let ws = new reconnectingWebSocket(wsAddress, [], { WebSocket: WebSocket });

    if (!i.webSockets[sym]) i.webSockets[sym] = {};
    i.webSockets[sym][wsSym] = ws;

    ws.onopen = () => {
      i.oberknechtEmitters[sym].emit(`ws:${wsSym}:open`, "");
      if (!isResolved) {
        isResolved = true;
        resolve(wsSym);
      }

      (() => {
        if (!isReconnect) return;
        let oldWsTopics =
          getKeyFromObject(i.webSocketData, [
            sym,
            "websockets",
            wsSym,
            "topics",
          ]) ?? {};

        Object.keys(oldWsTopics).forEach((topic) => {
          let topicData = oldWsTopics[topic];

          _createListener()(sym, topic, topicData.extraArgs);
        });
      })();
    };

    ws.onmessage = (message) => {
      i.oberknechtEmitters[sym].emit(`ws:${wsSym}:messageraw`, message);
      messageHandler(sym, wsSym, message.data);
    };

    ws.onerror = (e) => {
      log(2, returnErr(Error("WS Error", { cause: e }), false, true));
    };

    ws.onclose = (ev) => {
      log(2, `WS Closed`, ev.code, ev.reason, ev.type);
      isReconnect = true;
      ws.reconnect();
    };

    function heartbeat() {
      addKeysToObject(
        i.webSocketData,
        [sym, "websockets", wsSym, "heartbeat", "interval"],
        ""
      );

      i.webSocketData[sym].websockets[wsSym].heartbeat.interval = setInterval(
        () => {
          sendToWs(sym, wsSym, { type: "PING" });
        },
        heartbeatInterval
      );
    }

    heartbeat();
  });
}
