import { moderation_actionMessage } from "../parser/messageTypes/moderation_action";
import { oberknechtPubsubClientSym } from "./oberknechtPubsubClient";
import { oberknechtPubsubClientOptions } from "./oberknechtPubsubClientOptions";
import WebSocket from "reconnecting-websocket";
export declare type clientSymObject = Record<oberknechtPubsubClientSym, any | Record<string, any>>;
export declare type clientSymWebsocketObject = Record<oberknechtPubsubClientSym, Record<string, WebSocket>>;
export declare type clientDataObject = Record<oberknechtPubsubClientSym, Record<string, any> & {
    _options?: oberknechtPubsubClientOptions;
}>;
export declare type responseCallback = Record<string, any>;
export declare function createListenerCallbackFunction(response: responseCallback): void;
export declare function moderationActionCallbackFunction(response: moderation_actionMessage): void;
