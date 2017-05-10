/**
 * Created by zezhang on 2017/5/10.
 */
export class ArticleListConfig {
  type: string = 'all';

  filters: {
    tag?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  } = {};
}


