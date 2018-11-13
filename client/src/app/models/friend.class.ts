import { User } from "./user.class";

export class Friend {
    _id: String;
    user_one : User = new User();
    user_two : User = new User();
    status : String;
}