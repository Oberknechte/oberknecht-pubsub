import { oberknechtEmitter } from "oberknecht-emitters";
import { oberknechtPubsubClientSym } from "./types/oberknechtPubsubClient";
import {
  clientDataObject,
  clientSymObject,
  clientSymWebsocketObject,
} from "./types";

export class i {
  static webSockets: clientSymWebsocketObject = {};
  static webSocketData: clientSymObject = {
    websockets: {},
    wsSym: 0,
    topics: [],
  };

  static clientData: clientDataObject = {};
  static oberknechtEmitters: Record<
    oberknechtPubsubClientSym,
    oberknechtEmitter
  > = {};
}
