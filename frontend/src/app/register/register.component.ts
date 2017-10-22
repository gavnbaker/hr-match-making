import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TitleService } from '../services/title.service';
import { AuthService } from '../services/auth.service';

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
    private authService: AuthService,
    private router: Router) {
    this.createForm();
  }

  public ngOnInit() {
    this.titleService.setTitle('Register');
  }

  public createForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
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
    const name = this.name.value;
    const username = this.username.value;
    const email =  this.email.value;

    const user = {
      name,
      username,
      email,
      password
    };
    console.log(user);

    this.authService.register(user)
        .then((data) => {
          console.log(data);
          if(data.success) {
            this.router.navigate(['/login']);
          } else {
            this.userExists = true;
            this.userExistsError = data.msg;
          }
        });
  }

  public get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
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
