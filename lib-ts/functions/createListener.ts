import { addAppendKeysToObject, getKeyFromObject } from "oberknecht-utils";
import { i } from "..";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { createWs } from "./createWs";
import { sendToWs } from "./sendToWs";
import { createListenerCallback } from "../types/createListener";
import { responseMessage } from "../types/responseMessaage";
import { createListenerCallbackFunction } from "../types";

export async function createListener(
  sym: oberknechtPubsubClientSym,
  topic: string,
  callback?: typeof createListenerCallbackFunction
) {
  return new Promise<createListenerCallback>(async (resolve, reject) => {
    let wsSym = getKeyFromObject(i.webSocketData, [sym, "wsSym"]);

    let wsTopics = [];
    if (wsSym)
      wsTopics = getKeyFromObject(i.webSocketData, [
        sym,
        "websockets",
        wsSym,
        "topics",
      ]);

    // check if subscriptions are maxed
    if (!wsSym || wsTopics.length >= 50) wsSym = await createWs(sym);

    sendToWs(sym, wsSym, {
      type: "LISTEN",
      data: {
        topics: [topic],
        auth_token: i.clientData[sym]._options.token,
      },
    })
      .then((response: responseMessage) => {
        let topics = [`ws:message:topic:${topic}`];

        addAppendKeysToObject(
          i.webSocketData,
          [sym, "websockets", wsSym, "topics"],
          topics
        );

        addAppendKeysToObject(
          i.webSocketData,
          [sym, "topics"],
          [[wsSym, topics]]
        );

        console.log(i.webSocketData[sym]);

        resolve({
          response: response,
          topics: topics,
        });

        if (callback && typeof callback === "function")
          i.oberknechtEmitters[sym].on(topics[0], callback);
      })
      .catch(reject);
  });
}
