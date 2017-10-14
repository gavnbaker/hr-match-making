import { Injectable } from '@angular/core';
import { Employee } from '../data/models/employee';

@Injectable()
export class ProfileService {

  constructor() { }

  public save(user: Employee): void {
    console.log(user);
    // get user from localstorage
    // update object with new info
  }

  public register(registerObj): void {
    // Store info in local storage
    localStorage.setItem(registerObj.email, JSON.stringify(registerObj));
  }

  public login(loginObj) {
    const data = localStorage.getItem(loginObj.email);
    console.log(data);

    if(!data) {
      return {
        success: false,
        message: 'Login failed: User not found!'
      };
    }

    const user = JSON.parse(data);
    if (user.password === loginObj.password) {
      return {
        success: true,
        message: 'Login Successful',
        data: user
      };
    } else {
      return {
        success: false,
        message: 'Login failed: Wrong password'
      };
    }
  }
}
