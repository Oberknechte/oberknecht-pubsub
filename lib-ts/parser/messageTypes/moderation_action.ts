import { oberknechtPubsubClientSym } from "../../types/oberknechtPubsubClient";

export class moderation_actionMessage {
  type: string;

  moderationAction: string;
  args: string[];

  moderatorLogin: string;
  moderatorID: string;

  targetLogin: string;
  targetID: string;

  createdAt: Date;

  constructor(sym: oberknechtPubsubClientSym, message: Record<string, any>) {
    let message_ = message.data;

    this.type = message_.type;

    this.moderationAction = message_.moderation_action;
    this.args = message_.args;

    this.moderatorLogin = message_.created_by;
    this.moderatorID = message_.created_by_user_id;

    this.targetLogin = message_.target_user_login;
    this.targetID = message_.target_user_id;

    this.createdAt = new Date(message_.created_at);
  }
}
