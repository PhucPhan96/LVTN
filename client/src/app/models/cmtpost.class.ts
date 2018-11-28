import { User } from './user.class';
import { Post } from './post.class';

export class CmtPost{
    _id : String;
    user : User = new User();
    post : Post = new Post();
    comment : String;
    time_cmt: Date;
}