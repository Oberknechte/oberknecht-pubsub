import { oberknechtEmitter } from "oberknecht-emitters";
import { i } from "..";
import { oberknechtPubsubClientSym } from "../types/oberknechtPubsubClient";
import { oberknechtPubsubClientOptions } from "../types/oberknechtPubsubClientOptions";
import { addKeysToObject } from "oberknecht-utils";
import { createListener } from "../functions/createListener";
import {
  createListenerCallbackFunction,
  moderationActionCallbackFunction,
} from "../types";
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

  emitter: oberknechtEmitter = new oberknechtEmitter();

  constructor(options: oberknechtPubsubClientOptions) {
    addKeysToObject(i.clientData, [this.symbol, "_options"], options ?? {});
    this.emitter = new oberknechtEmitter(options.emitterOptions);
    addKeysToObject(i.oberknechtEmitters, [this.symbol], this.emitter);
  }

  async createListener(
    topic: string,
    callback?: typeof createListenerCallbackFunction
  ) {
    return createListener(this.symbol, topic, callback);
  }

  async createModactionListener(
    userID: string,
    channelID: string,
    callback?: typeof moderationActionCallbackFunction
  ) {
    return createListener(
      this.symbol,
      `chat_moderator_actions.${userID}.${channelID}`,
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
