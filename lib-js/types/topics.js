"use strict";
// See: https://dev.twitch.tv/docs/pubsub#topics
Object.defineProperty(exports, "__esModule", { value: true });
exports.topics = void 0;
exports.topics = [
    {
        name: "Bits",
        topic: "channel-bits-events-v1.<channel_id>",
        scopes: ["bits:read"],
    },
    {
        name: "Bits",
        topic: "channel-bits-events-v2.<channel_id>",
        scopes: ["bits:read"],
    },
    {
        name: "Bits Badge Notification",
        topic: "channel-bits-badge-unlocks.<channel_id>",
        scopes: ["bits:read"],
    },
    {
        name: "Channel Points",
        topic: "channel-points-channel-v1.<channel_id>",
        scopes: ["channel:read:redemptions"],
    },
    {
        name: "Channel Subscriptions",
        topic: "channel-subscribe-events-v1.<channel_id>",
        scopes: ["channel:read:subscriptions"],
    },
    {
        name: "Chat",
        topic: "automod-queue.<moderator_id>.<channel_id>",
        scopes: ["channel:moderate"],
    },
    {
        name: "Chat",
        topic: "chat_moderator_actions.<user_id>.<channel_id>",
        scopes: ["channel:moderate"],
    },
    {
        name: "Chat",
        topic: "low-trust-users.<channel_id>.<suspicious_user_id>",
        scopes: ["channel:moderate"],
    },
    {
        name: "Chat",
        topic: "user-moderation-notifications.<current_user_id>.<channel_id>",
        scopes: ["chat:read"],
    },
    {
        name: "Whispers",
        topic: "whispers.<user_id>",
        scopes: ["whispers:read"],
    },
];
