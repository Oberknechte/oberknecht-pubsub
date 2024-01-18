import { oberknechtEmitter } from "oberknecht-emitters";
import { i } from "..";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { oberknechtPubsubClientOptions } from "../types/oberknechtPubsubClientOptions";
import { addKeysToObject, getKeyFromObject } from "oberknecht-utils";
import { createListener } from "../functions/createListener";
import {
  createListenerCallbackFunction,
  moderationActionCallbackFunction,
} from "../types";
import { removeListener } from "../functions/removeListener";
let symNum = 0;

export class oberknechtPubsubClient {
  readonly #sym: oberknechtPubsubClientSym = `oberknechtPubsubClient-${symNum++}`;
  get symbol(): oberknechtPubsubClientSym {
    return this.#sym;
  }

  get _options(): oberknechtPubsubClientOptions {
    return (
      i.clientData[this.symbol]?._options ??
      ({} as oberknechtPubsubClientOptions)
    );
  }

  get topics() {
    return getKeyFromObject(i.webSocketData, [this.symbol, "topics"])
  }

  emitter: oberknechtEmitter = new oberknechtEmitter();

  constructor(options: oberknechtPubsubClientOptions) {
    addKeysToObject(i.clientData, [this.symbol, "_options"], options ?? {});
    // this.emitter = new oberknechtEmitter(options.emitterOptions);
    addKeysToObject(i.oberknechtEmitters, [this.symbol], this.emitter);
  }

  async createListener(
    topic: string,
    token?: string,
    callback?: typeof createListenerCallbackFunction
  ) {
    return createListener(this.symbol, topic, token, callback);
  }

  async removeListener(topic: string) {
    return removeListener(this.symbol, topic);
  }

  async removeModactionListener(userID: string, channelID: string) {
    return removeListener(
      this.symbol,
      `chat_moderator_actions.${userID}.${channelID}`
    );
  }

  async createModactionListener(
    userID: string,
    channelID: string,
    token?: string,
    callback?: typeof moderationActionCallbackFunction
  ) {
    return createListener(
      this.symbol,
      `chat_moderator_actions.${userID}.${channelID}`,
      token,
      callback
    );
  }

  on = this.emitter.on;
  listen = this.on;
  onModaction = (
    eventName: string,
    cb: typeof moderationActionCallbackFunction
  ) => {
    this.emitter.on(eventName, cb);
  };

  onModactions = (cb: typeof moderationActionCallbackFunction) => {
    this.emitter.on(`ws:message:type:moderation_action`, cb);
  };
}
