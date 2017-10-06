export class WorkExperience {
  constructor(
    public jobTitle: string,
    public companyName: string,
    public startDate: string,
    public endDate: string,
    public jobDescription: string) { }

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
