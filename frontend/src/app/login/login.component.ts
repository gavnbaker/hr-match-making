import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { TitleService } from '../services/title.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public success: boolean = true;
  public error: string = '';


  constructor(private fb: FormBuilder, private titleService: TitleService,
    private ProfileService: ProfileService) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        remCheckBox: ''
      }
    );
  }

  public login() {
    const email: string = this.email.value;
    const password: string = this.password.value;

    const loginObj = {
      email,
      password
    };
    const value = this.ProfileService.login(loginObj);
    this.success = value.success;
    console.log(value);

    if(!this.success) {
      this.error = value.message;
      return;
    }

    // True so redirect to dashboard
    console.log(value);
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }

  public get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  public get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

}
