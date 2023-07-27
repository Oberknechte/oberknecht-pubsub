import {
  addKeysToObject,
  convertToArray,
  deleteKeyFromObject,
  getKeyFromObject,
} from "oberknecht-utils";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { i } from "..";
import { sendToWs } from "./sendToWs";

export function removeListener(sym: oberknechtPubsubClientSym, topic: string) {
  return new Promise((resolve, reject) => {
    let topicDatas = getKeyFromObject(i.webSocketData, [sym, "topics"]) ?? [];
    let topicData = topicDatas.filter((a) => a[1][0] === topic)[0];

    if (!topicData)
      return reject(Error("Topic not found in subscribed topics"));

    let wsSym = topicData[0];

    sendToWs(sym, wsSym, {
      type: "UNLISTEN",
      data: {
        topics: [topic],
      },
    })
      .then((r) => {
        let wsTopics =
          getKeyFromObject(i.webSocketData, [
            sym,
            "websockets",
            wsSym,
            "topics",
          ]) ?? [];

        let wsTopicsNew = wsTopics.filter((a) => a !== topic);

        addKeysToObject(
          i.webSocketData,
          [sym, "websockets", wsSym, "topics"],
          wsTopicsNew
        );

        let wsAllTopics = getKeyFromObject(i.webSocketData, [sym, "topics"]);

        let wsAllTopicsNew = wsAllTopics.filter((a) => a[1][0] !== topic);
        addKeysToObject(i.webSocketData, [sym, "topics"], wsAllTopicsNew);

        resolve({
          response: r,
          topics: convertToArray(topic),
        });
      })
      .catch(reject);
  });
}
