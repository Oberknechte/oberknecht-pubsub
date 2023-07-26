import { moderation_actionMessage } from "../parser/messageTypes/moderation_action";
import { oberknechtPubsubClientSym } from "./oberknechtPubsubClient";
import { oberknechtPubsubClientOptions } from "./oberknechtPubsubClientOptions";

export type clientSymObject = Record<
  oberknechtPubsubClientSym,
  any | Record<string, any>
>;

export type clientSymWebsocketObject = Record<
  oberknechtPubsubClientSym,
  Record<string, WebSocket>
>;

export type clientDataObject = Record<
  oberknechtPubsubClientSym,
  Record<string, any> & {
    _options?: oberknechtPubsubClientOptions;
  }
>;

export type responseCallback = Record<string, any>;
export function createListenerCallbackFunction(response: responseCallback) {}
export function moderationActionCallbackFunction(
  response: moderation_actionMessage
) {}
