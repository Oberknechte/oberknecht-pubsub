"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderation_actionMessage = void 0;
class moderation_actionMessage {
    type;
    moderationAction;
    args;
    moderatorLogin;
    moderatorID;
    targetLogin;
    targetID;
    createdAt;
    constructor(sym, message) {
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
exports.moderation_actionMessage = moderation_actionMessage;
