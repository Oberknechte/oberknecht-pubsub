import { i } from "..";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { messageTypes } from "./messageTypes/message.types";

export function messageHandler(
  sym: oberknechtPubsubClientSym,
  wsSym: string,
  messageRaw: string
) {
  let message = JSON.parse(messageRaw);

  let parsedMessage = message;

  let cbEventNames = [
    `ws:${wsSym}:message`,
    `ws:message`,
    `ws:message:${message.nonce}`,
    // `ws:message:type:${message.type}`,
    ...(message.data?.topic ? [`ws:message:topic:${message.data?.topic}`] : []),
    ...(message.nonce ? [`ws:${wsSym}:message:${message.nonce}`] : []),
  ];

  switch (message.type) {
    case "MESSAGE": {
      let responseMessage = JSON.parse(message.data.message);

      cbEventNames.push(`ws:message:type:${responseMessage.type}`);

      let parsedResponseMessageClass =
        messageTypes[`${responseMessage.type}Message`];

      if (!parsedResponseMessageClass) return;

      let parsedResponseMessage = new parsedResponseMessageClass(
        sym,
        message.data.topic,
        responseMessage
      );

      parsedMessage = parsedResponseMessage;

      break;
    }
  }

  i.oberknechtEmitters[sym].emit(cbEventNames, parsedMessage);
}
