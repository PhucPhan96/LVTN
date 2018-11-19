import { User } from "./user.class";

export class Conversation {
    _id : String;
    user_one : User = new User();
    user_two : User = new User();
}