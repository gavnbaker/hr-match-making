import { Job } from './job';
import { Company } from './company';
import { JobPostSkills } from './skill';

export interface JobPost {
  readonly JobPostId?: number;
  readonly JobId?: number;
  readonly CompanyId: number;

  readonly Job: Job;
  readonly Company?: Company;
  readonly JobPostSkills: JobPostSkills[];
}
