import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { BackendUrlService } from './backend-url.service';
import { AuthService } from './auth.service';

@Injectable()
export class ProfileService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl = '/login';
  private registerUrl = '/register';
  private userUrl = '/api/users';

  constructor(private backendUrl: BackendUrlService, private http: Http, private authServie: AuthService) { }

  public save(user: User): Promise<User> {
    return this.http.post(this.userUrl, user)
    .toPromise()
    .then(response => response.json() as User)
    .catch(this.handleError);
  }

  // Get user profile with id# or user name
  public getUserProfile(id: number): Promise<User> {
    const url: string = this.userUrl + `/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  // Get job recommendations with id# or user name
  public getUserJobRecommendations(name: string): Promise<any> {
    const url = 'url';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().jobs)
      .catch(this.handleError);
  }

  // Get user bookmarked job applications
  public getUserBookmarks(name: string): Promise<any> {
    const url = 'url';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().bookmarkedJobs)
      .catch(this.handleError);
  }

  // Get jobs that user applied to
  public getUserApplications(name: string): Promise<any> {
    const url = 'url';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().applications)
      .catch(this.handleError);
  }

  public getUserByUsername(): Promise<any> {
    const username: string = this.authServie.getLoggedInUser();
    const url = `api/users/username/${username}`;
    return this.http.get(url).toPromise()
      .then(response => {
        console.log(response.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
