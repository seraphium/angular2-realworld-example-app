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
import {JwtService} from "./jwt.service";


@Injectable()
export class UserService{
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: Http,
    private apiService: ApiService,
    private jwtService: JwtService,
  ) {}

  setAuth(user: User){
    this.jwtService.saveToken(user.token);
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

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          data => {
            this.setAuth(data.user);
          } ,
          err => this.purgeAuth()

        )
    } else {
      this.purgeAuth();
    }

  }

  update(user):Observable<User>{
    return this.apiService.put('/user', {user})
      .map(data => {
        this.currentUserSubject.next(data.user);
        return data.user;
      })
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }
}
