import { Injectable } from '@angular/core';

@Injectable()
export class BackendUrlService {

  public get url(): string {
    return 'http://localhost:3000';
  }

}
