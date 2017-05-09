import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./article.component";
import {ArticleResolver} from "./article-resolver.service";
import {SharedModule} from "../shared/shared.module";
import {MarkdownPipe} from "./markdown.pipe";
/**
 * Created by zezhang on 2017/5/9.
 */

const articleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'article/:slug',
    component: ArticleComponent,
    resolve:{
      article: ArticleResolver

    }
  }
]);

@NgModule({
  imports: [
    articleRouting,
    SharedModule
  ],
  declarations:  [
    ArticleComponent,
    MarkdownPipe
  ],
  providers: [
    ArticleResolver
  ]
})
export class ArticleModule {}

