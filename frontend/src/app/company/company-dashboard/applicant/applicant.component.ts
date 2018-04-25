import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { JobApplicationService } from '../../../services/job-application.service';
import { ApplicationDto } from '../../../models/dto/applicationDto';
import { Status } from '../../../enums/status';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  public userId: number;
  public applicationId: number;
  public application: ApplicationDto;

  constructor(private activatedRoute: ActivatedRoute, private location: Location,
    private jobApplicationService: JobApplicationService, private router: Router) { }

  ngOnInit() {
    this.userId = this.getRouteId('userId');
    this.applicationId = this.getRouteId('applicationId');
    this.getApplication(this.applicationId);
  }

  private getRouteId(name: string): number {
    return +this.activatedRoute.snapshot.paramMap.get(name);
  }

  public goBack() {
    this.location.back();
  }

  public getApplication(applicationId: number) {
    this.jobApplicationService.getJobApplicationById(applicationId)
      .then(response => {
        this.application = response;
        console.log(this.application);
      });
  }

  public approve(application: ApplicationDto) {
    if (confirm('Confirm acceptance of applicant')) {
      const updatedApplication: ApplicationDto = Object.assign({}, application);
      updatedApplication.Status = Status.Accepted;
      this.jobApplicationService
        .updateJobApplication(updatedApplication)
        .then(response => {
          this.getApplication(this.applicationId);
        });
    }
    return;
  }

  public reject(application: ApplicationDto) {
    if (confirm('Confirm rejection of applicant')) {
      const updatedApplication: ApplicationDto = Object.assign({}, application);
      updatedApplication.Status = Status.Rejected;
      this.jobApplicationService.updateJobApplication(updatedApplication)
        .then(response => {
          this.getApplication(this.applicationId);
        });
    }
    return;
  }

  public isPendingApplicationStatus(status: any): boolean {
    return this.application.Status === Status.Pending;
  }

}
