import { oberknechtPubsubClientSym } from "../../types/oberknechtPubsubClient";
export declare class moderation_actionMessage {
    type: string;
    moderationAction: string;
    args: string[];
    moderatorLogin: string;
    moderatorID: string;
    targetLogin: string;
    targetID: string;
    createdAt: Date;
    constructor(sym: oberknechtPubsubClientSym, message: Record<string, any>);
}
