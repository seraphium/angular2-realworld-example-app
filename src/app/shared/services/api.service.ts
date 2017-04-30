/**
 * Created by zezhang on 2017/4/28.
 */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {JwtService} from "./jwt.service";


@Injectable()
export class ApiService{
  constructor(
    private http: Http,
    private jwtService: JwtService
  ){}

  private setHeaders(): Headers {
     let headersConfig = {
       'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    };
     if (this.jwtService.getToken()) {
       headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
     }
    return new Headers(headersConfig);
  }

  private formatError(error: any){
      return Observable.throw(error.json());
  }

  post(path: string, body: Object = {}) : Observable<any> {
    let postPath = `${environment.api_url}${path}`;
    let postBody = JSON.stringify(body);
    let postHeader = this.setHeaders();
    return this.http.post(postPath,
        postBody, {headers: postHeader})
        .catch(this.formatError)
        .map((res: Response) => {

          let resJson = res.json();
          console.log(`post url: ${postPath}`);
          console.log(`post header: ${JSON.stringify(postHeader.toJSON())}`);
          console.log(`post body: ${postBody}`);
          console.log(`post res: ${JSON.stringify(resJson)}`);

          return resJson;
        });
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()) : Observable<any> {
      let getPath = `${environment.api_url}${path}`;
      let getHeader = this.setHeaders();
      return this.http.get(getPath, {headers: getHeader, search: params})
        .catch(this.formatError)
        .map((res: Response) => {
          let jsonRes = res.json();
          console.log(`get url: ${getPath}`);
          console.log(`get header${JSON.stringify(getHeader.toJSON())}`);
          console.log(`get res:${JSON.stringify(jsonRes)}`);

          return jsonRes;
        });
  }
}
