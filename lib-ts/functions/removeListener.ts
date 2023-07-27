import { convertToArray, getKeyFromObject } from "oberknecht-utils";
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
        resolve({
          response: r,
          topics: convertToArray(topic),
        });
      })
      .catch(reject);
  });
}
