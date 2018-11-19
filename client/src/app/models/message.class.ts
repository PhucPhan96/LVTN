import { User } from "./user.class";
import { Conversation } from "./conversation.class";

export class Message {
    _id: String;
    conversation : Conversation = new Conversation();
    author : User = new User();
    message : String;
    time_send : Date;
}