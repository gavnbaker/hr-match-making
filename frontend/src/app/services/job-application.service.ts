import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { JobPost } from '../models/jobpost';

@Injectable()
export class JobApplicationService {
  private jobAppsUrl = 'api/jobapplications';

  public constructor(private httpService: Http) {}

  public createJobApplication(jobpostId: number) {
    return this.httpService.post(this.jobAppsUrl,
      {
        UserID: 3,
        JobPostID: jobpostId,
        Status: 0,
      })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getJobApplicationsByUser(userId: number): any {
    const url = `api/users/${userId}/jobsapplied`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getJobAppliedByUser(jobPostId: number, userId: number): Promise<any> {
    const url = `api/users/${userId}/jobsapplied/${jobPostId}`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public cancelJobApplication(applicationId: number): Promise<any> {
    const url = `${this.jobAppsUrl}/${applicationId}`;
    return this.httpService.delete(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
