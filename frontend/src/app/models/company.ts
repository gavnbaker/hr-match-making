import { Address } from './address';

export interface Company {
  readonly CompnayID?: number;
  readonly Name: string;
  readonly Description: string;
  readonly Industry: string;
  readonly Email: string;
  readonly Phone: string;
  readonly Address: Address;
}
