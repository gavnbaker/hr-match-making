import { Address } from './address';

export interface Company {
  readonly CompanyID?: number;
  readonly Name: string;
  readonly Description: string;
  readonly Industry: string;
  readonly Email: string;
  readonly Phone: string;
  readonly Address: Address;
}
