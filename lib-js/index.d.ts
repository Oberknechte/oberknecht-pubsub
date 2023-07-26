import { oberknechtEmitter } from "oberknecht-emitters";
import { oberknechtPubsubClientSym } from "./types/oberknechtPubsubClient";
import { clientDataObject, clientSymObject, clientSymWebsocketObject } from "./types";
export declare class i {
    static webSockets: clientSymWebsocketObject;
    static webSocketData: clientSymObject;
    static clientData: clientDataObject;
    static oberknechtEmitters: Record<oberknechtPubsubClientSym, oberknechtEmitter>;
}
