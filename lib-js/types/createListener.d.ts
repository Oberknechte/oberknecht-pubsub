import { responseMessage } from "./responseMessaage";
export declare type createListenerCallback = {
    response: responseMessage;
    topics: string[];
    topicEventNames: string[];
    wsSym: string;
};
