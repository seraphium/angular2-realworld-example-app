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

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash:true});

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    HomeModule,
    rootRouting,
  ],
  providers: [
    ApiService,
    UserService,
    JwtService,
    NoAuthGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}





