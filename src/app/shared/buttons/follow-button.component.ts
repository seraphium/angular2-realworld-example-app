/**
 * Created by zezhang on 2017/5/8.
 */


import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProfilesService} from "../services/profiles.service";
import { Router  } from "@angular/router";
import {UserService} from "../services/user.service";
import {Profile} from "../models/profile.model";

@Component({
  selector: 'follow-button',
  templateUrl:  './follow-button.component.html'
})
export class FollowButtonComponent {
  constructor(
    private profileService: ProfilesService,
    private router: Router,
    private userService: UserService
  ){}

  @Input()
  profile: Profile;

  @Output()
  onToggle = new EventEmitter<boolean>();

  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        if(!this.profile.following) {
          this.profileService.follow(this.profile.username)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(true);
              },
              err => this.isSubmitting = false
            );
        } else {

          this.profileService.unfollow(this.profile.username)
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
