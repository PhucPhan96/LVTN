import { User } from "./user.class";
import { Group } from "./group.class";

export class Event{
    _id : String;
    title : String;
    time_create : Date;
    intro : String;
    imgpath : String;
    event_start : Date;
    event_end : Date;
    event_address : String;
    total_member: Number;
    misson : String;
    target : String;
    require : String;
    issummary : Boolean;
    user_create : String;
    group : String;
}