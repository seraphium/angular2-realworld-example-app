/**
 * Created by zezhang on 2017/5/9.
 */


import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
@Injectable()
export class CommentsService {
  constructor(
    private apiService: ApiService
  ){}

  add(slug, payload): Observable<Comment> {
      return this.apiService.post(`/articles/${slug}/comments`, {comment: {body: payload}})
        .map(data => data.comment);
  }

  getAll(slug): Observable<Comment[]> {
      return this.apiService.get(`/articles/${slug}/comments`)
        .map(data => data.comments);
  }

  destroy(commentId, articleSlug) {
      return this.apiService.delete(`/articles/${articleSlug}/comments/${commentId}`);
  }

}
