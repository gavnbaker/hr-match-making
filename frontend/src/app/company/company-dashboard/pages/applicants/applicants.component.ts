import { Component, OnInit } from '@angular/core';
import { ApplicationDto } from '../../../../models/dto/applicationDto';
import { JobApplicationService } from '../../../../services/job-application.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Status } from '../../../../enums/status';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  public applicants: ApplicationDto[];
  public jobpostId: number;
  public error: any;

  // TESTing purposes
  public companyId = 1;

  constructor(private jobApplicationService: JobApplicationService, private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.jobpostId = this.getRouteId();
    this.getApplicants(this.companyId, this.jobpostId);
  }

  private getRouteId(): number {
    return +this.activatedRoute.snapshot.paramMap.get('jobpostId');
  }

  private getApplicants(companyId: number, jobpostId: number) {
    this.jobApplicationService.getApplicantsToJobpost(companyId, jobpostId)
      .then(response => {
        this.applicants = response;
        this.applicants.forEach(applicant => {
          applicant.Status = this.convertStatusEnums(applicant.Status);
        });
        console.log(this.applicants);
      })
      .catch(error => error);
  }

  public isEmpty(): boolean {
    return this.applicants.length === 0;
  }

  public goBack() {
    this.location.back();
  }

  public convertStatusEnums(status: number): string {
    return Status[status];
  }

}
