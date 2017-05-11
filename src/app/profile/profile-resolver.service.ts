/**
 * Created by zezhang on 2017/5/8.
 */


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";

import {Profile} from "../shared";
import {ProfilesService} from "../shared/services/profiles.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private profilesService: ProfilesService,
    private router: Router
  )   {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
      return this.profilesService.get(route.params['username'])
        .catch((err) => this.router.navigateByUrl('/'));
  }
}
