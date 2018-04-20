import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../../services/job.service';
import { JobPost } from '../../../../models/jobpost';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-jobpost',
  templateUrl: './view-jobpost.component.html',
  styleUrls: ['./view-jobpost.component.css']
})
export class ViewJobpostComponent implements OnInit {
  public jobpostId: number;
  public jobpost: JobPost;
  public errors;

  constructor(private activatedRoute: ActivatedRoute, private jobService: JobService,
    private location: Location, private router: Router) { }

  ngOnInit() {
    this.jobpostId = this.getRouteId();
    console.log(this.jobpostId);

    this.getJobpost(this.jobpostId);
  }

  public getRouteId(): number {
    return +this.activatedRoute.snapshot.paramMap.get('id');
  }

  public getJobpost(jobpostId: number) {
    this.jobService.getJobPost(jobpostId)
      .then(response => {
        this.jobpost = response;
        console.log(this.jobpost);
      })
      .catch(error => this.errors = error);
  }

  public deleteJobpost(jobpostId: number) {
    if (confirm('Please confirm deletion of Job Post')) {
      this.jobService.deleteJobPost(jobpostId)
      .then(response => {
        console.log(response);
        this.router.navigate(['company/dashboard/jobpost']);
      });
    } else {
      return;
    }
  }

  public goBack() {
    this.location.back();
  }
}
