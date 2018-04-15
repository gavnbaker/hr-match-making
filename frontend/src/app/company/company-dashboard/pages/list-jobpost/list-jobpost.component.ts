import { Component, OnInit } from '@angular/core';
import { JobPost } from '../../../../models/jobpost';
import { JobService } from '../../../../services/job.service';

@Component({
  selector: 'app-list-jobpost',
  templateUrl: './list-jobpost.component.html',
  styleUrls: ['./list-jobpost.component.css']
})
export class ListJobpostComponent implements OnInit {
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

}
