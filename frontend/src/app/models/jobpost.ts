import { Job } from './job';
import { Company } from './company';
import { JobPostSkills } from './skill';

export interface JobPost {
  readonly JobPostID?: number;
  readonly JobID?: number;
  readonly CompanyID: number;

  readonly Job: Job;
  readonly Company?: Company;
  readonly JobPostSkills: JobPostSkills[];
}
