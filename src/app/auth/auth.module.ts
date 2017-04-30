/**
 * Created by jackiezhang on 2017/4/27.
 */

import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {AuthComponent} from './auth.component';
import {NoAuthGuard} from "../shared/services/no-auth-guard.service";

const authRouting: ModuleWithProviders = RouterModule.forChild([
    {
      path: 'login',
      component: AuthComponent,
      canActivate: [NoAuthGuard]
    },
    {
      path: 'register',
      component: AuthComponent,
      canActivate: [NoAuthGuard]
    }
  ]

);

@NgModule({
  imports: [authRouting, SharedModule],
  declarations: [AuthComponent],
  providers: [NoAuthGuard]

})
export class AuthModule {}
