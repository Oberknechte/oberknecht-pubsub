import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { createListenerCallback } from "../types/createListener";
import { createListenerCallbackFunction } from "../types";
export declare function createListener(sym: oberknechtPubsubClientSym, topic: string, token_?: string, callback?: typeof createListenerCallbackFunction): Promise<createListenerCallback>;
export declare function _createListener(): typeof createListener;
