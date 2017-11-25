import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyRoutingModule } from './company-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { CompanyService } from '../services/company.service';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent],
  providers: [CompanyService]
})
export class CompanyModule { }
