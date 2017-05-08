/**
 * Created by zezhang on 2017/5/8.
 */


import {Injectable} from "@angular/core";
import {Article} from "../shared/models/article.model";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {ArticlesService} from "../shared/services/articles.service";
import {UserService} from "../shared/services/user.service";
import {Observable} from "rxjs/Observable";
@Injectable()
export class EditableArticleResolver implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService

  ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<any> {
      return this.articlesService.get(route.params['slug'])
        .map(article  => {
          if  (this.userService.getCurrentUser().username === article.author.username){
            return article;
          } else{
            this.router.navigateByUrl('/');
          }
        })
        .catch((err) => this.router.navigateByUrl('/'));
  }
}
