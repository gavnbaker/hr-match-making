import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginUser } from '../models/login-user';

import { TitleService } from '../services/title.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public success = true;
  public error: string;

  constructor(private fb: FormBuilder, private titleService: TitleService,
    private authService: AuthService, private router: Router, private profileService: ProfileService) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group(
      {
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
      }
    );
  }

  public login(): void {
    const username: string = this.username.value;
    const password: string = this.password.value;

    const loginObj: LoginUser = {
      username,
      password
    };

    this.authService.login(loginObj)
      .then(token => {

        if (!token) {
          this.error = JSON.stringify(token);
          return;
        }
        this.profileService.getUserByUsername();
        this.router.navigate(['/employee/dashboard']);
      }).catch(error => {
        this.success = false;
        this.error = JSON.stringify(error);
      });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }

  public get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  public get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

}
