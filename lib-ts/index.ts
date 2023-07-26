import { oberknechtEmitter } from "oberknecht-emitters";
import { oberknechtPubsubClientSym } from "./types/oberknechtPubsubClient";
import { clientDataObject, clientSymObject, clientSymWebsocketObject } from "./types";

export class i {
  static webSockets: clientSymObject = {};
  static webSocketData: clientSymWebsocketObject = {};

  static clientData: clientDataObject = {};
  static oberknechtEmitters: Record<
    oberknechtPubsubClientSym,
    oberknechtEmitter
  > = {};
}
