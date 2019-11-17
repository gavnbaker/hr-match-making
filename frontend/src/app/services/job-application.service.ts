import { Injectable } from '@angular/core';

import { ApplicationDto } from '../models/dto/applicationDto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JobApplicationService {
  private jobAppsUrl = 'api/jobapplications';

  public constructor(private httpService: HttpClient) {}

  public createJobApplication(jobpostId: number, userId: number) {
    return this.httpService.post(this.jobAppsUrl,
      {
        UserID: userId,
        JobPostID: jobpostId,
        Status: 0,
      })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getJobApplicationById(applicationId: number): Promise<any> {
    const url = `${this.jobAppsUrl}/${applicationId}`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getJobApplicationsByUser(userId: number): Promise<any> {
    const url = `api/users/${userId}/jobsapplied`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getJobAppliedByUser(jobPostId: number, userId: number): Promise<any> {
    const url = `api/users/${userId}/jobsapplied/${jobPostId}`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public cancelJobApplication(applicationId: number): Promise<any> {
    const url = `${this.jobAppsUrl}/${applicationId}`;
    return this.httpService.delete(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public updateJobApplication(application: ApplicationDto): Promise<any> {
    const url = `${this.jobAppsUrl}/${application.JobApplicationID}`;
    return this.httpService.put(url, application)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getApplicantsToJobpost(companyId: number, jobpostId: number): Promise<any> {
    const url = `api/company/${companyId}/usersapplied/${jobpostId}`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public searchApplicantsByName(name: string, companyId: number): Promise<any> {
    const url = `api/jobapplications/company/${companyId}/applicants/${name}`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getAllApplicants(companyId: number): Promise<any> {
    const url = `api/jobapplications/company/${companyId}/applicants`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getApplicantCompanyApplications(companyId: number, userId: number): Promise<any> {
    const url = `api/jobapplications/company/${companyId}/applicant/${userId}`;
    return this.httpService.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
