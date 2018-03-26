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

  public getJobPost(id: number): Promise<JobPost> {
    const url = `${this.jobUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as JobPost)
      .catch(this.handleError);
  }

  /**
   * applyToJob
   */
  public applyToJob(jobPostId: number): boolean {

    // Use default user id 1 to match user to bookmark
    console.log(jobPostId);
    return true;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
