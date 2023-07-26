import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
export declare function sendToWs(sym: oberknechtPubsubClientSym, wsSym: string, data: Record<string, any>): Promise<unknown>;
