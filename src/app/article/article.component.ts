/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, OnInit} from "@angular/core";
import {Article} from "../shared/models/article.model";
import {User} from "../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticlesService} from "../shared/services/articles.service";
import {UserService} from "../shared/services/user.service";
import {FormControl} from "@angular/forms";
import {CommentsService} from "../shared/services/comments.service";
import {isUndefined} from "util";


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
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};

  constructor(
    private route: ActivatedRoute,
    private articlesService:  ArticlesService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService
  ){

  }

  ngOnInit()
  {
    this.route.data.subscribe(
      (data: {article: Article}) => {
        this.article = data.article;

        this.populateComments();
      }
    );

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    )
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
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

  populateComments() {
      this.commentsService.getAll(this.article.slug)
        .subscribe(comments => {
          if (isUndefined(comments)){
            this.comments = new Array<Comment>();
          }  else {
            this.comments = comments;
          }
        });

  }

  addComment() {
      this.isSubmitting = true;
      this.commentFormErrors = {};

      let commentBody = this.commentControl.value;
      this.commentsService
        .add(this.article.slug, commentBody)
        .subscribe(
          comment => {
            this.comments.unshift(comment);
            this.commentControl.reset('');
            this.isSubmitting = false;
          },
          errors => {
            this.isSubmitting = false;
            this.commentFormErrors = errors;
          }
        )
  }

  onDeleteComment(comment){
      this.commentsService.destroy(comment.id, this.article.slug)
        .subscribe(
          success => {
            this.comments = this.comments.filter((item) => item !== comment);
          }
        )
  }

}
