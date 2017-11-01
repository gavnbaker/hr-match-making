import { Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {Address, Skill, WorkExperience, Education, User} from '../models/user';

import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public skills: Skill[] = new Array();
  public profileForm: FormGroup;

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
      this.createForm();
  }

  public ngOnInit() {
    this.titleService.setTitle('Create Profile');
  }

  private createForm(): void {
    this.profileForm = this.fb.group({
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

  public onSubmit(): void {
    const userProfile: User = this.createUser();
    this.profileService.save(userProfile);
    this.router.navigate(['/dashboard']);
  }

  private createUser(): User {
    const firstName: string = this.firstName.value;
    const lastName: string = this.lastName.value;
    const address: Address = this.address.value as Address;
    const skills: Skill[] = this.skills;

    const formModel = this.profileForm.value;
    const workHistory: WorkExperience[] = formModel.experiences.map(
      (experience: WorkExperience) => Object.assign({}, experience)
    );

    const education: Education[] = formModel.education.map(
      (education: Education) => Object.assign({}, education)
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
    return this.profileForm.get('firstName') as FormControl;
  }

  public get lastName(): FormControl {
    return this.profileForm.get('lastName') as FormControl;
  }

  public get address(): FormGroup {
    return this.profileForm.get('address') as FormGroup;
  }

  public get experiences(): FormArray {
    return this.profileForm.get('experiences') as FormArray;
  }

  public get skill(): FormControl {
    return this.profileForm.get('skill') as FormControl;
  }

  public get education(): FormArray {
    return this.profileForm.get('education') as FormArray;
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



}
