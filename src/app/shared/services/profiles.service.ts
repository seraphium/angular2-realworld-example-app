/**
 * Created by zezhang on 2017/5/8.
 */



import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {Profile} from "../models/";
@Injectable()
export class ProfilesService {
  constructor(
    private apiService: ApiService
  ){}

  get(username: string) : Observable<Profile>  {
      return this.apiService.get('/profiles/' + username)
        .map((data: {profile: Profile}) => data.profile);
  }
}
