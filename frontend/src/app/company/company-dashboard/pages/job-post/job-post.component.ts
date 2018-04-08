import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Company } from '../../../../models/company';
import { JobPostSkills } from '../../../../models/skill';
import { CompanyService } from '../../../../services/company.service';
import { JobService } from '../../../../services/job.service';
import { Router } from '@angular/router';
import { JobPost } from '../../../../models/jobpost';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobpost',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  public onEditPage: boolean;
  public onCreatePage: boolean;
  public jobPostId: number;
  public jobPost: JobPost;

  public jobPostForm: FormGroup;
  public skills: JobPostSkills[] = [];

  public jobCtrls: AbstractControl;
  public skillsCtrl: AbstractControl;

  constructor(private fb: FormBuilder, private companyService: CompanyService,
    private jobServive: JobService, private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.createForm();
    this.getJobPostPage();
    this.jobCtrls = this.jobPostForm.controls['job'];
    this.skillsCtrl = this.jobPostForm.controls['skill'];
  }

  private createForm(): void {
    this.jobPostForm = this.fb.group({
      skill: [''],
      job: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      }),
    });
  }

  private getJobPostPage() {
    this.jobPostId = this.getRouteId();
    if (this.jobPostId) {
      this.onEditPage = true;
      this.configureEditPage();
    } else {
      this.onCreatePage = true;
    }
  }

  private configureEditPage() {
    if (this.onEditPage) {
      // set the page data
      // fetch job post
      this.jobServive.getJobPost(this.jobPostId)
        .then(jobpost => {
          console.log(jobpost);
          this.jobPost = jobpost;

          // populate skills array
          this.skills = this.jobPost.JobPostSkills;

          // Set the form values
          this.jobPostForm.setValue(
            {
              skill: '',
              job: {
                title: this.jobPost.Job.Title,
                description: this.jobPost.Job.Description
              }
            }
          );
        });
    }
  }

  public getRouteId(): number {
    return +this.activatedRoute.snapshot.paramMap.get('id');
  }

  /**
   * createJobPost
   * @author gavin
   * @description create new job post
   */
  public createJobPost(companyId: number = 1) {
    const newJobPost: JobPost = {
      Job: this.jobCtrls.value,
      CompanyID: companyId,
      JobPostSkills: this.skills,
    };

    this.jobServive.createJobPost(newJobPost)
      .then(createdJobPost => {
          this.router.navigate(['company/dashboard']);
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
