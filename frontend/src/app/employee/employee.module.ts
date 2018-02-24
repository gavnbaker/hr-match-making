import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateComponent } from './components/create/create.component';
import { ProfileService } from '../services/profile.service';
import { TitleService } from '../services/title.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateComponent],
  providers: [ProfileService, TitleService]
})
export class EmployeeModule { }
