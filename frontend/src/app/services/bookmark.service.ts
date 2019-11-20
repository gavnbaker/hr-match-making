import { Injectable } from '@angular/core';

import { JobPost } from '../models/jobpost';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { BookmarkDto } from '../models/dto/bookmarkDto';

@Injectable()
export class BookmarkService {
  private bookmarkUrl = 'api/bookmarks';
  private bookmarkSubject = new ReplaySubject<BookmarkDto[]>(1);

  public bookmarks$ = this.bookmarkSubject.asObservable();

  // need to create an error service to handle the errors on the application
  public constructor(private httpSvc: HttpClient) {}

  public bookmarkJob(jobPostId: number): void {
    // Use default user id 1 to match user to bookmark
    const bookmark: Object = {
      JobPostID: jobPostId,
      UserID: 3,
    };

    this.httpSvc.post(this.bookmarkUrl, bookmark)
        .subscribe(this.updateBookmarks, this.handleError);
  }

  private updateBookmarks(bookmarks: BookmarkDto[]): void {
    this.bookmarkSubject.next(bookmarks);
  }

  public unbookmarkJob(bookmarkId: number): void {
    const deleteUrl: string = this.bookmarkUrl.concat(`/${bookmarkId}`);
    this.httpSvc.delete(deleteUrl).subscribe(this.updateBookmarks, this.handleError);
  }

  public getBookmarksByUser(userId: number): Promise<any> {
    const url = `api/users/${userId}/bookmarks`;
    return this.httpSvc.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getBookmarkedJob(jobPostId: number, userId: number): Promise<any> {
    const url = `api/users/${userId}/bookmark/${jobPostId}`;
    return this.httpSvc.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.error('An error occurred', error); // for demo purposes only
    // this.errSvc.next(error)
  }

}
