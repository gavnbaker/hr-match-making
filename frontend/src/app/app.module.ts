import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';

import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';

import { TitleService } from './services/title.service';
import { ProfileService } from './services/profile.service';
import { BackendUrlService } from './services/backend-url.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { JobApplicationService } from './services/job-application.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    EmployeeModule,
    CompanyModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TitleService, ProfileService, BackendUrlService, AuthService, AuthGuard, JobApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
