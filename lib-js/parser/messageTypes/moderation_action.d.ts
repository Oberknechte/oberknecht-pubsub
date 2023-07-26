import { oberknechtPubsubClientSym } from "../../types/oberknechtPubsubClient";
export declare class moderation_actionMessage {
    type: string;
    moderationAction: string;
    args: string[];
    moderatorLogin: string;
    moderatorID: string;
    targetLogin: string;
    targetID: string;
    channelID: string;
    createdAt: Date;
    constructor(sym: oberknechtPubsubClientSym, topic: string, message: Record<string, any>);
}
