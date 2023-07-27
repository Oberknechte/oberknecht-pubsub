import { responseMessage } from "./responseMessaage";
export type createListenerCallback = {
    response: responseMessage;
    topics: string[];
    topicEventNames: string[];
    wsSym: string;
};
