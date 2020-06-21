import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';

const routes: Routes = [
  {
    path: 'company',
    children: [
      {
        path: 'create',
        component: CreateCompanyComponent
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./company-dashboard/company-dashboard.module').then(m => m.CompanyDashboardModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
