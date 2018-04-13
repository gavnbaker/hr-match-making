import { Component, OnInit } from '@angular/core';
import { JobPost } from '../../../../models/jobpost';

@Component({
  selector: 'app-list-jobpost',
  templateUrl: './list-jobpost.component.html',
  styleUrls: ['./list-jobpost.component.css']
})
export class ListJobpostComponent implements OnInit {
  public jobPost: JobPost[];

  constructor() { }

  ngOnInit() {
  }

}
