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
  public bookmarkId: number;
  public applicationId: number;
  public jobApplicationId: number;
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
  }

  public getJobPost(jobPostId: number): void {
    this.jobService.getJobPost(jobPostId)
      .then(response => this.jobPost = response);
  }

  public checkIfJobIsBookmarked(jobPostId: number, userId: number): void {
    this.bookmarkService.getBookmarkedJob(jobPostId, userId)
      .then(bookmarked => {
        this.isBookmarked = Boolean(bookmarked);
        if (bookmarked === null) {
          return;
        } else if (bookmarked.BookmarkID) {
          this.bookmarkId = bookmarked.BookmarkID;
        }

        console.log('Bookmark Id: ', this.bookmarkId);
      });
  }

  public checkIfUserAppliedToJob(jobPostId: number, userId: number): void {
    this.jobAppsService.getJobAppliedByUser(jobPostId, userId)
      .then(jobApplied => {
        this.isApplied = Boolean(jobApplied);
        if (jobApplied === null) {
          return;
        } else if (jobApplied) {
          this.applicationId = jobApplied.JobApplicationID;
        }
        console.log('Application Id: ', this.applicationId);
      });
  }

  public getRouteId(): number {
    return +this.route.snapshot.paramMap.get('id');
  }

  public goBack() {
    this.location.back();
  }

  public unBookmarkJob(bookmarkId: number): void {
    this.bookmarkService.unbookmarkJob(bookmarkId)
      .then(response => {
        console.log(response);
        this.checkIfJobIsBookmarked(this.jobPost.JobPostID, this.userId);
      });
  }

  public bookmarkJob(jobPostId: number) {
    this.bookmarkService.bookmarkJob(jobPostId)
      .then(response => {
        this.checkIfJobIsBookmarked(jobPostId, this.userId);
      });
  }

  public applyToJob(jobPostId: number, userId: number) {
    this.jobAppsService.createJobApplication(jobPostId, userId)
      .then(response => {
        this.checkIfUserAppliedToJob(jobPostId, this.userId);
      });
  }

  public cancelJobApplication(applicationId: number): void {
    this.jobAppsService.cancelJobApplication(applicationId)
      .then(response => {
        this.checkIfUserAppliedToJob(applicationId, this.userId);
        console.log(response);
      });
  }

}
