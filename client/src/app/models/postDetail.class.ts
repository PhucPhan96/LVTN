import { Group } from './group.class';
import { User } from './user.class';
import { CmtPost } from './cmtpost.class';

export class PostDetail {
    _id : String;
    time_create : Date;
    content : String;
    img_path : String;
    group : Group = new Group();
    user : User = new User();
    cmtPost : CmtPost[] = Array<CmtPost>();
}