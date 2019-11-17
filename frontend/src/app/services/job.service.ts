import { Injectable } from '@angular/core';

import { JobPost } from '../models/jobpost';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JobService {
private jobUrl = '/api/JobPosts';

  constructor(private http: HttpClient, private router: Router) {}
  /**
   * createJob
   */
  public createJobPost(jobPost: JobPost): Promise<JobPost> {
    return this.http.post(this.jobUrl, jobPost)
      .toPromise()
      .then(response => response as JobPost)
      .catch(this.handleError);
  }

  /**
   * @returns promise with all the job posts in the database
   * @name getAllJobPosts
   */
  public getAllJobPosts(companyId: number): Promise<JobPost[]> {
    const url = `api/company/${companyId}/jobposts`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as JobPost[])
      .catch(this.handleError);
  }

  public getJobPost(id: number): Promise<any> {
    const url = `${this.jobUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public updateJobPost(jobPost: JobPost): Promise<any> {
    const url = `${this.jobUrl}/${jobPost.JobPostID}`;
    return this.http.put(url, jobPost)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public deleteJobPost(jobpostId: number) {
    const url = `${this.jobUrl}/${jobpostId}`;
    return this.http.delete(url)
      .toPromise()
      .then(response => response);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
