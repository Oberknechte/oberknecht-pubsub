"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = void 0;
let __1 = require("..");
let message_types_1 = require("./messageTypes/message.types");
function messageHandler(sym, wsSym, messageRaw) {
    let message = JSON.parse(messageRaw);
    let parsedMessage = message;
    let cbEventNames = [
        `ws:${wsSym}:message`,
        `ws:message`,
        `ws:message:${message.nonce}`,
        // `ws:message:type:${message.type}`,
        ...(message.data?.topic ? [`ws:message:topic:${message.data?.topic}`] : []),
        ...(message.nonce ? [`ws:${wsSym}:message:${message.nonce}`] : []),
    ];
    switch (message.type) {
        case "MESSAGE": {
            let responseMessage = JSON.parse(message.data.message);
            cbEventNames.push(`ws:message:type:${responseMessage.type}`);
            let parsedResponseMessageClass = message_types_1.messageTypes[`${responseMessage.type}Message`];
            if (!parsedResponseMessageClass)
                return;
            let parsedResponseMessage = new parsedResponseMessageClass(sym, message.data.topic, responseMessage);
            parsedMessage = parsedResponseMessage;
            break;
        }
    }
    __1.i.oberknechtEmitters[sym].emit(cbEventNames, parsedMessage);
}
exports.messageHandler = messageHandler;
