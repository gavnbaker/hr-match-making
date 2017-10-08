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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.fb.group(
        {
          street: [null, Validators.required],
          apt: [null, Validators.required],
          zipcode: [null, Validators.required],
          city: [null, Validators.required],
          state: [null, Validators.required]
        }
      ),
      experiences: this.fb.array([]),
      skill: [null, Validators.required]
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
    this.experiences.push(this.fb.group(new WorkExperience()));
  }

  public removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

}
