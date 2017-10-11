import { Injectable } from '@angular/core';
import { Employee } from '../data/models/employee';

@Injectable()
export class ProfileService {

  constructor() { }

  public save(user: Employee): void {
    console.log(user);
  }

}
