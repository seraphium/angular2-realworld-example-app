/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ArticlesService} from "../services/articles.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Article} from "../models/article.model";
@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ){}

  @Input() article: Article;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;
    this.userService.isAuthenticated.subscribe(
      (authenticated)  => {
        if (!authenticated)  {
          this.router.navigateByUrl('/login');
          return;

        }

        if (!this.article.favorited) {
          this.articlesService.favorite(this.article.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(true);
              },
              err => this.isSubmitting = false
            );
        } else {
          this.articlesService.unfavorite(this.article.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(false);
              },
              err => this.isSubmitting = false
            );

        }
      }
    )
  }
}
