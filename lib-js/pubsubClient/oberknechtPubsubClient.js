"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oberknechtPubsubClient = void 0;
let oberknecht_emitters_1 = require("oberknecht-emitters");
let __1 = require("..");
let oberknecht_utils_1 = require("oberknecht-utils");
let createListener_1 = require("../functions/createListener");
let symNum = 0;
class oberknechtPubsubClient {
    #sym = `oberknechtPubsubClient-${symNum++}`;
    get symbol() {
        return this.#sym;
    }
    get _options() {
        return (__1.i.clientData[this.symbol]?._options ??
            {});
    }
    emitter = new oberknecht_emitters_1.oberknechtEmitter();
    constructor(options) {
        (0, oberknecht_utils_1.addKeysToObject)(__1.i.clientData, [this.symbol, "_options"], options ?? {});
        // this.emitter = new oberknechtEmitter(options.emitterOptions);
        (0, oberknecht_utils_1.addKeysToObject)(__1.i.oberknechtEmitters, [this.symbol], this.emitter);
    }
    async createListener(topic, token, callback) {
        return (0, createListener_1.createListener)(this.symbol, topic, token, callback);
    }
    async createModactionListener(userID, channelID, token, callback) {
        return (0, createListener_1.createListener)(this.symbol, `chat_moderator_actions.${userID}.${channelID}`, token, callback);
    }
    on = this.emitter.on;
    listen = this.on;
    onModaction = (eventName, cb) => {
        this.emitter.on(eventName, cb);
    };
    onModactions = (cb) => {
        this.emitter.on(`ws:message:type:moderation_action`, cb);
    };
}
exports.oberknechtPubsubClient = oberknechtPubsubClient;
