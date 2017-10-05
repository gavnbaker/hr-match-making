export class Address {
  constructor(private zipCode: string,
    private city: string,
    private state: string,
    private country: string) {}

  public getZipCode(): string {
    return this.zipCode;
  }

  public getCity(): string {
    return this.city;
  }

  public getState(): string {
    return this.state;
  }

  public getCountry(): string {
    return this.country;
  }
}
