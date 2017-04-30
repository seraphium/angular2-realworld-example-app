/**
 * Created by zezhang on 2017/4/27.
 */
import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
  constructor(
    private userService: UserService
  ){}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
  }
}
