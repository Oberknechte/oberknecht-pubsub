import { createID, recreate } from "oberknecht-utils";
import { i } from "..";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";

export function sendToWs(
  sym: oberknechtPubsubClientSym,
  wsSym: string,
  data: Record<string, any>
) {
  return new Promise((resolve, reject) => {
    let dat = recreate(data);
    let messageID = (dat.nonce = `${Date.now()}-${createID(10)}`);
    // console.log("ws ->", JSON.stringify(dat));
    i.webSockets[sym][wsSym].send(JSON.stringify(dat));
    i.oberknechtEmitters[sym].once(`ws:${wsSym}:message:${messageID}`, (r) => {
      resolve(r);
    });
  });
}
