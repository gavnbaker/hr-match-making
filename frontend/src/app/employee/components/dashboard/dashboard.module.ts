import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { JobService } from '../../../services/job.service';
import { BookmarkService } from '../../../services/bookmark.service';
import { TableComponent } from './table/table.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationsComponent } from './applications/applications.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [JobSearchComponent, DashboardComponent, TableComponent, ProfileComponent, ApplicationsComponent,
    BookmarksComponent, JobDetailComponent],
  providers: [JobService, BookmarkService],
})
export class DashboardModule { }
