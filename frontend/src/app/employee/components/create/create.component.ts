import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { TitleService } from '../../../services/title.service';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';
import { Skill, UserSkills } from '../../../models/skill';
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
  public skills: UserSkills[] = [];

  // Form Controls
  public phoneCtrl: AbstractControl;
  public emailCtrl: AbstractControl;

  constructor(
      private fb: FormBuilder,
      private titleService: TitleService,
      private profileService: ProfileService,
      private router: Router
    ) {}

  private createForm(): void {
    this.employee_profile_form = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern(/(^\d{3}-\d{3}-\d{4}$)/)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
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

  ngOnInit() {
    this.titleService.setTitle(this.page_title);
    this.createForm();
    this.emailCtrl = this.employee_profile_form.controls['email'];
    this.phoneCtrl = this.employee_profile_form.controls['phone'];
  }

  public createEmployee(): void {
    const userProfile: User = this.createUser();
    this.profileService.save(userProfile)
      .then(user => {
        console.log(user);
        this.router.navigate(['/employee/dashboard']);
      });
  }

  private createUser(): User {
    const firstName: string = this.firstName.value;
    const lastName: string = this.lastName.value;

    // Add apt address to street address
    const streetApt: string = this.address.controls['street'].value + ' ' + this.address.controls['apt'].value;
    this.address.controls['street'].setValue(streetApt);
    const address: Address = this.address.value as Address;

    // Refactor experience from using any to a type
    const formModel = this.employee_profile_form.value;
    const workHistory: WorkExperience[] = formModel.experiences.map(
      (experience: any) => {
        const tmp: WorkExperience = {
          CompanyName: experience.companyName,
          Job: {
            Title: experience.jobTitle,
            Description: experience.jobDescription
          },
          StartDate: experience.startDate,
          EndDate: experience.endDate,
        };
        return Object.assign({}, tmp);
      });
    console.log(workHistory);

    const education: Education[] = formModel.education.map(
      (ed: Education) => Object.assign({}, ed)
    );

    const userProfile: User = {
      FirstName: firstName,
      LastName: lastName,
      Email: this.emailCtrl.value,
      Phone: this.phoneCtrl.value,
      Address: address,
      UserSkills: this.skills,
      JobHistory: workHistory,
      Education: education
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

    const skill: UserSkills = {
      Skill: {
        Name: value,
        YearsExperience: Math.floor((Math.random() * 10) + 1),
      },
    };

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

  public get skillsArray(): string {
    return JSON.stringify(this.skills);
  }

}
