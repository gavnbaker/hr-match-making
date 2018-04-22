import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDashboardComponent } from './company-dashboard.component';
import { JobPostComponent } from './pages/job-post/job-post.component';
import { ListJobpostComponent } from './pages/list-jobpost/list-jobpost.component';
import { ViewJobpostComponent } from './pages/view-jobpost/view-jobpost.component';
import { ApplicantsComponent } from './pages/applicants/applicants.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { ApplicantComponent } from './applicant/applicant.component';

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
        path: 'create-jobpost',
        component: JobPostComponent
      },
      {
        path: 'view-jobpost/:id',
        component: ViewJobpostComponent
      },
      {
        path: 'jobpost',
        component: ListJobpostComponent
      },
      {
        path: 'applications',
        component: ApplicationsComponent
      },
      {
        path: 'applicants/:jobpostId',
        component: ApplicantsComponent
      },
      {
        path: 'applicant/:userId',
        component: ApplicantComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyDashboardRoutingModule { }
