import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookmarkService {
  private bookmarkUrl = 'api/bookmarks';

  public constructor(private httpSvc: Http) {}

  public bookmarkJob(jobPostId: number): Promise<any> {
    // Use default user id 1 to match user to bookmark
    const bookmark: Object = {
      JobPostID: jobPostId,
      UserID: 3,
    };

    return this.httpSvc.post(this.bookmarkUrl, bookmark)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public unbookmarkJob(bookmarkId: number): any {
    const deleteUrl: string = this.bookmarkUrl.concat(`/${bookmarkId}`);
    return this.httpSvc.delete(deleteUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getBookmarksByUser(userId: number): any {
    const url = `api/users/${userId}/bookmarks`;
    return this.httpSvc.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public isJobBookmarked(jopPostId: number): any {
    console.log('..Fetched job bookmark status');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
