import {Profile} from "./profile.model";
/**
 * Created by zezhang on 2017/5/9.
 */

export class Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
