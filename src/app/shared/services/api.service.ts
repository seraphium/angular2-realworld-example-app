/**
 * Created by zezhang on 2017/4/28.
 */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiService{
  constructor(
    private http: Http
  ){}

  private setHeaders(): Headers {
     let headersConfig = {
       'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    };
    return new Headers(headersConfig);
  }

  private formatError(error: any){
      return Observable.throw(error.json());
  }

  post(path: string, body: Object = {}) : Observable<any> {
      return this.http.post(`${environment.api_url}${path}`,
        JSON.stringify(body), {headers: this.setHeaders()})
        .catch(this.formatError)
        .map((res: Response) => res.json());
  }
}
