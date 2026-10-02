import { WS_MSG_TYPE } from "./enums";

export type UserId = number;

export type WsMessage = {
    type:WS_MSG_TYPE;
    userId:number;
}