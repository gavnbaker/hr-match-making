import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../../../services/bookmark.service';
import { BookmarkDto } from '../../../../models/dto/bookmarkDto';
import { TableType } from '../../../../enums/TableType';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  public bookmarks: BookmarkDto[];
  public bookmarkTable: TableType = TableType.Bookmarks;

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.getBookmarks();
  }
  // TODO: Remove from live app
  public getBookmarks(userId: number = 3): void {
    this.bookmarkService.getBookmarksByUser(userId)
      .then(response => {
        this.bookmarks = response;
      });
  }

}
