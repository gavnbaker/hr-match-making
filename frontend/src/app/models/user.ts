import { Address } from './address';
import { Skill, UserSkills } from './skill';
import { WorkExperience } from './work-experience';
import { Education } from './education';

export interface User {
  readonly FirstName: string;
  readonly LastName: string;
  readonly Email?: string;
  readonly Phone?: string;
  readonly Address: Address;
  // TODO create another interface for the skills[]
  readonly UserSkills: UserSkills[];
  readonly JobHistory: WorkExperience[];
  readonly Education: Education[];
}

