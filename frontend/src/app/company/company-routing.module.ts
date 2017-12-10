import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { JobPostComponent } from './components/jobpost/jobpost.component';

const routes: Routes = [
  {
    path: 'company',
    children: [
      {
        path: 'jobpost',
        component: JobPostComponent
      },
      {
        path: '',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
