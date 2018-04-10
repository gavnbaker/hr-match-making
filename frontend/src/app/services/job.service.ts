import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { JobPost } from '../models/jobpost';
import { Router } from '@angular/router';

@Injectable()
export class JobService {
private jobUrl = '/api/JobPosts';

  constructor(private http: Http, private router: Router) {}
  /**
   * createJob
   */
  public createJobPost(jobPost: JobPost): Promise<JobPost> {
    return this.http.post(this.jobUrl, jobPost)
      .toPromise()
      .then(response => response.json() as JobPost)
      .catch(this.handleError);
  }

  /**
   * @returns promise with all the job posts in the database
   * @name getAllJobPosts
   */
  public getAllJobPosts(): Promise<JobPost[]> {
    return this.http.get(this.jobUrl)
      .toPromise()
      .then(response => response.json() as JobPost[])
      .catch(this.handleError);
  }

  public getJobPost(id: number): Promise<any> {
    const url = `${this.jobUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public updateJobPost(jobPost: JobPost): Promise<any> {
    const url = `${this.jobUrl}/${jobPost.JobPostID}`;
    return this.http.put(url, jobPost)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
