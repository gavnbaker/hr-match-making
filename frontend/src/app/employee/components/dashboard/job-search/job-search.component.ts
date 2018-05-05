import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job.service';
import { JobPost } from '../../../../models/jobpost';
import { BookmarkService } from '../../../../services/bookmark.service';
import { JobApplicationService } from '../../../../services/job-application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
  public jobPosts: JobPost[] = [];

  // Test
  public companyId = 1;
  public userId = 3;

  // TODO Fix employee dashboard page
  public constructor(private jobService: JobService,
    private bookmarkSvc: BookmarkService, private jobAppsSvc: JobApplicationService) {
     this.jobService.getAllJobPosts(this.companyId)
       .then(jobPosts => {
         this.jobPosts = jobPosts;
         console.log('Job Posts ', jobPosts);
       });
   }

  public ngOnInit() {}

  public bookmarkJob(jobPostId: number) {
    this.bookmarkSvc.bookmarkJob(jobPostId)
      .then(response => {
        console.log(response);
      });
  }

  public applyToJob(jobPostId: number, userId: number) {
    this.jobAppsSvc.createJobApplication(jobPostId, userId)
      .then(response => {
        console.log(response);
      });
  }

}
