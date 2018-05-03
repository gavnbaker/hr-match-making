import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JobApplicationService } from '../../../../services/job-application.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  public searchControl: FormControl = new FormControl('');
  public applicants: User[];

  constructor(private jobApplicationService: JobApplicationService) { }

  ngOnInit() {
    this.getAllApplicants();
  }

  // Extend to also search for id
  public search(name: string, companyId: number = 1) {
    console.log(name);
    this.jobApplicationService.searchApplicantsByName(name, companyId)
      .then(response => {
        this.applicants = response;
        console.log(this.applicants);
      });
    this.searchControl.reset();
  }

  public getAllApplicants(companyId: number = 1) {
    this.jobApplicationService.getAllApplicants(companyId)
      .then(response => {
        this.applicants = response;
        console.log(this.applicants);
      });
  }

}
