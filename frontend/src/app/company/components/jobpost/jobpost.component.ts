import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';
import { JobService } from '../../../services/job.service';
import { JobPost } from '../../../models/jobpost';
import { Router } from '@angular/router';
import { JobPostSkills } from '../../../models/skill';


@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.css']
})
export class JobPostComponent implements OnInit {
  public jobPostForm: FormGroup;
  public companies: Company[];
  public skills: JobPostSkills[] = [];

  public jobCtrls: AbstractControl;
  public companyCtrl: AbstractControl;
  public skillsCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
    private companyService: CompanyService, private jobServive: JobService, private router: Router) {}

  ngOnInit() {
    this.createForm();
    this.getCompanies();
    this.jobCtrls = this.jobPostForm.controls['job'];
    this.companyCtrl = this.jobPostForm.controls['companyId'];
    this.skillsCtrl = this.jobPostForm.controls['skill'];
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
      skill: [''],
      job: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      }),
    });
  }

  /**
   * createJobPost
   * @author gavin
   * @description create new job post
   */
  public createJobPost() {
    const newJobPost: JobPost = {
      Job: this.jobCtrls.value,
      CompanyID: this.companyCtrl.value,
      JobPostSkills: this.skills,
    };

    this.jobServive.createJobPost(newJobPost)
      .then(createdJobPost => {
          console.log(createdJobPost);
          // this.router.navigate(['/dashboard']);
        });
  }

  /* Form Methods */
  public addSkill(value: string): void {
    if (value.trim() === '') {return; }

    const skill: JobPostSkills = {
      Skill: {
        Name: value,
        YearsExperience: Math.floor((Math.random() * 10) + 1),
      }
    };

    this.skills.push(skill);
    this.skillsCtrl.reset('');
  }

  public removeSkill(index: number): void {
    console.log('entered removeSkill');
    this.skills.splice(index, 1);
  }

  public get skillsArray(): string {
    return JSON.stringify(this.skills);
  }

  public get diagnostic() { return JSON.stringify(this.jobPostForm.value); }

}
