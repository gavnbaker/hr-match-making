import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RegisterUser } from '../models/register-user';
import { LoginUser } from '../models/login-user';

@Injectable()
export class AuthService {

  private tokenHeaders = new Headers(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  );

  private registerUrl = 'api/account/register';
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.json() || error);
  }

  public register(user: RegisterUser) {
    return this.http
      .post(this.registerUrl, user)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public login(user: LoginUser): Promise<any> {
    const url = '/token';
    const grant_type = 'password';
    const loginData = `username=${user.username}&password=${user.password}&grant_type=${grant_type}`;

    return this.http
      .post(url, loginData, { headers: this.tokenHeaders })
      .toPromise()
      .then(res => {
        const token: Token = res.json();
        this.saveToken(JSON.stringify(token));
        return token;
      })
      .catch(this.handleError);
  }

  public saveToken(token: any): void {
    localStorage.setItem('hr-token', token);
  }

  public getToken(): string {
    return localStorage.getItem('hr-token');
  }

  public logout(): void {
    localStorage.removeItem('hr-token');
  }

  public isLoggedIn(): boolean {
    const token: Token = JSON.parse(this.getToken());

    if ( token ) {
      const expireTimeInMillSecs: number = token.expires_in / 1000;
      const now: number = Date.now();
      const currentTimePlusExpire: Date = new Date(expireTimeInMillSecs + now);

      const scheduledExpireDateString = token['.expires'];
      const scheduledExpireDateinMilliSecs: number = Date.parse(scheduledExpireDateString);
      const scheduledExpireDate: Date = new Date(scheduledExpireDateinMilliSecs);

      if (currentTimePlusExpire.getTime() < scheduledExpireDate.getTime()) {
        return true;
      } else {
        this.logout();
        return false;
      }

    } else {
      return false;
    }
  }

  public loggedInUser(): string {
    if (this.isLoggedIn()) {
      const token: Token = JSON.parse(this.getToken());
      return token.userName;
    }
  }
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  userName: string;
}
