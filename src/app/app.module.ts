import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule }  from './home/home.module';
import { SharedModule, FooterComponent, HeaderComponent } from './shared';
import { AuthModule } from './auth/auth.module';
import {ApiService} from "./shared/services/api.service";
import {UserService} from "./shared/services/user.service";
import {JwtService} from "./shared/services/jwt.service";
import {NoAuthGuard} from "./shared/services/no-auth-guard.service";
import {AuthGuard} from "./shared/services/auth-guard.service";
import {SettingsModule} from "./settings/settings.module";
import {ProfileModule} from "./profile/profile.module";
import {ProfilesService} from "./shared/services/profiles.service";
import {ArticlesService} from "./shared/services/articles.service";
import {EditorModule} from "./editor/editor.module";
import {ArticleModule} from "./article/article.module";
import {CommentsService} from "./shared/services/comments.service";
import {TagsService} from "./shared/services/tags.service";

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash:true});

@NgModule({

  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    HomeModule,
    rootRouting,
    SettingsModule,
    ProfileModule,
    EditorModule,
    ArticleModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    ApiService,
    UserService,
    JwtService,
    NoAuthGuard,
    AuthGuard,
    ProfilesService,
    ArticlesService,
    CommentsService,
    TagsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}





