import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job.service';
import { JobPost } from '../../../../models/jobpost';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
  public jobPosts: JobPost[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getAllJobPosts()
      .then(jobPosts => {
        this.jobPosts = jobPosts;
        console.log('Job Posts ', jobPosts);
      });
  }

}
