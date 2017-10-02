import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /* loginForm: FormGroup = new FormGroup (
    {
      email: new FormControl(),
      password: new FormControl(),
      remCheckBox: new FormControl()
    }
  ); */

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  remCheckBox: AbstractControl;

  constructor(private fb: FormBuilder, private titleService: TitleService) {
    this.createForm();

    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');
    this.remCheckBox = this.loginForm.get('remCheckBox');
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

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }

}
