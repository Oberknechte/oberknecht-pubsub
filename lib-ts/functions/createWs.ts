import {
  addAppendKeysToObject,
  addKeysToObject,
  getKeyFromObject,
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

export async function createWs(sym: oberknechtPubsubClientSym) {
  return new Promise((resolve, reject) => {
    addAppendKeysToObject(i.webSocketData, [sym, "wsNum"], 1);
    const wsSym = getKeyFromObject(i.webSocketData, [sym, "wsNum"]);
    let ws = new reconnectingWebSocket(wsAddress, [], { WebSocket: WebSocket });
    addKeysToObject(i.webSockets, [sym, wsSym], ws);

    ws.onopen = () => {
      i.oberknechtEmitters[sym].emit(`ws:${wsSym}:open`, "");
      resolve(wsSym);
    };

    ws.onmessage = (message) => {
      i.oberknechtEmitters[sym].emit(`ws:${wsSym}:messageraw`, message);
      messageHandler(sym, wsSym, message.data);
    };

    ws.onerror = (e) => {
      console.error("ws error", e);
    };

    ws.onclose = () => {
      console.log("ws closed");
      // ws.reconnect();
    };

    function heartbeat() {
      addKeysToObject(
        i.webSocketData,
        [sym, wsSym, "heartbeat", "interval"],
        setInterval(() => {
          sendToWs(sym, wsSym, { type: "PING" });
        }, heartbeatInterval)
      );
    }

    // heartbeat();
  });
}
