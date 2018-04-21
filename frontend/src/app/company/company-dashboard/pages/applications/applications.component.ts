import { Component, OnInit } from '@angular/core';
import { JobPost } from '../../../../models/jobpost';
import { JobService } from '../../../../services/job.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  public jobPosts: JobPost[];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.getCompanyJobPosts();
  }

  private getCompanyJobPosts(companyId: number = 1) {
    this.jobService.getAllJobPosts(companyId)
      .then(jobposts => {
        this.jobPosts = jobposts;
        console.log(this.jobPosts);
      });
  }

  public isEmpty(): boolean {
    return this.jobPosts.length === 0;
  }

}
