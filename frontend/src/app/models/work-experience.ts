export interface WorkExperience {
  readonly CompanyName: string;
  readonly StartDate: Date;
  readonly EndDate: Date;
  readonly Job: Job;
}

export interface Job {
  readonly Title: string;
  readonly Description: string;
}
