import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { Employee } from '../data/models/employee';
import { BackendUrlService } from './backend-url.service';

@Injectable()
export class ProfileService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl = '/login';
  private registerUrl = '/register';

  constructor(private backendUrl: BackendUrlService, private http: Http) { }

  public save(user: User): any {
    console.log(user);
  }

  // Get user profile with id# or user name
  public getUserProfile(name: string): Promise<User> {
    const url = 'url';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().user as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
