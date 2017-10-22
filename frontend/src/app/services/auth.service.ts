import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BackendUrlService } from './backend-url.service';

@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl: string = '/login';
  private registerUrl: string = '/register';

  constructor(private backendUrl: BackendUrlService, private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public register(user: any): Promise<any> {
    const url = this.backendUrl.url + this.registerUrl;
    return this.http
      .post(url, user, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  public login(user: any): Promise<any> {
    const url = this.backendUrl.url + this.loginUrl;
    return this.http
    .post(url, user, {headers: this.headers})
    .toPromise()
    .then(res => {
      const token = res.json().token;
      this.saveToken(token);
      console.log(token);
      return res.json();
    })
    .catch(this.handleError);
  }

  public saveToken(token: any): any {
    localStorage.setItem('hr-token', token);
  }

  public getToken(): any {
    return localStorage.getItem('hr-token');
  }

  public logout(): any {
    localStorage.removeItem('hr-token');
  }
}
