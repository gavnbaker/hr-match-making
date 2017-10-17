import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TitleService } from '../services/title.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public passwordMatch: boolean = true;
  public userExists: boolean = false;
  public userExistsError: string = '';

  public constructor(private fb: FormBuilder,
    private titleService: TitleService,
    private profileService: ProfileService,
    private router: Router) {
    this.createForm();
  }

  public ngOnInit() {
    this.titleService.setTitle('Register');
  }

  public createForm(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        passwords: this.fb.group(
          {
            password: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            repeatpwd: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
          }
        )
      }
    );
  }

  public onSubmit(): void {
    const password = this.passwords.get('password').value;
    const repeatpwd = this.passwords.get('repeatpwd').value;

    if(password !== repeatpwd) {
      this.passwordMatch = false;
      return;
    }

    this.passwordMatch = true;
    const username = this.registerForm.get('username').value;
    const email =  this.registerForm.get('email').value;

    const registerObj = {
      username,
      email,
      password
    };

    console.log(registerObj);
    const status = this.profileService.register(registerObj);
    if(!status.success) {
      this.userExists = true;
      this.userExistsError = status.message;
    } else {
      this.router.navigate(['/profile']);
    }
  }

  public get username(): FormControl {
    return this.registerForm.get('username')  as FormControl;
  }

  public get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  public get passwords(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }

}
