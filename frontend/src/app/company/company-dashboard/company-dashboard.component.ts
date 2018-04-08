import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  public pageTitle = 'Company Dashboard';
  public constructor(private titleService: TitleService) {}
  public ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
  }
}
