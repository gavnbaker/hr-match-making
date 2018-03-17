import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BookmarkService {

  public constructor(private httpSvc: Http) {}

  public bookmarkJob(jobPostId: number): boolean {
     // Use default user id 1 to match user to bookmark
     console.log(jobPostId);
     return true;
  }

}
