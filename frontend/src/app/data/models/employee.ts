import { Address } from './address';
import { Skills } from './skills';
import { WorkExperience } from './work-experience';

export class Employee {
  public address: Address;
  public skills: Skills[];
  public experience: WorkExperience[];
  constructor(public firstName: string, public lastName: string) {}
}






