import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../../services/job.service';
import { JobPost } from '../../../../models/jobpost';

@Component({
  selector: 'app-view-jobpost',
  templateUrl: './view-jobpost.component.html',
  styleUrls: ['./view-jobpost.component.css']
})
export class ViewJobpostComponent implements OnInit {
  public jobpostId: number;
  public jobpost: JobPost;

  constructor(private activatedRoute: ActivatedRoute, private jobService: JobService) { }

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
      });
  }

}
