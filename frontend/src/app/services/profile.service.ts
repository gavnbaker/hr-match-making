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

  public register(registerObj): any {
    // Store info in local storage
    // Create an array of objects, that houses who has registered for our site

    // 1st check if our regiestered object exists
    let data = localStorage.getItem('registered-users');
    let registeredUsers;
    if(!data) {
      // Does not exist
      let registeredArr = [];
      registeredArr.push(registerObj);

      registeredUsers = {
        users: registeredArr
      };
    } else {
      registeredUsers = JSON.parse(data);
      // Check to see if user was alreday registered
      const user = registeredUsers.users.filter(user => user.email === registerObj.email);
      if(user.length === 0){
        registeredUsers.users.push(registerObj);
      } else {
        return {
          success: false,
          message: 'Registration failed: User already exists.'
        };
      }
    }
    localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
    return {
      success: true,
      message: 'Registration successfull'
    };
  }

  public login(loginObj) {
    const data = localStorage.getItem('registered-users');
    console.log(data);

    if(!data) {
      return {
        success: false,
        message: 'Login failed: No registed users'
      };
    }

    const registeredUsers = JSON.parse(data);
    // search for user with that login name
    const user = registeredUsers.users.filter(user => user.email === loginObj.email);
    console.log(user);
    if(user.length === 0) {
      return {
        success: false,
        message: 'Login failed: Invalid User'
      };
    }

    if (user[0].password === loginObj.password) {
      // also want to set that the user is logged in
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
