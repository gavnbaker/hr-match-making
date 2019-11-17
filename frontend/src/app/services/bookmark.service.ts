import { Injectable } from '@angular/core';

import { JobPost } from '../models/jobpost';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookmarkService {
  private bookmarkUrl = 'api/bookmarks';

  public constructor(private httpSvc: HttpClient) {}

  public bookmarkJob(jobPostId: number): Promise<any> {
    // Use default user id 1 to match user to bookmark
    const bookmark: Object = {
      JobPostID: jobPostId,
      UserID: 3,
    };

    return this.httpSvc.post(this.bookmarkUrl, bookmark)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public unbookmarkJob(bookmarkId: number): Promise<any> {
    const deleteUrl: string = this.bookmarkUrl.concat(`/${bookmarkId}`);
    return this.httpSvc.delete(deleteUrl)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
