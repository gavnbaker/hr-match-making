import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() jobApplications: any[];

  constructor() { }

  ngOnInit() {
  }

  public viewJob(id: number) {
    console.log(id);
  }

}
