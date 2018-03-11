import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobSearchComponent } from './job-search/job-search.component';


const routes: Routes = [
  {
    path: '',
    children: [
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
