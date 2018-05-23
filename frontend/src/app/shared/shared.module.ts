import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [UserProfileComponent, TableComponent],
  exports: [UserProfileComponent, TableComponent, CommonModule, ]
})
export class SharedModule { }
