import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {ProfileResolver} from "./profile-resolver.service";
import {SharedModule} from "../shared/shared.module";
/**
 * Created by zezhang on 2017/5/8.
 */

const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profile/:username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    }
  }
]);

@NgModule({
  imports: [
    profileRouting,
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    ProfileResolver
  ]

})
export class ProfileModule{}
