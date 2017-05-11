/**
 * Created by zezhang on 2017/5/10.
 */

import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
@Injectable()

export class TagsService {
  constructor(
    private apiService: ApiService
  ){}


  getAll(): Observable<[string]>{
      return this.apiService.get('/tags')
        .map(data => data.tags);
  }

}
