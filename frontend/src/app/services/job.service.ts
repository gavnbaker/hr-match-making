import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { JobPost } from '../models/jobpost';

@Injectable()
export class JobService {
  private jobUrl = '/api/JobPosts';

  constructor(private http: Http) {}

  /**
   * createJob
   */
  public createJobPost(jobPost: JobPost): Promise<JobPost> {
    return this.http.post(this.jobUrl, jobPost)
      .toPromise()
      .then(response => response.json() as JobPost)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
