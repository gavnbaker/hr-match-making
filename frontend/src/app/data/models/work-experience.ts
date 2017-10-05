export class WorkExperience {
  constructor(private jobTitle: string,
    private companyName: string,
    private startDate: string,
    private endDate: string,
    private jobDescription: string) { }

  public getJobTitle(): string {
    return this.jobTitle;
  }

  public getCompanyName(): string {
    return this.companyName;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getEndDate(): string {
    return this.endDate;
  }

  public getJobDescription(): string {
    return this.jobDescription;
  }

}
