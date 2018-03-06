import { Address } from './address';
import { Skill } from './skill';
import { WorkExperience } from './work-experience';
import { Education } from './education';

export interface User {
  readonly firstName: string;
  readonly lastName: string;
  readonly email?: string;
  readonly phone?: string;
  readonly address: Address;
  readonly skills: Skill[];
  readonly experience: WorkExperience[];
  readonly education: Education[];
}

