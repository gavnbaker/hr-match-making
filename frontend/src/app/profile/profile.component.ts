import { Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Employee } from '../data/models/employee';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
      addrees: this.fb.group(
        {
          street: [null, Validators.required],
          zipcode: [null, Validators.required],
          city: [null, Validators.required],
          state: [null, Validators.required],
          country: [null, Validators.required]
        }
      )
    });
  }

  public onSubmit(): void {
    const firstName: string = this.profileForm.get('firstName').value;
    const lastName: string = this.profileForm.get('lastName').value;

    const newUser: Employee = new Employee(firstName, lastName);

    console.log(newUser);
  }

}
