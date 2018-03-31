import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from '../../../../services/job-application.service';
import { JobPost } from '../../../../models/jobpost';
import { ApplicationDto } from '../../../../models/dto/applicationDto';
import { Status } from '../../../../enums/status';
import { TableType } from '../../../../enums/TableType';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  public applications: ApplicationDto[];
  public applicationTable: TableType = TableType.Applications;

  constructor(private jobAppsService: JobApplicationService) { }

  ngOnInit() {
    this.getJobApplications();
  }
  // Remove the default userId
  public getJobApplications(userId: number = 3): void {
    this.jobAppsService.getJobApplicationsByUser(userId)
      .then(response => {
        this.applications = response;
        this.applications.forEach(application => {
          application.Status = this.convertStatusEnums(application.Status);
        });
      });
  }

  public convertStatusEnums(status: number): string {
    return Status[status];
  }

}
