import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/services/auth-guard.service";
import {SharedModule} from "../shared/shared.module";
import {settings} from "cluster";
import {SettingsComponent} from "./settings.component";
/**
 * Created by zezhang on 2017/5/8.
 */


const settingsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    settingsRouting
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule{}
