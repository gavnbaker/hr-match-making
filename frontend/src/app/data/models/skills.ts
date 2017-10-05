export class Skills {
  private years: string;

  constructor(private name: string) {}

  public getName(): string {
    return this.name;
  }

  public setYearsExperience(years: string): void {
    this.years = years;
  }

  public getYearsExperience(): string {
    return this.years;
  }
}
