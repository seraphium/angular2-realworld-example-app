/**
 * Created by zezhang on 2017/5/10.
 */


import {Component, Input} from "@angular/core";
import {Article} from "../models/article.model";
@Component({
  selector: 'article-preview',
  templateUrl: './article-preview.component.html'
})
export class ArticlePreviewComponent {
  @Input() article: Article;

  onToggleFavorite(favorited: boolean) {
    this.article['favorited']= favorited;

    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }
}
