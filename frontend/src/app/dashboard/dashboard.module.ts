import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { ProfileService } from '../services/profile.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    RecommendationsComponent
  ],
  providers: [ProfileService]
})
export class DashboardModule { }
