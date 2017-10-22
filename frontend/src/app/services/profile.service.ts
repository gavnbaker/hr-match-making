import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Employee } from '../data/models/employee';
import { BackendUrlService } from './backend-url.service';

@Injectable()
export class ProfileService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl: string = '/login';
  private registerUrl: string = '/register';

  constructor(private backendUrl: BackendUrlService, private http: Http) { }

  public save(user: any): any {
    console.log(user);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public register(user: any): Promise<any> {
    const url = this.backendUrl.url + this.registerUrl;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  public login(loginObj) {
    const data = localStorage.getItem('registered-users');
    console.log(data);

    if(!data) {
      return {
        success: false,
        message: 'Login failed: No registed users'
      };
    }

    const registeredUsers = JSON.parse(data);
    // search for user with that login name
    const user = registeredUsers.users.filter(user => user.email === loginObj.email);
    console.log(user);
    if(user.length === 0) {
      return {
        success: false,
        message: 'Login failed: Invalid User'
      };
    }

    if (user[0].password === loginObj.password) {
      // also want to set that the user is logged in
      return {
        success: true,
        message: 'Login Successful',
        data: user
      };
    } else {
      return {
        success: false,
        message: 'Login failed: Wrong password'
      };
    }
  }
}
