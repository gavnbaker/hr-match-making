import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchComponent } from './job-search/job-search.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [JobSearchComponent]
})
export class DashboardModule { }
