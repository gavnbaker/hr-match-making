import { Component, OnInit, Input } from '@angular/core';
import { JobPost } from '../../../../models/jobpost';
import { JobApplicationService } from '../../../../services/job-application.service';
import { BookmarkService } from '../../../../services/bookmark.service';
import { ApplicationDto } from '../../../../models/dto/applicationDto';
import { TableType } from '../../../../enums/TableType';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[];
  @Input() type: TableType;

  public isBookmarkTable: boolean;
  public isApplicationTable: boolean;
  public bookmarks;

  constructor(private bookmarkService: BookmarkService, private jobAppsService: JobApplicationService) { }

  ngOnInit() {
   this.assignTableType(this.type);
  }

  public getBookmarks(userId: number): void {
    this.bookmarkService.getBookmarksByUser(userId)
      .then(response => {
        this.bookmarks = response;
        this.data = this.bookmarks;
      } );
  }

  public assignTableType(type: TableType): void {
    switch (type) {
      case TableType.Bookmarks: {
        this.isBookmarkTable = true;
        break;
      }
      case TableType.Applications: {
        this.isApplicationTable = true;
        break;
      }
      default: {
        console.log(`${type} does not exist`);
        break;
      }
    }
  }

}
