import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { JobService } from '../../../../services/job.service';
import { JobApplicationService } from '../../../../services/job-application.service';
import { BookmarkService } from '../../../../services/bookmark.service';
import { JobPost } from '../../../../models/jobpost';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  public jobPost: JobPost;
  public isApplied: boolean;
  public isBookmarked: boolean;

  constructor(private route: ActivatedRoute,
    private location: Location, private jobService: JobService,
    private jobAppsService: JobApplicationService, private bookmarkService: BookmarkService) { }

  ngOnInit() {
    const id = this.getRouteId();
    console.log(`id: ${id}`);
    this.jobService.getJobPost(id)
      .then(response => {
        console.log(response);
        this.jobPost = response;
      })
      .then(this.bookmarkService.isJobBookmarked(id))
      .then(this.jobAppsService.userAppliedToJob(id));
  }

  public getRouteId(): number {
    return +this.route.snapshot.paramMap.get('id');
  }

  public goBack() {
    this.location.back();
  }

  public bookmarkJob(jobPostId: number) {
    this.bookmarkService.bookmarkJob(jobPostId)
      .then(response => {
        console.log(response);
      });
  }

  public applyToJob(jobPostId: number) {
    this.jobAppsService.createJobApplication(jobPostId)
      .then(response => {
        console.log(response);
      });
  }

}
