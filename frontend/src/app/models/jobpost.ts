import { Job } from './job';
import { Company } from './company';
import { JobPostSkills } from './skill';

export interface JobPost {
  JobPostID?: number;
  JobID?: number;
  CompanyID: number;

  Job: Job;
  Company?: Company;
  JobPostSkills: JobPostSkills[];
}
