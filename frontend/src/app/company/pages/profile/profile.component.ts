import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  states: string[] = ['New Jersey', 'New York', 'California', 'Florida'];


  // Form stuff
  public companyForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      industry: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      address: this.fb.group(
        {
          street: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
          apt: [null,  Validators.compose([Validators.maxLength(10)])],
          zipcode: [null,
            Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)])],
          city: [null, Validators.compose([Validators.required, Validators.maxLength(25)])],
          state: ['New Jersey', Validators.required]
        }
      )
    });
  }

   /* Form Getters */
  public get name(): FormControl {
    return this.companyForm.get('name') as FormControl;
  }

  public get description(): FormControl {
    return this.companyForm.get('description') as FormControl;
  }

  public get industry(): FormControl {
    return this.companyForm.get('industry') as FormControl;
  }

  public get email(): FormControl {
    return this.companyForm.get('email') as FormControl;
  }

  public get address(): FormGroup {
    return this.companyForm.get('address') as FormGroup;
  }

  public get street(): FormControl {
    return this.address.get('street') as FormControl;
  }

  public get apt(): FormControl {
    return this.address.get('apt') as FormControl;
  }

  public get city(): FormControl {
    return this.address.get('city') as FormControl;
  }

  public get state(): FormControl {
    return this.address.get('state') as FormControl;
  }

  public get zipcode(): FormControl {
    return this.companyForm.get('zipcode') as FormControl;
  }

  get diagnostic() { return JSON.stringify(this.companyForm.value); }
}
