import { Secretary } from "../user/secretary";

export interface MessageDto{
    id: number,
    sender: Secretary,
    content: string,
    messageNumber: number
}