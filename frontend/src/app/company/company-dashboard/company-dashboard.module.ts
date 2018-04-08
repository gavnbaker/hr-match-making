import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyDashboardRoutingModule } from './company-dashboard-routing.module';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { JobPostComponent } from './pages/job-post/job-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { CompanyService } from '../../services/company.service';

@NgModule({
  imports: [
    CommonModule,
    CompanyDashboardRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CompanyDashboardComponent, JobPostComponent],
  providers: [JobService, CompanyService]
})
export class CompanyDashboardModule { }
