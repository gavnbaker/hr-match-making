import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobPost } from '../../models/jobpost';
import { JobApplicationService } from '../../services/job-application.service';
import { BookmarkService } from '../../services/bookmark.service';
import { ApplicationDto, ApplicationUpdateDto } from '../../models/dto/applicationDto';
import { TableType } from '../../enums/TableType';
import { Status } from '../../enums/status';

@Component({
  selector: 'app-applications-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[];
  @Input() type: TableType;
  @Output() application = new EventEmitter<ApplicationUpdateDto>();

  public isBookmarkTable: boolean;
  public isApplicationTable: boolean;
  public isCompanyApplicationsTable: boolean;
  public bookmarks;

  constructor() { }

  ngOnInit() {
   this.assignTableType(this.type);
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
      case TableType.CompanyApplications: {
        this.isCompanyApplicationsTable = true;
        break;
      }
      default: {
        console.log(`${type} does not exist`);
        break;
      }
    }
  }

  public approve(applicationDto: ApplicationDto) {
    console.log(applicationDto);
    const updatedApplication: ApplicationUpdateDto =  {
      ApplicationDto: applicationDto,
      newStatus: Status.Accepted
    };

    this.application.emit(updatedApplication);
  }

  public reject(applicationDto: ApplicationDto) {
    const updatedApplication: ApplicationUpdateDto =  {
      ApplicationDto: applicationDto,
      newStatus: Status.Rejected
    };

    this.application.emit(updatedApplication);
  }

  public convertStatusEnums(status: number): string {
    return Status[status];
  }

  public isPendingStatus(status: number): boolean {
    return (Status.Pending === status) ? true : false;
  }

}
