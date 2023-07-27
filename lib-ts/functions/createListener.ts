import { addAppendKeysToObject, getKeyFromObject } from "oberknecht-utils";
import { i } from "..";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { createWs } from "./createWs";
import { sendToWs } from "./sendToWs";
import { createListenerCallback } from "../types/createListener";
import { responseMessage } from "../types/responseMessaage";
import { createListenerCallbackFunction } from "../types";
let creatingWSPromise;

export async function createListener(
  sym: oberknechtPubsubClientSym,
  topic: string,
  token_?: string,
  callback?: typeof createListenerCallbackFunction
) {
  if (creatingWSPromise) await creatingWSPromise;

  return new Promise<createListenerCallback>(async (resolve, reject) => {
    let wsSym = getKeyFromObject(i.webSocketData, [sym, "wsNum"]);
    let token = token_ ?? i.clientData[sym]._options.token;

    let wsTopics = [];
    if (wsSym)
      wsTopics = getKeyFromObject(i.webSocketData, [
        sym,
        "websockets",
        wsSym,
        "topics",
      ]);

    if (!wsSym || wsTopics.length >= 50) {
      creatingWSPromise = new Promise<void>(async (resolve2) => {
        wsSym = await createWs(sym);
        resolve2();
        creatingWSPromise = undefined;
      });

      await creatingWSPromise;
    }

    sendToWs(sym, wsSym, {
      type: "LISTEN",
      data: {
        topics: [topic],
        auth_token: token,
      },
    })
      .then((response: responseMessage) => {
        let topics = [topic];
        let topicEventNames = [`ws:message:topic:${topic}`];

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

        resolve({
          response: response,
          topics: topics,
          topicEventNames: topicEventNames
        });

        if (callback && typeof callback === "function")
          i.oberknechtEmitters[sym].on(topicEventNames[0], callback);
      })
      .catch(reject);
  });
}
