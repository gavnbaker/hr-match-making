import { Component, OnInit, Input } from '@angular/core';
import { JobPost } from '../../../../models/jobpost';
import { JobApplicationService } from '../../../../services/job-application.service';

interface JobDTO {
  UserID: number;
  JobPost: JobPost;
  Status: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() jobApplications: JobDTO[];
  @Input() showStatus: boolean;

  constructor() { }

  ngOnInit() {
  }

  public viewJob(id: number) {
    console.log(id);
  }

}
