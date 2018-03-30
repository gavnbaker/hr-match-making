import { Component, OnInit, Input } from '@angular/core';
import { JobPost } from '../../../../models/jobpost';
import { JobApplicationService } from '../../../../services/job-application.service';
import { BookmarkService } from '../../../../services/bookmark.service';

interface ApplicationDto {
  JobApplicationId: number;
  UserID: number;
  JobPost: JobPost;
  Status: number;
}

interface BookmarkDto {
  BookmarkID: number;
  UserID: number;
  JobPost: JobPost;
}

enum Status {
  Pending = 0,
  Accepted,
  Rejected
}

enum Type {
  Bookmarks,
  Applications
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[];
  @Input() type: Type;

  public bookmarks: BookmarkDto[];
  public applications: ApplicationDto[];
  public userId = 3;

  constructor(private bookmarkService: BookmarkService, private jobAppsService: JobApplicationService) { }

  ngOnInit() {
   this.assignTableType(Type.Bookmarks, this.userId);
  }

  public viewJob(id: number) {
    console.log(id);
  }

  public getBookmarks(userId: number): void {
    this.bookmarkService.getBookmarksByUser(userId)
      .then(response => {
        this.bookmarks = response;
        this.data = this.bookmarks;
      } );
  }

  public getJobApplications(userId: number): void {
    this.jobAppsService.getJobApplicationsByUser(userId)
      .then(response => {
        this.applications = response;
       this.data = this.applications;
      });
  }

  public assignTableType(type: Type, userId: number): void {
    switch (type) {
      case Type.Bookmarks: {
        this.getBookmarks(userId);
        break;
      }
      case Type.Applications: {
        this.getJobApplications(userId);
        break;
      }
      default: {
        console.log(`${type} does not exist`);
        break;
      }
    }
  }

}
