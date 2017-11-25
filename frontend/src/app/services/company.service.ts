import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Company } from '../models/company';

@Injectable()
export class CompanyService {
  private companyUrl = '/api/Companies';

  constructor(private http: Http) { }

  /**
   * getCompanies
   */
  public getCompanies(): Promise<Company[]> {
    return this.http.get(this.companyUrl)
      .toPromise()
      .then(response => response.json() as Company[])
      .catch(this.handleError);
  }

  /**
   * createCompany
   */
  public createCompany(company: Company): Promise<Company> {
    return this.http.post(this.companyUrl, company)
      .toPromise()
      .then(response => response.json() as Company)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
