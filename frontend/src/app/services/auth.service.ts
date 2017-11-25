import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RegisterUser } from '../models/register-user';
import { LoginUser } from '../models/login-user';
import { BackendUrlService } from './backend-url.service';

@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl = '/api/login';
  private registerUrl = '/api/register';

  constructor(private backendUrl: BackendUrlService, private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public register(user: RegisterUser): Promise<any> {
    const url = this.backendUrl.url +  this.registerUrl;
    return this.http
      .post(url, user, {headers: this.headers})
      .toPromise()
      .then(res => {
        const token = res.json().token;
        this.saveToken(token);
        return res.json();
      })
      .catch(this.handleError);
  }

  public login(user: LoginUser): Promise<any> {
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

  public isLoggedIn(): boolean {
    const token = this.getToken();
    let payload;

    if(token) {
      payload = token.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public loggedInUser(): any {
    if(this.isLoggedIn()) {
      const token = this.getToken();

      let payload = token.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);

      return {
        username: payload.username
      };
    }
  }
}
