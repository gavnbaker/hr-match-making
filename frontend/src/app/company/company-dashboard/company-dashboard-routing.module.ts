import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { JobPostComponent } from './pages/job-post/job-post.component';
import { ListJobpostComponent } from './pages/list-jobpost/list-jobpost.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyDashboardComponent,
    children: [
      {
        path: 'jobpost/:id',
        component: JobPostComponent
      },
      {
        path: 'jobpost',
        component: ListJobpostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyDashboardRoutingModule { }
