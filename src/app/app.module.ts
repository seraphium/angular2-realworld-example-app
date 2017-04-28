import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule }  from './home/home.module';
import { SharedModule, FooterComponent, HeaderComponent } from './shared';
import { AuthModule } from './auth/auth.module';
import {ApiService} from "./shared/services/api.service";
import {UserService} from "./shared/services/user.service";

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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
