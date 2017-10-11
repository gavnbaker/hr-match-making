import { Address } from './address';
import { Skill } from './skill';
import { WorkExperience } from './work-experience';

export class Employee {
  public firstName: string;
  public lastName: string;
  public address: Address;
  public skills: Skill[];
  public experience: WorkExperience[];

  constructor() {}
}






