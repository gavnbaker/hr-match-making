import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  username: AbstractControl;
  email: AbstractControl;
  passwords: AbstractControl;

  constructor(private fb: FormBuilder, private titleService: TitleService) {
    this.createForm();

    this.username = this.registerForm.get('username');
    this.email = this.registerForm.get('email');
    this.passwords = this.registerForm.get('passwords');
  }

  createForm(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        passwords: this.fb.group(
          {
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            repeatpwd: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
          }
        )
      }
    );
  }

  ngOnInit() {
    this.titleService.setTitle('Register');
  }

}
