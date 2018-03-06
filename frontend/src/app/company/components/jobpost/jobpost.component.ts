import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';
import { JobService } from '../../../services/job.service';
import { JobPost } from '../../../models/jobpost';
import { Router } from '@angular/router';


@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.css']
})
export class JobPostComponent implements OnInit {
  public jobPostForm: FormGroup;
  public companies: Company[];

  public jobCtrls: AbstractControl;

  constructor(private fb: FormBuilder,
    private companyService: CompanyService, private jobServive: JobService, private router: Router) {}

  ngOnInit() {
    this.createForm();
    this.getCompanies();
    this.jobCtrls = this.jobPostForm.controls['job'];
  }

  /**
   * getCompanies
   */
  public getCompanies() {
    this.companyService.getCompanies()
      .then(companyList => this.companies = companyList);
  }

  private createForm(): void {
    this.jobPostForm = this.fb.group({
      companyId: ['', Validators.required],
      job: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      })
    });
  }

  /**
   * createJobPost
   * @author gavin
   * @description create new job post
   */
  public createJobPost() {
    const newJobPost: JobPost = this.jobPostForm.value;

    this.jobServive.createJobPost(newJobPost)
      .then(createdJobPost => {
          console.log(createdJobPost);
          this.router.navigate(['/dashboard']);
        });
  }

  public get diagnostic() { return JSON.stringify(this.jobPostForm.value); }

}
