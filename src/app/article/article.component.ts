/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, OnInit} from "@angular/core";
import {Article} from "../shared/models/article.model";
import {User} from "../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticlesService} from "../shared/services/articles.service";
import {UserService} from "../shared/services/user.service";


@Component({
  selector: 'article-page',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private articlesService:  ArticlesService,
    private router: Router,
    private userService: UserService
  ){

  }

  ngOnInit()
  {
    this.route.data.subscribe(
      (data: {article: Article}) => {
        this.article = data.article;
      }
    );

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    )
  }

  onToggleFollowing(following: boolean) {
      this.article.author.following = following;
  }

  deleteArticle() {
      this.isDeleting = true;
      this.articlesService.destroy(this.article.slug)
        .subscribe(
          success => {
            this.router.navigateByUrl('/');
          }
        )
  }

}
