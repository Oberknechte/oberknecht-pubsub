import { oberknechtEmitter } from "oberknecht-emitters";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { oberknechtPubsubClientOptions } from "../types/oberknechtPubsubClientOptions";
import { createListenerCallbackFunction, moderationActionCallbackFunction } from "../types";
export declare class oberknechtPubsubClient {
    #private;
    get symbol(): oberknechtPubsubClientSym;
    get _options(): oberknechtPubsubClientOptions;
    emitter: oberknechtEmitter;
    constructor(options: oberknechtPubsubClientOptions);
    createListener(topic: string, callback?: typeof createListenerCallbackFunction): Promise<import("../types/createListener").createListenerCallback>;
    createModactionListener(topic: string, callback?: typeof moderationActionCallbackFunction): Promise<import("../types/createListener").createListenerCallback>;
    on: (eventName: string | string[], callback: Function) => void;
    listen: (eventName: string | string[], callback: Function) => void;
    onModaction: (eventName: string, cb: typeof moderationActionCallbackFunction) => void;
    onModactions: (cb: typeof moderationActionCallbackFunction) => void;
}
