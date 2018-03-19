import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JobApplicationService {
  private jobAppsUrl = 'api/jobapplications';

  public constructor(private httpSvc: Http) {}

  public createJobApplication(jobpostId: number) {
    return this.httpSvc.post(this.jobAppsUrl,
      {
        UserID: 3,
        JobPostID: jobpostId,
        Status: 0,
      })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
