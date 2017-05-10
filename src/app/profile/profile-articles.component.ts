import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../shared/models/profile.model";
import {ArticleListConfig} from "../shared/models/article-list-config.model";
/**
 * Created by zezhang on 2017/5/10.
 */

@Component({
  selector:'profile-articles',
  templateUrl:'./profile-articles.component.html'
})
export class ProfileArticlesComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  profile: Profile;
  articlesConfig: ArticleListConfig = new ArticleListConfig();

  ngOnInit(){
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.articlesConfig.filters.author = this.profile.username;
      }
    )
  }
}
