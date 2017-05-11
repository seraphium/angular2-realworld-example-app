/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, Input} from "@angular/core";
import {Article} from "../models/article.model";
@Component({
  selector: 'article-meta',
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
@Input() article : Article;

}
