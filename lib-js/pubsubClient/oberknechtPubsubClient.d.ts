import { oberknechtEmitter } from "oberknecht-emitters";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { oberknechtPubsubClientOptions } from "../types/oberknechtPubsubClientOptions";
import { createListenerCallbackFunction, moderationActionCallbackFunction } from "../types";
export declare class oberknechtPubsubClient {
    #private;
    get symbol(): oberknechtPubsubClientSym;
    get _options(): oberknechtPubsubClientOptions;
    get topics(): any;
    emitter: oberknechtEmitter;
    constructor(options: oberknechtPubsubClientOptions);
    createListener(topic: string, token?: string, callback?: typeof createListenerCallbackFunction): Promise<import("../types/createListener").createListenerCallback>;
    removeListener(topic: string): Promise<unknown>;
    removeModactionListener(userID: string, channelID: string): Promise<unknown>;
    createModactionListener(userID: string, channelID: string, token?: string, callback?: typeof moderationActionCallbackFunction): Promise<import("../types/createListener").createListenerCallback>;
    on: (eventName: string | string[], callback: Function) => void;
    listen: (eventName: string | string[], callback: Function) => void;
    onModaction: (eventName: string, cb: typeof moderationActionCallbackFunction) => void;
    onModactions: (cb: typeof moderationActionCallbackFunction) => void;
}
