import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TitleService } from '../../../services/title.service';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';
import { Skill } from '../../../models/skill';
import { User } from '../../../models/user';
import { Address } from '../../../models/address';
import { WorkExperience } from '../../../models/work-experience';
import { Education } from '../../../models/education';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public employee_profile_form: FormGroup;
  public page_title = 'Create New Employee';
  public skills: Skill[] = new Array();

  constructor(
      private fb: FormBuilder,
      private titleService: TitleService,
      private profileService: ProfileService,
      private router: Router
    ) {
    this.createForm();
  }

  ngOnInit() {
    this.titleService.setTitle(this.page_title);
  }

  private createForm(): void {
    this.employee_profile_form = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      address: this.fb.group(
        {
          street: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
          apt: [null,  Validators.compose([Validators.maxLength(10)])],
          zipcode: [null,
            Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)])],
          city: [null, Validators.compose([Validators.required, Validators.maxLength(25)])],
          state: [null, Validators.required]
        }
      ),
      experiences: this.fb.array([]),
      skill: [''],
      education: this.fb.array([])
    });
  }

  public createEmployee(): void {
    const userProfile: User = this.createUser();
    this.profileService.save(userProfile);
    // this.router.navigate(['/dashboard']);
  }

  private createUser(): User {
    const firstName: string = this.firstName.value;
    const lastName: string = this.lastName.value;
    const address: Address = this.address.value as Address;
    const skills: Skill[] = this.skills;

    const formModel = this.employee_profile_form.value;
    const workHistory: WorkExperience[] = formModel.experiences.map(
      (experience: WorkExperience) => Object.assign({}, experience)
    );

    const education: Education[] = formModel.education.map(
      (ed: Education) => Object.assign({}, ed)
    );

    const userProfile: User = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      skills: skills,
      experience: workHistory,
      education: education
    };

    return userProfile;
  }

  /* Form Getters */
  public get firstName(): FormControl {
    return this.employee_profile_form.get('firstName') as FormControl;
  }

  public get lastName(): FormControl {
    return this.employee_profile_form.get('lastName') as FormControl;
  }

  public get address(): FormGroup {
    return this.employee_profile_form.get('address') as FormGroup;
  }

  public get experiences(): FormArray {
    return this.employee_profile_form.get('experiences') as FormArray;
  }

  public get skill(): FormControl {
    return this.employee_profile_form.get('skill') as FormControl;
  }

  public get education(): FormArray {
    return this.employee_profile_form.get('education') as FormArray;
  }

  /* Form Methods */
  public addSkill(value: string): void {
    if (value.trim() === '') {return; }

    const skill: Skill = {
      name: value
    };

    console.log(skill);
    this.skills.push(skill);
    this.skill.reset('');
  }

  public addExperience(): void {
    this.experiences.push(this.fb.group({
      jobTitle: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
      companyName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      jobDescription: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    }));
  }
  public addEducation(): void {
    this.education.push(this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      location: ['', Validators.compose([Validators.required, Validators.maxLength(75)])],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      degreeType: ['', Validators.required],
      degreeName: ['', Validators.required]
    }));
  }

  public removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  public removeSkill(index: number): void {
    this.skills.splice(index, 1);
  }

  public get diagnostic() { return JSON.stringify(this.employee_profile_form.value); }

  /**
   * getFormStatus
   */
  public get getFormStatus(): string {
    return JSON.stringify(this.employee_profile_form.status);
  }

}
