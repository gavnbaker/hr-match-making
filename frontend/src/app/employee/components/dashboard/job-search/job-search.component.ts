import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job.service';
import { JobPost } from '../../../../models/jobpost';
import { BookmarkService } from '../../../../services/bookmark.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
  public jobPosts: JobPost[] = [];

  public constructor(private jobService: JobService, private bookmarkSvc: BookmarkService) {
    this.jobService.getAllJobPosts()
      .then(jobPosts => {
        this.jobPosts = jobPosts;
        console.log('Job Posts ', jobPosts);
      });
   }

  public ngOnInit() {}

  public bookmarkJob(jobPostId: number) {
    this.bookmarkSvc.bookmarkJob(jobPostId);
  }

  public applyToJob(jobPostId: number) {
    this.jobService.applyToJob(jobPostId);
  }

}
