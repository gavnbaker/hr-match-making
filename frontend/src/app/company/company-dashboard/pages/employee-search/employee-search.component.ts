import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  public searchControl: FormControl = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

  public search(term: string) {
    console.log(term);
    this.searchControl.reset();
  }

}
