import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { TableComponent } from './table/table.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationsComponent } from './applications/applications.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { JobDetailComponent } from './job-detail/job-detail.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'applications',
        component: ApplicationsComponent
      },
      {
        path: 'bookmarks',
        component: BookmarksComponent
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'job-detail/:id',
        component: JobDetailComponent
      },
      {
        path: '',
        component: JobSearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
