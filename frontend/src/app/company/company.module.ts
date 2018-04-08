import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../services/company.service';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateCompanyComponent],
  providers: [CompanyService]
})
export class CompanyModule { }
