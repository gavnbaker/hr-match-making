import { Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Employee } from '../data/models/employee';
import { Address } from '../data/models/address';
import { Skill } from '../data/models/skill';
import { WorkExperience } from '../data/models/work-experience';

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
          zipcode: [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)])],
          city: [null, Validators.compose([Validators.required, Validators.maxLength(25)])],
          state: [null, Validators.required]
        }
      ),
      experiences: this.fb.array([]),
      skill: ['']
    });
  }

  public onSubmit(): void {
    const employeeProfile: Employee = this.createUser();
    this.profileService.save(employeeProfile);
    this.router.navigate(['/dashboard']);
  }

  private createUser(): Employee {
    const firstName: string = this.firstName.value;
    const lastName: string = this.lastName.value;
    const address: Address = this.address.value as Address;
    const skills: Skill[] = this.skills;

    const formModel = this.profileForm.value;
    const workHistory: WorkExperience[] = formModel.experiences.map(
      (experience: WorkExperience) => Object.assign({}, experience)
    );

    const savedUser: Employee = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      skills: skills,
      experience: workHistory
    };

    return savedUser;
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

  /* Form Methods */
  public addSkill($event): void {
    const skill: string = this.skill.value;

    if (($event.which === 1 || $event.which === 13) && skill.trim() != '') {

      const _skill: Skill = {
        name: skill
      };

      console.log(_skill);
      this.skills.push(_skill);
      this.skill.reset(null);
    }
  }

  public addExperience(): void {
    this.experiences.push(this.fb.group({
      jobTitle: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
      companyName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      startDate: ['', Validators.compose([Validators.required, Validators.maxLength(7), Validators.pattern(/^\d{2}\/\d{4}$/)])],
      endDate: ['', Validators.compose([Validators.required, Validators.maxLength(7), Validators.pattern(/^\d{2}\/\d{4}$/)])],
      jobDescription: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    }));
  }

  public removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  public removeSkill(index: number): void {
    this.skills.splice(index,1);
  }

}
