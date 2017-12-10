import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyRoutingModule } from './company-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { CompanyService } from '../services/company.service';
import { JobPostComponent } from './components/jobpost/jobpost.component';
import { JobService } from '../services/job.service';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent, JobPostComponent],
  providers: [CompanyService, JobService]
})
export class CompanyModule { }
