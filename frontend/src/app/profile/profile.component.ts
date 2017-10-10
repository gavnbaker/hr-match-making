import { Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

import { Employee } from '../data/models/employee';
import { Address } from '../data/models/address';
import { Skills } from '../data/models/skills';
import { WorkExperience } from '../data/models/work-experience';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Storage
  public skills: string[] = new Array();

  public profileForm: FormGroup;
  // public firstName: AbstractControl;
  // public lastName: AbstractControl;

  constructor(private titleService: TitleService, private fb: FormBuilder) {
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
      skill: [null]
    });
  }

  public onSubmit(): void {
    const firstName: string = this.profileForm.get('firstName').value;
    const lastName: string = this.profileForm.get('lastName').value;

    const newUser: Employee = new Employee(firstName, lastName);

    console.log(newUser);
  }

  public addSkill(skill: string): void {
    skill = skill.trim();

    console.log(skill);
    this.skills.push(skill);
  }

  public get experiences(): FormArray {
    return this.profileForm.get('experiences') as FormArray;
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
