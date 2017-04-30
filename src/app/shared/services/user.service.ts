/**
 * Created by zezhang on 2017/4/28.
 */

import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {ApiService} from "./api.service";
import {User} from "../models";


@Injectable()
export class UserService{
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: Http,
    private apiService: ApiService
  ) {}

  setAuth(user: User){
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(type, credentials) : Observable<User> {
    let route = (type === 'login')?'/login':'';
    return this.apiService.post('/users' + route, {user: credentials})
      .map(data => {
        this.setAuth(data.user);
        return data;
      })
  }

  getCurrentUser(): User{
    return this.currentUserSubject.value;
  }
}
