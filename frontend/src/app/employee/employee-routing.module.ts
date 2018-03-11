import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
  {
    path: 'employee',
    children: [
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'dashboard',
        loadChildren: './components/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: '',
        component: CreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
