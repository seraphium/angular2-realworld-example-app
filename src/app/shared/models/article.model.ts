/**
 * Created by zezhang on 2017/5/8.
 */
import { Profile } from './profile.model';

export class Article {
  slug: string;
  title: string = '';
  description: string = '';
  body: string = '';
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
