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
  public jobPost: any;
  public isApplied = false;
  public isBookmarked = false;
  public userId = 3;

  constructor(private route: ActivatedRoute,
    private location: Location, private jobService: JobService,
    private jobAppsService: JobApplicationService, private bookmarkService: BookmarkService) { }

  ngOnInit() {
    const jobPostId: number = this.getRouteId();
    this.getJobPost(jobPostId);
    this.checkIfUserAppliedToJob(jobPostId, this.userId);
    this.checkIfJobIsBookmarked(jobPostId, this.userId);
    console.log('JobPostId: ', jobPostId);
    console.log('Job Post: ', this.jobPost);
    console.log('User applied to job: ', this.isApplied);
    console.log('User Bookmarked job: ', this.isBookmarked);
  }

  public getJobPost(jobPostId: number): void {
    this.jobService.getJobPost(jobPostId)
      .then(response => this.jobPost = response);
  }

  public checkIfJobIsBookmarked(jobPostId: number, userId: number): void {
    this.bookmarkService.getBookmarkedJob(jobPostId, userId)
      .then(bookmarked => this.isBookmarked = bookmarked);
  }

  public checkIfUserAppliedToJob(jobPostId: number, userId: number): void {
    this.jobAppsService.getJobAppliedByUser(jobPostId, userId)
      .then(jobApplied => this.isApplied = jobApplied);
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
