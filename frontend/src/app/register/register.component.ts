import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterUser } from '../models/register-user';
import { TitleService } from '../services/title.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public passwordMatch = true;
  public error = false;
  public errorMsg = '';

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
        email: ['', Validators.compose([Validators.required, Validators.email])],
        passwords: this.fb.group(
          {
            password: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            confirmpwd: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
          }
        )
      }
    );
  }

  public onSubmit(): void {
    const password = this.passwords.get('password').value;
    const confirmpwd = this.passwords.get('confirmpwd').value;

    if ( password !== confirmpwd ) {
      this.passwordMatch = false;
      return;
    }

    this.passwordMatch = true;
    const email =  this.email.value.trim();

    const user: RegisterUser = {
      Email : email,
      Password : password,
      ConfirmPassword: confirmpwd
    };

    console.log(user);

    this.authService.register(user)
        .then((data) => {
          if (data.ok) {
            this.error = false;
            console.log(data.json());
            this.router.navigate(['/login']);
          }
        }).catch(errors => {
          console.log(errors.json());
          this.error = true;
          this.errorMsg = JSON.stringify(errors.json());
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
