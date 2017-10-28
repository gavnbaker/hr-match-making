export interface User {
  readonly firstName: string;
  readonly lastName: string;
  readonly email?: string;
  readonly address: Address;
  readonly skills: Skill[];
  readonly experience: WorkExperience[];
  readonly education: Education[];
}

export interface Address {
  readonly street: string,
  readonly zipCode: string,
  readonly city: string,
  readonly state: string,
  readonly country: string
}

export interface Skill {
  readonly name: string;
}

export interface WorkExperience {
  readonly jobTitle: string;
  readonly companyName: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly jobDescription: string;
}

export interface Education {
  readonly name: string;
  readonly location: string;
  readonly degreeType: string;
  readonly degreeName: string;
  readonly startDate: string;
  readonly endDate: string;
}
