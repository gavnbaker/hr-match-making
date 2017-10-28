import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { Employee } from '../data/models/employee';
import { BackendUrlService } from './backend-url.service';

@Injectable()
export class ProfileService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl: string = '/login';
  private registerUrl: string = '/register';

  constructor(private backendUrl: BackendUrlService, private http: Http) { }

  public save(user: User): any {
    console.log(user);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
